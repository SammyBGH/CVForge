import React from "react";
import "../styles/Auth.css";

export default function Register() {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h3>Create account</h3>
        <input placeholder="Full name" />
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button className="btn-primary">Create account</button>
      </div>
    </div>
  );
}
