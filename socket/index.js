const Socket = (function () {
    let instance;
    const clients = [];

    function createInstance() {
        const io = require("socket.io")({
            path: "/socket.io",
            serveClient: false,
        });

        const server = require("http").createServer();

        io.attach(server, {
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });

        server.listen(3000);

        io.sockets.on('connection', function(socket) {
            console.info(`Client connected [id=${socket.id}]`);
            clients.push(socket.id);
            // when a client comes to us with a request we must handle it.
            socket.on('response', function(data){
                // here we must send the data downstream. but how if its encapsulated. sol: singleton out of the lib obj
            });
        });

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
