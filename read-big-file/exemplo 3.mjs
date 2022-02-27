// se trabalhar com sockets, usar o net
// import net from 'net';

net.createServer((socket) => {
    socket.pipe(process.stdout);
}).listen(8000, () => console.log('http://localhost:8000'));

// node - e "process.stdin.pipe(require('net').connect(8000))"
