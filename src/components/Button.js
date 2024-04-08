"use client"
// import { useEffect, useState } from 'react';

// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); 
// const Button = () => {
    
//     const [likes, setLikes] = useState(0);
//     const sendMessage = () => {
//         socket.emit('liked');
//       };
//   useEffect(() => {
//     // socket.on('message', (data) => {
//     //   setMessage(data.message);
//     // });
//     socket.on('connect', (data) => {
//         console.log('connected')
//       });
//       socket.on('likeUpdate', (count) => {
//         // console.log('connected')
//             setLikes(count)
//       });
//   }, []);
//   return (
//     <div className='grid grid-cols-1'>
//         <div className='flex flex-col items-center'>
//             <button  onClick={sendMessage} className='button bg-green-500 p-8 text-lg'>like</button>
//             <p>{likes}</p>
//         </div>
//     </div>
//   )
// }

// export default Button 
import { useEffect, useState } from 'react';

const Button = () => {
  const [counter, setCounter] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://pebble-sudden-fontina.glitch.me/');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.event === 'counterUpdate') {
        setCounter(prevCounter => data.data); // Use functional update form
    console.log('counter', data.data);
    // console.log('counter', counter);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setSocket(null); // Reset socket state
    };

    return () => {
      if (socket) {
        socket.close(); // Close the WebSocket connection when component unmounts
      }
    };
  }, []); // Run once when component mounts
  useEffect(() => {
    console.log('useeffect counter', counter);
  }, [counter]);
  const incrementCounter = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('increment'); // Send 'increment' message if socket is open
    } else {
      console.log('WebSocket connection is not open.');
    }
  };

  return (
    <div>
      <button onClick={incrementCounter}>Increment Counter</button>
      <p>Counter: {counter}</p>
    </div>
  );
};

export default Button;