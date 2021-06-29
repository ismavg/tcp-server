'use strict';

const net = require('net');
global.PORT = process.env.PORT || 9000;
global.ECHO = process.env.ECHO || false;

const server = net.createServer((socket) => {    
	/*socket.write('connected');*/
	socket.on('data', (received_data) => {
		console.log('> ', received_data.toString());
		if(ECHO) {
			socket.write(received_data);
		}
	});
});

server.listen(PORT, () => {
	console.log('Datoms test communication tcp server started and bound to ' + PORT);
});