// src/components/AuthForm.tsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase"; // Ensure firebase.ts exports `auth`
import { useNavigate } from "react-router-dom";

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    if (isRegistering) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await axios.post("http://localhost:5000/api/register-user", {
        uid: user.uid,
        email: user.email,
      });

      setSuccess("Registered and synced with database! 🎉");

      setTimeout(() => {
        setIsRegistering(false); // switch to login
        setSuccess(null);
      }, 1500);
    } else {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();

      setSuccess("Logged in successfully! 🚀");

      console.log("Firebase ID token:", token);

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }
  } catch (err: any) {
    setError(err.message);
  }
};


  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">
          {isRegistering ? "Register" : "Login"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? "Register" : "Login"}
          </button>

          <p className="text-center mt-3">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
