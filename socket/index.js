
const Socket = (function () {
    let instance;
    const clients = [];

    function createInstance() {


        const server = require("http").createServer();

        const io = require("socket.io")(server, {
            cors: {
                cors:true,
                origins:["http://127.0.0.1:4200"],
            }
        });

            io.attach(server, {
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        server.listen(3000);

        return io;
    }

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    function getClients(){
        return clients;
    }

    return {
        getInstance,
        getClients,
    };
})();

export default Socket;
