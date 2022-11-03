import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost() {
    const post = {
      title: "Finish interview",
      description: "Finish fes!",
      uid : user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts);
  }

  async function getPostById() {
    const hardId = "MaeCNpnD4OnYx7ToQBtZ";
    const postRef = doc(db, "posts", hardId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const post = postSnap.data();
      console.log(post);
    }
  }

  async function getPostByUid(){
    const postCollectionRef = await query(
      collection(db,"posts"),
      where("uid","==","1")
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()))
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

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
        setUser(data.user);
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <div className="buttons__container">
        <button onClick={register}>Register</button>
        <button onClick={login}>Sign In</button>
        <button onClick={logout}>Sign Out</button>
        {loading ? "Loading..." : user.email}
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get Posts</button>
        <button onClick={getPostById}>Get Post by ID</button>
        <button onClick={getPostByUid}>Get Post by UID</button>
      </div>
    </div>
  );
}

export default App;
