import React, { useEffect, useState} from 'react';
import io, { Socket } from 'socket.io-client';
import './App.css';

let socket: Socket;
const CONNECTION_PORT = 'http://localhost:3001/';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket = io(CONNECTION_PORT)
  }, [CONNECTION_PORT]);

  const connectToRoom = () => {
    socket.emit('join_room', room);
  }


  return (
    <div className="App">
      <h1>Chat App</h1>
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input type="text" placeholder='Name...' onChange={(e) => {
                setUserName(e.target.value)
              }}/>
            <input type="text" placeholder='Room...' onChange={(e) => {
                setRoom(e.target.value)
              }}/>
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <h1>You are logged in</h1>
      )}
    </div>
  );
}

export default App;
