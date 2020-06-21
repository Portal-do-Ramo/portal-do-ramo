import Echo from 'laravel-echo';
import io from 'socket.io-client';

window.io = io;

const echo = new Echo({
  broadcaster: 'socket.io',
  host: 'localhost:6001'
});

export default echo;
