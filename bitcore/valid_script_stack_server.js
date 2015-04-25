// server
var net = require('net');
var lib = require('./valid_script_lib.js');
var fs = require('fs');

var socketAddr = './valid_script_stack_socket';
var server = net.createServer(function (socket) {

    socket.on('data', function (data) {
        data = data.toString().replace(/(\r\n|\n|\r)/gm,"");
        lib.stack(data, function(data) {socket.write(data);})
    });

});
server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        fs.unlinkSync(socketAddr);
        server.listen(socketAddr, function() { //'listening' listener
            console.log('server recovered');
        });
    }
});


server.listen(socketAddr);