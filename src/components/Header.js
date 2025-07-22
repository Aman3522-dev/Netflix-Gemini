import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO, SUPPORTED_LANG } from "../Utils/constants";
import { toggleGptSearchView } from "../Utils/geminiSlice";
import { changeLangauage } from "../Utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector(store => store.gemini.showGptSearch);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      navigate("/error");
      // An error happened.
    });
  }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
          navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      // unsubscribe when the component unmounts
      return () => unsubscribe();
    
    }, []);

    const handleGptSearchClick = () => {
      // Toggle Gpt search button
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
      dispatch(changeLangauage(e.target.value));
    }

  
  return ( 
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {user &&(<div className="flex p-2">
        {showGptSearch && (
        <select className="p-2 m-2 bg-gray-500 text-white rounded-lg" onChange={handleLanguageChange}>
          {SUPPORTED_LANG.map((lang) => (
           <option key={lang.identifier} value={lang.identifier}>
            {lang.name}
          </option>
          ))}
        </select>
        )}
        <button className="py-2 px-4 m-2 bg-purple-600 text-white rounded-lg hover:bg-opacity-60"
        onClick={handleGptSearchClick}
        >
          {showGptSearch ? "Home Page" : "GPT Search"}
        </button>
        <img
          alt="usericon"
          className="w-12 h-12"
          src={user?.photoURL}
        />
        <button onClick={handleSignOut} className="text-white px-4 py-2 rounded-md hover:bg-red-700">
          (Sign Out)
        </button>
      </div>)}
    </div>
  );
};

export default Header;
