var net = require('net');

var HOST = '192.168.1.6';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    // Add a 'data' event handler to this instance of socket
    // set timeout
    var tid = setTimeout(mycode, 2000);
    var i = 0;

    function mycode() {
        sock.write('You said hi in loop' + i);
        tid = setTimeout(mycode, 2000); // repeat myself
        i++;
    }

    function abortTimer() { // to be called when you want to stop the timer
        clearTimeout(tid);
    }
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
    });
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
