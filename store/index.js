import { createStore } from 'redux';
import rootReducer from './reducers';
import Socket from "../socket";

const Singleton = (function () {
    const socket = Socket.getInstance();
    let instance;

    function createInstance() {
        const store = createStore(rootReducer);
        //todo: socket should send game state to users here
        store.subscribe(() => {
            const clients = Socket.getClients();
            for(let i =0; i < clients.length; i++){
                socket.to(clients[i]).emit('game state', store.getState());
            }
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
