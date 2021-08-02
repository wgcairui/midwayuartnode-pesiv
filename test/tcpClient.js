var net = require('net');
/*  
 var client = net.connect({ port: 4196, host: "www.pesiv.com" }, function () { //'connect' listener
    console.log('client connected');
    
});

client.on('data', function (data) {
    console.log(data.toString());
});

client.on('end', function () {
    console.log('client disconnected');
}); 

 */

const server = new net.Server()

server.on("connection", socket => {

    /* socket.connect({
        address:"www.pesiv.com",
        port:"4196"
    }) */
    socket.on("data", (data) => {

        console.log({ data, b: data.toString(), add: socket.remoteAddress, port: socket.remotePort });
    })
})


server.listen(4196, "0.0.0.0")


var dgram = require('dgram');

async function udp() {
    var client = dgram.createSocket("udp4");


    client.on("message", function (message, rinfo) {
        console.log({
            message,
            hex: message.toString("hex", 3, message.length - 2),
            utf8: message.toString("utf8"),
            ...rinfo,

            time: new Date().toTimeString()
        });
        client.send(message, 0, message.length, 14197, "www.pesiv.com", function (err, bytes) {

        });
    });

    client.on("listening", function () {
        var address = client.address();
        console.log("server listening " +
            address.address + ":" + address.port);
    });

    client.bind(14197);

    /* return new Promise(r => {
        setTimeout(() => {
            r()
        }, 1e9)
    }) */
}

udp()