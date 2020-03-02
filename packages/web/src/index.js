import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { addWSListener, removeWSListener, send } from "./websocket";

const App = () => {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);

  function onMessage(msg) {
    setMessageList([...messageList, msg.msg]);
  }

  useEffect(() => {
    addWSListener(onMessage);

    return () => removeWSListener(onMessage);
  }, [messageList]);

  return (
    <>
      <h1>Teste WebSockets</h1>
      <input onChange={e => setText(e.target.value)} value={text} />
      <button onClick={() => send(text)}>Enviar</button>
      <ul>
        {messageList.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
