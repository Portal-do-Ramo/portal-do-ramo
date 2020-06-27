import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

const echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname,
  transports: ['websocket', 'polling']
});

export default echo;
