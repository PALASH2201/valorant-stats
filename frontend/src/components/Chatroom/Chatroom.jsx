// Chatroom.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './Chatroom.module.css';

const Chatroom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  
  const socketRef = useRef(null); // Use a ref to hold the socket instance

  useEffect(() => {
    // Generate a random username when the component mounts
    const generatedUsername = `Player${Math.floor(Math.random() * 1000)}`;
    setUsername(generatedUsername);
    
    socketRef.current = io("http://localhost:5000", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:3000",
      },
    });

    // Emit username to server upon connection
    socketRef.current.emit('perform_connect', { username: generatedUsername });

    // Listen for incoming messages
    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for user list updates
    socketRef.current.on('user_list', (users) => {
      setUserList(users);
    });

    // Clean up the socket listeners when the component unmounts
    return () => {
      socketRef.current.off('message');
      socketRef.current.off('user_list');
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = { content: input }; // Include user in message
      socketRef.current.emit('message', messageData);
    //   setMessages((prevMessages) => [...prevMessages, { user: username, message: input }]); // Append the local message immediately
      setInput('');
    }
  };

  return (
    <div className={styles.chatroomContainer}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Valorant Hub</h2>
        <div className={styles.userList}>
          {userList.map((user, index) => (
            <p key={index} className={styles.user}>{user}</p>
          ))}
        </div>
      </div>

      <div className={styles.chatSection}>
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div key={index} className={`${styles.message} ${msg.user === username ? styles.self : ''}`}>
              <strong>{msg.user}</strong>: {msg.message}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className={styles.input}
          />
          <button onClick={sendMessage} className={styles.sendButton}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
