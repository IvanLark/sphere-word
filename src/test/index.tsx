import {useState} from "react";

export default function Test () {
  const [test, setTest] = useState(0);

  function handleClick () {
    console.log(test);
    setTest(1);
  }

  return (
    <>
      <button onClick={handleClick}>点击测试</button>
      { test }
    </>
  );
}