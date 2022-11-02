import React from 'react';
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user,setUser] = React.useState({});
  const [loading,setLoading] = React.useState(true);
  const[singedIn, setSingedIn] =React.useState(false)
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {

        setUser(user);
      } else {
        setUser({})
      }
    });
  },[]);
  
  function register() {
    console.log("Call");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((data) => {
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((data) => {
        setUser(data.user)
        setSingedIn(true)
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth)
    setUser({})
    setSingedIn(false)
  }
  return (
    <div className="App">
      <div  className='buttons__container'>
      <button onClick={register}>Register</button>
      <button onClick={login}>Sign In</button>
      <button onClick={logout}>Sign Out</button>
      </div>
      <div className='logged-in'>

      {loading ? <div className='loading'/> : singedIn ? <></>: <button onClick={logout} className='user-icon'>{(user.email)[0].toUpperCase()}</button>}
      </div>
    </div>
  );
}

export default App;
