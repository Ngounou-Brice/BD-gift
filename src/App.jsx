import { useState } from "react";
import Login from "./Login";
import Gift from "./Gift";

export default function App() {
  const [data, setData] = useState(null);

  return (
    <div>
      {!data ? <Login setData={setData} /> : <Gift data={data} />}
    </div>
  );
}