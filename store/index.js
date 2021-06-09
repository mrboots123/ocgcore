import { createStore } from 'redux';
import rootReducer from './reducers';
import Socket from "../socket";
const socket = Socket.getInstance();

const Singleton = (function () {

    let instance;

    function createInstance() {
        const store = createStore(rootReducer);
        //todo: socket should send game state to users here
        store.subscribe(() => {

            socket.emit('data', store.getState())
            // const clients = Socket.getClients();
            // for(let i =0; i < clients.length; i++){
            //     socket.to(clients[i]).emit('game state', store.getState());
            // }

            //console.log('emitting')
            // socket.sockets.on('connection', function(socket) {
            //     console.info(`Client connected [id=${socket.id}]`);
            //     socket.join('waiting room');
            //     clients.push(socket.id);
            //     //todo: if the user joins with a valid jwt token move then to the duel room, else the are a spectator
            //     // at this point we should already know who the 2 players are, we are just verifying the tokens
            //
            //     socket.on('response', function(data){
            //         console.log(':)')
            //         // here we must send the data downstream. but how if its encapsulated. sol: singleton out of the lib obj
            //     });
            //
            //     socket.on('authenticate', function (data){
            //         // if jwt is valid then remove him from waiting room and place in duel room, otherwise move to spectator?
            //         // i think we might need to do this automatically
            //         // solution: everyone has a jwt token so do this automatically
            //     });
            // });
        });
        return store;
    }

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    return {
        getInstance,
    };
})();

export default Singleton;
