const libocgapi = require('./lib_core');
const analyze = require("./lib_analyzer");

const Lib = (function () {
    let instance;
    let ocgcore;
    let pduel;

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


    function process(){
        const coreMessage = Buffer.alloc(0x1000);
        let flag = 0,
            message = 0;

        while (!message) {

            if (flag === 2) {
                break;
            }
            const result = ocgcore.process(pduel),
                length = result & 0xffff;

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
        preloadScript
    };
})();

export default Lib;
