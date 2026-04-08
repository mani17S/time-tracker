import React, { useState } from "react";

function Login({ onLogin, onRegister }) {
  const [isReg, setIsReg] = useState(false);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [pass2, setPass2]   = useState("");
  const [error, setError]   = useState("");

  const submit = () => {
    if (!email || !pass) return setError("Fill in all fields");
    if (isReg) {
      if (!name)          return setError("Enter your name");
      if (pass !== pass2) return setError("Passwords don't match");
      if (pass.length < 4) return setError("Password too short");
    }
    const err = isReg ? onRegister(name, email, pass) : onLogin(email, pass);
    if (err) setError(err);
  };

  const field = (props) => (
    <input
      {...props}
      onKeyDown={(e) => e.key === "Enter" && submit()}
      style={{ padding: "10px", borderRadius: "8px", border: "1px solid #2d3748", background: "#0d1117", color: "white", width: "100%", fontSize: "14px" }}
    />
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#1a2130", borderRadius: "14px", padding: "2rem", width: "300px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <h2 style={{ textAlign: "center" }}>{isReg ? "Create Account" : "Login"}</h2>

        {isReg && field({ placeholder: "Your name",       value: name,  onChange: e => setName(e.target.value)  })}
                  {field({ placeholder: "Email", type:"email", value: email, onChange: e => setEmail(e.target.value) })}
                  {field({ placeholder: "Password", type:"password", value: pass, onChange: e => setPass(e.target.value) })}
        {isReg && field({ placeholder: "Confirm password", type:"password", value: pass2, onChange: e => setPass2(e.target.value) })}

        {error && <p style={{ color: "#f87171", fontSize: "13px", margin: 0 }}>{error}</p>}

        <button onClick={submit} style={{ background: "#3b82f6", border: "none", padding: "10px", color: "white", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          {isReg ? "Create Account" : "Login"}
        </button>

        <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
          {isReg ? "Have an account? " : "No account? "}
          <span onClick={() => { setIsReg(!isReg); setError(""); }} style={{ color: "#3b82f6", cursor: "pointer" }}>
            {isReg ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;