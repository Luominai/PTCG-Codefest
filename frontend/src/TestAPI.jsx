import Search from './CardSearch';
import { useState, useEffect } from "react";

function TestAPI() {
  const [info, setInfo] = useState([])
  useEffect(() => { 
    const getStuff = async () => {
      const result = await Search(40, 45, "holofoil");
      console.log("Result: ", result.data);
      setInfo(JSON.stringify(result.data[0]));
    }
    getStuff();
  })
  return (
    <>
      <div>
        <text>{info}</text>
      </div>
    </>
  )
}

export default TestAPI