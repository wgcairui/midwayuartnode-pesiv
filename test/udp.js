var dgram = require('dgram');

async function udp() {
    var client = dgram.createSocket("udp4");


    client.on("message", function (message, rinfo) {

        console.log({
            message,
            utf8: message.toString("utf8"),
            ...rinfo,

            time: new Date().toTimeString()
        });
    });

    client.on("listening", function () {
        var address = client.address();
        console.log("server listening " + address.address + ":" + address.port);


        client.send('test', 0, 4, 14179, "uart.ladishb.com", function (err, bytes) {

        });
        /* setInterval(() => {
            client.send('test', 0, 4, 14179, "uart.ladishb.com", function (err, bytes) {

            });
        }, 20000); */
    });

    client.bind(14150);

    /* return new Promise(r => {
        setTimeout(() => {
            r()
        }, 1e9)
    }) */
}

udp()