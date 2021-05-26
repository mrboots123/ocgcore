import dotenv from 'dotenv'
dotenv.config()
import Singleton from "./store";
import {msg_draw, msg_new_turn, msg_select_idlecmd} from "./store/action";
import Socket from "./socket";


const socket = Socket.getInstance();



//store.dispatch(msg_draw({ player: 0, hand: [], }))



