import { useState } from "react";
import "./login.scss";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="test@...."
      ></input>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <button onClick={signIn}>Sign in</button>
      <h1>{auth.currentUser?.email}</h1>
    </div>
  );
};
