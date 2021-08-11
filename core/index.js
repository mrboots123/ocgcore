import BufferStreamReader from "./model_stream_reader";
import makeCard from "./lib_card";

const libocgapi = require('./lib_core');
const analyze = require("./lib_analyzer");
const ffi = require('ffi'),
    ref = require('ref'),
    fs = require('fs');

const Lib = (function () {
    let instance;
    let ocgcore;
    let pduel;
    var result = 0;

    function createInstance() {
        ocgcore = libocgapi();
        pduel = ocgcore.create_duel(1);
        return ocgcore;
    }

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    function setScriptReader(script_reader_function){
        ocgcore.set_script_reader(script_reader_function);
    }

    function setCardReader(card_reader_function){
        ocgcore.set_card_reader(card_reader_function);
    }

    function setMessageHandler(message_reader_function){
        ocgcore.set_message_handler(message_reader_function);
    }

    function preloadScript(scriptname){
        ocgcore.preload_script(pduel, scriptname, 0x10000000);

    }

    function getPduel(){
        return pduel;
    }

    function queryCard(playerId, location, sequence){
        const buffer = Buffer.alloc(0x40000);
        buffer.type = ref.types.byte;
        // const pbuffer = ref.alloc('pointer')

        // ref.writePointer(pbuffer, 0, buffer);
        // console.log('before')
        // console.log(buffer)
        const val = ocgcore.query_card(pduel, playerId, location, sequence, 0xffdfff, buffer, 0);
        //
        // console.log('after')
        // console.log(ref.readPointer(pbuffer, 0))
        //consol
        const card = new BufferStreamReader(buffer);

        card.readInt32();

        const processCard = makeCard(card, playerId, true)
        return processCard;

    }

    function setResponseI(data){
        ocgcore.set_responsei(pduel, data);
        process();
    }
    function process(){
        const coreMessage = Buffer.alloc(0x1000);
        let flag = 0,
            message = 0;

        while (!message) {

            if (flag === 2) {
                break;
            }
            result = ocgcore.process(pduel);

           const     length = result & 0xffff;

            flag = result >> 16;
            if (length) {
                ocgcore.get_message(pduel, coreMessage);
            }
            message = analyze(coreMessage, length);

        }

        if (message === 2) {
            console.log('end duel')
        }
    }

    return {
        getInstance,
        setCardReader,
        setScriptReader,
        setMessageHandler,
        process,
        getPduel,
        preloadScript,
        queryCard,
        setResponseI,
    };
})();

export default Lib;
