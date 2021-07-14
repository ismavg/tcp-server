'use strict';

const { Socket } = require('dgram');
const net = require('net');
global.PORT1 = process.env.PORT1 || 9000;
global.PORT2 = process.env.PORT2 || 9001;
global.ECHO = (process.env.ECHO == 'true' ? true:false);
global.BRIDGE = (process.env.BRIDGE === 'true' ? true:false);
var socket1 = null; 
var socket2 = null;
var test = "010A";
console.log('t> ', test.toString('ascii'));
console.log('t> ', Buffer.from(test, 'hex'));
console.log('t> ', Buffer.from(test, 'ascii'));
function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2)),'hex');
    return str;
}
console.log(hex2a('0103'));
function a2hex(str) {
	var arr = [];
	for (var i = 0, l = str.length; i < l; i ++) {
	  var hex = Number(str.charCodeAt(i)).toString(16);
	  arr.push(hex);
	}
	return arr.join('');
}
console.log(a2hex('0103'));
console.log(a2hex(hex2a('0103')));
const server1 = net.createServer((socket) => {
	socket1 = socket;
	socket.on('data', (received_data) => {
		console.log('CS1R> ', received_data.toString());
		console.log('CS2R> ', Buffer.from(received_data.toString(), 'hex'));
		if(socket2 != null && BRIDGE){
			socket2.write(Buffer.from(received_data.toString(), 'hex'));
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
		console.log('CS2R> ', Buffer.from(received_data.toString(), 'hex'));
		if(socket1 != null && BRIDGE){
			socket1.write(Buffer.from(received_data.toString(), 'hex'));
		}
		if(ECHO) {
			socket.write(received_data);
		}
	});
});

server2.listen(PORT2, () => {
	console.log('Datoms test communication tcp server started and bound to ' + PORT2);
});
  