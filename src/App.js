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
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth)
    setUser({})
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Sign In</button>
      <button onClick={logout}>Sign Out</button>
      {loading ? 'loading...' : user.email}
    </div>
  );
}

export default App;
