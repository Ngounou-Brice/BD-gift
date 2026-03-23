import { useState } from "react";
import axios from "axios";

export default function Login({ setData }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const unlock = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/unlock", {
        name,
        code
      });
      setData(res.data);
    } catch {
      alert("Wrong code 😜");
    }
  };

  return (
    <div style={{ padding: "20px" }} className="card">
      <h2>💖 Unlock Your Gift</h2> <br></br>
      <p3 style ={{ color: "white" }} class = "not">Enter your name: </p3>
      <input class = "not no" placeholder="Name" onChange={e => setName(e.target.value)} /> 
      <p3 style ={{ color: "white" }} class = "not">Enter the secret code: </p3>
      <input class = "not no" type="password" placeholder="Secret Code" onChange={e => setCode(e.target.value)} />
      <br></br><button onClick={unlock}>Unlock 💝</button><br></br><br></br>
      <div>Made with ❤️ by Evoltep</div>
    </div>
  );
}