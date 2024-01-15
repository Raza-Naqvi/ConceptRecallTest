import io from 'socket.io-client';

// const socket = io.connect(`http://192.168.100.6:7000/`);
const socket = io.connect(`https://booking-back-iota.vercel.app/`);

export default socket;