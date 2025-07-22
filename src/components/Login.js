import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../Utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { ICON, USER_AVATAR } from "../Utils/constants";


const Login = () => {
  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form data    
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if(!isSignInForm) {
         //sign up logic
         createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: "dsp siraj", photoURL: USER_AVATAR,
    }).then(() => {
       const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))

      navigate("/browse");
    }).catch((error) => {
      setErrorMessage(error.me);
    });
    
    // console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    // ..
  });
    } else {
         //sign in logic
         signInWithEmailAndPassword(auth, email.current.value, password.current.value)
         .then((userCredential) => {
           // Signed in 
           const user = userCredential.user;
          //  console.log(user);
           navigate("/browse")
           // ...
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           setErrorMessage(errorCode + "-" + errorMessage);
         });
       
    };


  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={ICON}
        alt='logo'>        
        </img>      
     </div>
     <form onSubmit={(e) => e.preventDefault() } className="w-3/12 absolute p-12 bg-black bg-opacity-85 my-60 mx-auto right-0 left-0 text-white rounded-lg">
      <h1 className="font-bold text-3xl py-4"> </h1>
      {!isSignInForm && (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-md"/>)}
      <input ref={email} type="text" placeholder="Email or mobile number" className="p-4 my-4 w-full bg-gray-700 rounded-md"/>
      <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-md"/>
      <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
      <button className="p-2 my-6 w-full bg-red-700 rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
      <p className="py-3 cursor-pointer" onClick={toggleSignInForm}>
        {isSignInForm
          ? "New to Netflix? Sign up now."
          : "Already registered? Sign In Now."}
      </p>
     </form>
    </div>
  );
};
export default Login;
