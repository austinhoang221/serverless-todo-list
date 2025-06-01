import React, { useState } from "react";
import { signIn, signUp } from "./api/auth.service";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn(username, password);
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signUp(username);
      console.log("Login result:", result);
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
