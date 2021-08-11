import Socket from "./socket";
import Lib from "./core";
import Singleton from "./store";
import DataManager from "./db";


const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const HashMap = require('hashmap');
const ffi = require('ffi'),
    ref = require('ref'),
    fs = require('fs'),
    StructType = require('ref-struct');
const libocgapi = require('./core/lib_core');
const analyze = require("./core/lib_analyzer");
const CardData = new StructType({
    code: 'uint',
    alias: 'uint',
    setcode: 'ulonglong',
    type: 'uint',
    level: 'uint',
    attribute: 'uint',
    race: 'uint',
    attack: 'int',
    defense: 'int',
    lscale: 'uint',
    rscale: 'uint',
    link_marker: 'uint'
});
const size_t = new StructType({
    size: 'uint'
});
var test;

const socket = Socket.getInstance();
const store = Singleton.getInstance();
const library = Lib.getInstance();

socket.sockets.on('connection', function(socket) {
    console.info(`Client connected [id=${socket.id}]`);
    //socket.join('waiting room');
   // clients.push(socket.id);
    //todo: if the user joins with a valid jwt token move then to the duel room, else the are a spectator
    // at this point we should already know who the 2 players are, we are just verifying the tokens

    socket.on('requestHistory', function(data){
        console.log('requesting history!')

        socket.emit('data', store.getState())

        //todo: here we need to restart the process() from lib. which will then trigger a loop because of redux
        // here we must send the data downstream. but how if its encapsulated. sol: singleton out of the lib obj
    });

    socket.on('query_card', function (data){

        const card = Lib.queryCard(0, 0x08, 1)
        socket.emit('query_card_result', )
    });

    socket.on('responsei', function (data){
        // if jwt is valid then remove him from waiting room and place in duel room, otherwise move to spectator?
        // i think we might need to do this automatically
        // solution: everyone has a jwt token so do this automatically
        console.log('setting response')
        console.log(data)
        Lib.setResponseI( data);

    });

    socket.on('responseb', function (data){
        // if jwt is valid then remove him from waiting room and place in duel room, otherwise move to spectator?
        // i think we might need to do this automatically
        // solution: everyone has a jwt token so do this automatically
        console.log('setting response b')
        console.log(data)
        library.set_responseb(Lib.getPduel(), data);
        Lib.process()

    });
});
const dataManager = DataManager.getInstance();

open({
    filename: 'C:\\Users\\SamsungEvo\\WebstormProjects\\ocgcore\\core\\bin\\cards.cdb',
    driver: sqlite3.Database
}).then(async (db) => {
    const results = await db.all('select * from datas,texts where datas.id=texts.id');
    const _datas = dataManager._datas;
    const _strings = dataManager._strings;

    results.forEach(result => {
        const {
            id, ot, alias, setcode, type, atk, def, level, race,
            attribute, category, name, desc,
        } = result;

        _datas.set(id, {
            id,
            ot,
            alias,
            setcode,
            type,
            atk,
            def,
            level: level & 0xff,
            lscale:  (level >> 24) & 0xff,
            rscale:  (level >> 16) & 0xff,
            race,
            attribute,
            category,
        });

        _strings.set(id, {
            name,
            desc,
        });
    });

    const getData = (code, pData) => {
        const cdit = _datas.get(code);
        if(!cdit){
            return false;
        }
        const card_struct = new CardData({
            code: cdit.code,
            alias: cdit.alias,
            setcode: cdit.setcode,
            type: cdit.type,
            level: cdit.level,
            attribute: cdit.attribute,
            race: cdit.race,
            attack: cdit.atk,
            defense: cdit.def,
            lscale: cdit.lscale,
            rscale: cdit.rscale,
            link_marker: 0
            //todo: return and update link marker
        });

        ref.reinterpret(pData.deref()['ref.buffer'], CardData.size);
        ref.set(pData,0,card_struct);
        return true;
    }

    const cardReader = (code, pData) => {
        getData(code, pData)
        return 0;
    }
    const path = require('path');
    const scriptReader = (scriptname, sizePointer) => {

        const scriptsFolder = path.resolve('./ygopro-scripts')
        let file = scriptsFolder + path.join('/') + scriptname.substr(9, 13);
        const size = ref.reinterpret(sizePointer.deref()['ref.buffer'], 32);

        if (scriptname === './expansions/script/constant.lua') {
            file = path.resolve(scriptsFolder + '/constant.lua');
        }
        if (scriptname === './expansions/script/utility.lua') {
            file = path.resolve(scriptsFolder + '/utility.lua');
        }
        if (fs.existsSync(file)) {
            try {
                const script = fs.readFileSync(file);
                size.writeUInt32LE(script.length);
                return ref.readCString(script, 0);
            } catch (e) {
                return ref.alloc('pointer');
            }
        }
        console.log(scriptname, 'at', file, 'does not exist');
        return ref.alloc('pointer');

    }


    function messageHandler(external_pduel, type) {
        let messageBuffer = Buffer.alloc(1024);
        messageBuffer.type = ref.types.byte;
        test.get_log_message(external_pduel, messageBuffer);
        console.log(messageBuffer.toString())
    }


    test = Lib.getInstance();
    const pduel = Lib.getPduel();




    const card_reader_function = ffi.Callback('uint32', ['uint32', ref.refType(CardData)], cardReader);
    const script_reader_function = ffi.Callback('string', ['string', ref.refType(size_t)], scriptReader);
    const message_reader_function = ffi.Callback('int32', ['pointer', 'uint32'], messageHandler);

    Lib.setScriptReader(script_reader_function);
    Lib.setCardReader(card_reader_function);
    Lib.setMessageHandler(message_reader_function);


    // test.set_script_reader(script_reader_function);
    // test.set_card_reader(card_reader_function);
    // test.set_message_handler(message_reader_function);


    Lib.preloadScript('./expansions/script/constant.lua');
    Lib.preloadScript('./expansions/script/utility.lua');

    // test.preload_script(pduel, './expansions/script/constant.lua', 0x10000000);
    // test.preload_script(pduel, './expansions/script/utility.lua', 0x10000000);

    /*
    void new_card(ptr pduel, uint32 code, uint8 owner, uint8 playerid, uint8 location, uint8 sequence, uint8 position);
     */

    // function mainProcess(game) {
    //     const coreMessage = Buffer.alloc(0x1000);
    //     let flag = 0,
    //         message = 0;
    //
    //     const result = test.process(pduel),
    //         length = result & 0xffff;
    //
    //     flag = result >> 16;
    //     if (length) {
    //         test.get_message(pduel, coreMessage);
    //     }
    //     message = analyze(coreMessage, length, game);
    //
    // }
    const blueEyes = [
        38517737, //Blue-Eyes Alternative White Dragon
        71039903,71039903,71039903, //The White Stone of Ancients
        45467446, //Dragon Spirit of White
        8240199,8240199,8240199, // Sage with Eyes of Blue
        89631140,89631140,89631140, // Blue-eyes White Dragon
        14087893,14087893, // Book of Moon
        39701395,39701395,39701395, //Cards of Consonance
        48800175, //melody of awakening dragon
        10667321, //ancient rules
        99590524,99590524 // treacherous trap hole
    ];

    const harpies = [
        66386380, // harpies oracle x
        90238142,90238142,90238142, // harpie channeler 3
        91932350,91932350, //harpie lady 1 5
        39392286,39392286,39392286, // harpie perfumer 6
        27243130,27243130,27243130, // forbidden lance 9
        94145683,94145683,94145683, // swallows nest 12
        90219263,90219263, // elegant egotist 14
        39275698, // harpies feather rest, 15
        90238142,99590524 // treacherous trap hole 17
    ]

    const LOCATION_DECK = 0x01,POS_FACEDOWN_DEFENSE = 0x8;
    test.set_player_info(pduel, 0, 4000, 4, 1);
    test.set_player_info(pduel, 1, 4000, 5, 1);
    harpies.forEach(card => {
        test.new_card(pduel, card, 0, 0, LOCATION_DECK, 0, POS_FACEDOWN_DEFENSE);

    });
    blueEyes.forEach(card => {
        test.new_card(pduel, card, 1, 1, LOCATION_DECK, 0, POS_FACEDOWN_DEFENSE);

    });

    test.start_duel(pduel, 0x040000);


    const proc = Lib.process();

    //console.log(Lib.queryCard(0, 0x01, 2));

    // function mainProcess() {
    //     const ocgcore = Lib.getInstance();
    //     const coreMessage = Buffer.alloc(0x1000);
    //     let flag = 0,
    //         message = 0;
    //
    //     while (!message) {
    //
    //         if (flag === 2) {
    //             break;
    //         }
    //         const result = ocgcore.process(pduel),
    //             length = result & 0xffff;
    //
    //         flag = result >> 16;
    //         if (length) {
    //             ocgcore.get_message(pduel, coreMessage);
    //         }
    //         message = analyze(coreMessage, length);
    //
    //         //were cut off by select idle cmd returning 1
    //     }
    //
    //     if (message === 2) {
    //         console.log('end duel')
    //     }
    // }
    //
    // mainProcess()

    // const gameState = {
    //
    // }
    // //makes player 0 draw 4
    // mainProcess({})
    // //makes player 1 draw 5
    // mainProcess({})
    //
    // //new turn for player 0
    // mainProcess({})
    // //
    // //
    // mainProcess({})/*PHASE_DRAW */
    // //
    // mainProcess({})  /* PHASE_STANDBY */
    // //
    // //
    // mainProcess({})
    // //
    // //
    // //
    // //
    // // // msg_select_idlecmd this tells us all the plays available with the current hand
    // mainProcess({})
    // //
    // // // at this point the analyzer expects a response, otherwise msg_retry is sent
    // // // //7 ends the phase
    // test.set_responsei(pduel, 7)
    // //
    // mainProcess({})
    // //
    // //
    // // // player 2 is asked to chain something, but there is no chain available
    // mainProcess({})
    // //
    // // // player 2 responsds with no chain, we would call this when it was possible to chain -1 means no 0 means yes
    // test.set_responsei(pduel,-1)
    // //
    // //
    // // // turn is moved to end phase 5, which is end phase?
    // mainProcess({})
    // //
    // // // turn is handed to player 2
    // mainProcess({})
    // //
    // //
    // //
    // //
    // // // phase - draw card
    // mainProcess({})
    // //
    // //
    // // // draw the actual card
    // mainProcess({})
    // //
    // // // chain is started for p2, but no activatble effects. so we must respond wit -1
    // mainProcess({})
    // test.set_responsei(pduel,-1)
    //
    //
    // //now a chain is started for p1 but nothing is activable so respond -1
    // mainProcess({})
    // test.set_responsei(pduel,-1)
    //
    //
    // // standby phase
    // mainProcess({});
    //
    //
    // // transition to mp1
    // mainProcess({});
    //
    // //msg_select idle cmd => here we are asked to do an event -> either set or summon
    // mainProcess({});
    //
    // //respond with the first slot of activateable cards, in this case melody of awakenign dragon
    // test.set_responsei(pduel, (0 << 16) + 5)
    // mainProcess({});
    // mainProcess({});
    //
    // const tbuff = Buffer.alloc(3);
    // tbuff.writeInt8(1,0);
    // tbuff.writeInt8(0x08,1);
    // tbuff.writeInt8(2,2);
    //
    //
    // //respond by setting the card into a zone in this case, index 2
    // test.set_responseb(pduel, tbuff)
    //
    // // prints information about how the card was moved
    // mainProcess({});
    //
    // // a chaining event occurs, can be ignored
    // mainProcess({});
    // // //
    // // // a message hint gets logged
    // mainProcess({});
    // //
    // // //user is asked to pay a cost for the activation of melody of awakening dragon
    // mainProcess({});
    //
    // const selectbuff = Buffer.alloc(2);
    // selectbuff.writeInt8(1,0);
    // selectbuff.writeInt8(0,1);
    //
    // test.set_responseb(pduel, selectbuff)
    // //these are all chain messages, user is asked but no chain is available
    // mainProcess({});
    // mainProcess({});
    // mainProcess({});
    // mainProcess({});
    // mainProcess({});
    // mainProcess({});
    // //at this point user is asked to select the cards to add to his hand
    // mainProcess({});
    //
    // const costbuff = Buffer.alloc(2);
    // costbuff.writeInt8(1,0);
    // costbuff.writeInt8(0,1);
    // test.set_responseb(pduel, costbuff);
    // //
    // //
    // // //msg move is moving card
    // mainProcess({});
    // //
    // //
    // //
    // // //asking to confirm sending card to grave
    // mainProcess({});
    // // //shuffling hand
    // mainProcess({});
    // //
    // // //deck shuffled
    // mainProcess({});
    // //
    // //
    // // // chain solved
    // mainProcess({});
    // //
    // //
    // // //since melody resolved, it is being moved to gy
    // mainProcess({});
    // //
    // //
    // // //chain ends
    // mainProcess({});
    // //
    // //
    // // //msg-select-chain
    // mainProcess({});
    // //
    // // //msg-select-chain
    // mainProcess({});
    // //
    // //
    // // //MSG_SELECT_IDLECMD here we are asked to proceed either to bp or ep
    // mainProcess({});
    // //
    // // //end out phase
    // test.set_responsei(pduel, 7)
    // //
    // //
    // // //hint
    // mainProcess({});
    // //
    // // //msg_select_chain
    // mainProcess({});
    // //
    // mainProcess({});
    //
    // //new turn
    // mainProcess({});
    //
    //
    // mainProcess({});
    //
    //























    // function msg_update_card(card, message, pbuf) {
    //     message.command = 'MSG_UPDATE_CARD';
    //     pbuf.readInt32();
    //     message.card = makeCard(pbuf, undefined, true);
    //     Object.assign(message.card, card);
    //     return message;
    // }
    //
    // function msg_update_data(player, location) {
    //     const count = test.query_field_count(pduel, player, location),
    //         cards = [],
    //         message = {};
    //     console.log('the count is: ' + count)
    //     for (let index = 0; count > index; ++index) {
    //         const qbuf = Buffer.alloc(0x40000);
    //         qbuf.type = ref.types.byte;
    //         test.query_card(pduel, player, location, index, 0xff9999, qbuf, 0);
    //         const pack = msg_update_card({ player, location: enums.locations[location], index }, {}, new BufferStreamReader(qbuf));
    //         console.log(pack.card.id)
    //         cards.push(pack.card);
    //     }
    //     message.command = 'MSG_UPDATE_DATA';
    //     message.location = enums.locations[location];
    //     message.cards = cards;
    //     // sendBufferToPlayer(0, message);
    //     // sendBufferToPlayer(1, message);
    //     // sendToObservers();
    // }



})