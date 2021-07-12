'use strict';

const { Socket } = require('dgram');
const net = require('net');
global.PORT1 = process.env.PORT1 || 9000;
global.PORT2 = process.env.PORT2 || 9001;
global.ECHO = (process.env.ECHO == 'true' ? true:false);
global.BRIDGE = (process.env.BRIDGE === 'true' ? true:false);
var socket1 = null; 
var socket2 = null;

const server1 = net.createServer((socket) => {
	socket1 = socket;
	socket.on('data', (received_data) => {
		console.log('CS1R> ', received_data.toString());
		if(socket2!=null && BRIDGE){
			socket2.write(received_data);
		}
		if(ECHO) {
			socket.write(received_data);
		}
	});
});


server1.listen(PORT1, () => {
	console.log('Datoms test communication tcp server started and bound to ' + PORT1);
});

const server2 = net.createServer((socket) => {
	socket2 = socket;
	socket.on('data', (received_data) => {
		console.log('CS2R> ', received_data.toString());
		if(socket1 != null && BRIDGE){
			socket1.write(received_data);
		}
		if(ECHO) {
			socket.write(received_data);
		}
	});
});

server2.listen(PORT2, () => {
	console.log('Datoms test communication tcp server started and bound to ' + PORT2);
});
  