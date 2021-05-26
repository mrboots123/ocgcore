const enums = {
    locations: {
        0x0: 'NONEXISTANT',
        0x01: 'DECK',
        0x02: 'HAND',
        0x04: 'MONSTERZONE',
        0x08: 'SPELLZONE',
        0x10: 'GRAVE',
        0x16: 'MONSTERZONE', // (leaving xyz material)
        0x20: 'BANISHED',
        0x40: 'EXTRA',
        0x80: 'OVERLAY',
        0xc0: 'EXTRA',  // (becoming xyz material)
        0x100: 'FZONE',
        0x200: 'PZONE'
    },
    race: {
        0x1: 'Warrior',
        0x2: 'SpellCaster',
        0x4: 'Fairy',
        0x8: 'Fiend',
        0x10: 'Zombie',
        0x20: 'Machine',
        0x40: 'Aqua',
        0x80: 'Pyro',
        0x100: 'Rock',
        0x200: 'WindBeast',
        0x400: 'Plant',
        0x800: 'Insect',
        0x1000: 'Thunder',
        0x2000: 'Dragon',
        0x4000: 'Beast',
        0x8000: 'BestWarrior',
        0x10000: 'Dinosaur',
        0x20000: 'Fish',
        0x40000: 'SeaSerpent',
        0x80000: 'Reptile',
        0x100000: 'Psychic',
        0x200000: 'DivineBeast'
    },
    RPS: {
        0x01: 'Rock',
        0x02: 'Scissors',
        0x04: 'Paper'
    },
    query: {
        Code: 0x01,
        Position: 0x02,
        Alias: 0x04,
        Type: 0x08,
        Level: 0x10,
        Rank: 0x20,
        Attribute: 0x40,
        Race: 0x80,
        Attack: 0x100,
        Defence: 0x200,
        BaseAttack: 0x400,
        BaseDefence: 0x800,
        Reason: 0x1000,
        ReasonCard: 0x2000,
        EquipCard: 0x4000,
        TargetCard: 0x8000,
        OverlayCard: 0x10000,
        Counters: 0x20000,
        Owner: 0x40000,
        IsDisabled: 0x80000,
        IsPublic: 0x100000,
        LScale: 0x200000,
        RScale: 0x400000,
        Link: 0x800000

    },
    cardAttributes: {
        0x01: 'Earth',
        0x02: 'Water',
        0x04: 'Fire',
        0x08: 'Wind',
        0x10: 'Light',
        0x20: 'Dark',
        0x40: 'Divine'
    },
    phase: {
        /* PHASE_DRAW */
        0x01: 0,
        /* PHASE_STANDBY */
        0x02: 1,
        /* PHASE_MAIN1 */
        0x04: 2,
        /* PHASE_BATTLE_START */
        0x08: 3,
        /* PHASE_BATTLE_STEP */
        0x10: 3,
        /* PHASE_DAMAGE */
        0x20: 3,
        /* PHASE_DAMAGE_CAL */
        0x40: 3,
        /* PHASE_BATTLE */
        0x80: 3,
        /* PHASE_MAIN2 */
        0x100: 4,
        /* PHASE_END */
        0x200: 5
    },
    positions: {
        0x1: 'FaceUpAttack',
        0x2: 'FaceDownAttack',
        0x4: 'FaceUpDefence',
        0x8: 'FaceDownDefence',
        0x5: 'FaceUp',
        0xA: 'FaceDown',
        0x3: 'Attack',
        0xC: 'Defence'
    },
    cardTypes: {
        0x1: 'Monster',
        0x2: 'Spell',
        0x4: 'Trap',
        0x10: 'Normal',
        0x20: 'Effect',
        0x40: 'Fusion',
        0x80: 'Ritual',
        0x100: 'TrapMonster',
        0x200: 'Spirit',
        0x400: 'Union',
        0x800: 'Dual',
        0x1000: 'Tuner',
        0x2000: 'Synchro',
        0x4000: 'Token',
        0x10000: 'QuickPlay',
        0x20000: 'Continuous',
        0x40000: 'Equip',
        0x80000: 'Field',
        0x100000: 'Counter',
        0x200000: 'Flip',
        0x400000: 'Toon',
        0x800000: 'Xyz',
        0x4000000: 'Link'
    },
    lobbyStates: {
        0x8: 'PLAYERCHANGE_OBSERVE',
        0x9: 'PLAYERCHANGE_READY',
        0xA: 'PLAYERCHANGE_NOTREADY',
        0xB: 'PLAYERCHANGE_LEAVE'

    }
};
enums.STOC = {
    0x0: 'STOC_UNKNOWN',
    0x1: 'STOC_GAME_MSG',
    0x2: 'STOC_ERROR_MSG',
    0x3: 'STOC_SELECT_HAND',
    0x4: 'STOC_SELECT_TP',
    0x5: 'STOC_HAND_RESULT',
    0x6: 'STOC_TP_RESULT',
    0x7: 'STOC_CHANGE_SIDE',
    0x8: 'STOC_WAITING_SIDE',
    0x11: 'STOC_CREATE_GAME',
    0x12: 'STOC_JOIN_GAME',
    0x13: 'STOC_TYPE_CHANGE',
    0x14: 'STOC_LEAVE_GAME',
    0x15: 'STOC_DUEL_START',
    0x16: 'STOC_DUEL_END',
    0x17: 'STOC_REPLAY',
    0x18: 'STOC_TIME_LIMIT',
    0x19: 'STOC_CHAT',
    0x20: 'STOC_HS_PLAYER_ENTER',
    0x21: 'STOC_HS_PLAYER_CHANGE',
    0x22: 'STOC_HS_WATCH_CHANGE',
    STOC_GAME_MSG: {
        1: 'MSG_RETRY',
        2: 'MSG_HINT',
        3: 'MSG_WAITING',
        4: 'MSG_START',
        5: 'MSG_WIN',
        6: 'MSG_UPDATE_DATA',
        7: 'MSG_UPDATE_CARD',
        8: 'MSG_REQUEST_DECK',
        10: 'MSG_SELECT_BATTLECMD',
        11: 'MSG_SELECT_IDLECMD',
        12: 'MSG_SELECT_EFFECTYN',
        13: 'MSG_SELECT_YESNO',
        14: 'MSG_SELECT_OPTION',
        15: 'MSG_SELECT_CARD',
        16: 'MSG_SELECT_CHAIN',
        18: 'MSG_SELECT_PLACE',
        19: 'MSG_SELECT_POSITION',
        20: 'MSG_SELECT_TRIBUTE',
        21: 'MSG_SORT_CHAIN',
        22: 'MSG_SELECT_COUNTER',
        23: 'MSG_SELECT_SUM',
        24: 'MSG_SELECT_DISFIELD',
        25: 'MSG_SORT_CARD',
        26: 'MSG_SELECT_UNSELECT_CARD',
        30: 'MSG_CONFIRM_DECKTOP',
        31: 'MSG_CONFIRM_CARDS',
        32: 'MSG_SHUFFLE_DECK',
        33: 'MSG_SHUFFLE_HAND',
        34: 'MSG_REFRESH_DECK',
        35: 'MSG_SWAP_GRAVE_DECK',
        36: 'MSG_SHUFFLE_SET_CARD',
        37: 'MSG_REVERSE_DECK',
        38: 'MSG_DECK_TOP',
        40: 'MSG_NEW_TURN',
        41: 'MSG_NEW_PHASE',
        50: 'MSG_MOVE',
        53: 'MSG_POS_CHANGE',
        54: 'MSG_SET',
        55: 'MSG_SWAP',
        56: 'MSG_FIELD_DISABLED',
        60: 'MSG_SUMMONING',
        61: 'MSG_SUMMONED',
        62: 'MSG_SPSUMMONING',
        63: 'MSG_SPSUMMONED',
        64: 'MSG_FLIPSUMMONING',
        65: 'MSG_FLIPSUMMONED',
        70: 'MSG_CHAINING',
        71: 'MSG_CHAINED',
        72: 'MSG_CHAIN_SOLVING',
        73: 'MSG_CHAIN_SOLVED',
        74: 'MSG_CHAIN_END',
        75: 'MSG_CHAIN_NEGATED',
        76: 'MSG_CHAIN_DISABLED',
        80: 'MSG_CARD_SELECTED',
        81: 'MSG_RANDOM_SELECTED',
        83: 'MSG_BECOME_TARGET',
        90: 'MSG_DRAW',
        91: 'MSG_DAMAGE',
        92: 'MSG_RECOVER',
        93: 'MSG_EQUIP',
        94: 'MSG_LPUPDATE',
        95: 'MSG_UNEQUIP',
        96: 'MSG_CARD_TARGET',
        97: 'MSG_CANCEL_TARGET',
        100: 'MSG_PAY_LPCOST',
        101: 'MSG_ADD_COUNTER',
        102: 'MSG_REMOVE_COUNTER',
        110: 'MSG_ATTACK',
        111: 'MSG_BATTLE',
        112: 'MSG_ATTACK_DISABLED',
        113: 'MSG_DAMAGE_STEP_START',
        114: 'MSG_DAMAGE_STEP_END',
        120: 'MSG_MISSED_EFFECT',
        121: 'MSG_BE_CHAIN_TARGET',
        122: 'MSG_CREATE_RELATION',
        123: 'MSG_RELEASE_RELATION',
        130: 'MSG_TOSS_COIN',
        131: 'MSG_TOSS_DICE',
        140: 'MSG_ANNOUNCE_RACE',
        141: 'MSG_ANNOUNCE_ATTRIB',
        142: 'MSG_ANNOUNCE_CARD',
        143: 'MSG_ANNOUNCE_NUMBER',
        160: 'MSG_CARD_HINT',
        161: 'MSG_TAG_SWAP',
        162: 'MSG_RELOAD_FIELD',
        163: 'MSG_AI_NAME',
        164: 'MSG_SHOW_HINT',
        170: 'MSG_MATCH_KILL',
        180: 'MSG_CUSTOM_MSG',
        MSG_HINT: {
            1: 'HINT_EVENT',
            2: 'HINT_MESSAGE',
            3: 'HINT_SELECTMSG',
            4: 'HINT_OPSELECTED',
            5: 'HINT_EFFECT',
            6: 'HINT_RACE',
            7: 'HINT_ATTRIB',
            8: 'HINT_CODE',
            9: 'HINT_NUMBER',
            10: 'HINT_CARD'

        },
        MSG_NEW_PHASE: {
            0x01: 'PHASE_DRAW',
            0x02: 'PHASE_STANDBY',
            0x04: 'PHASE_MAIN1',
            0x08: 'PHASE_BATTLE',
            0x10: 'PHASE_DAMAGE',
            0x20: 'PHASE_DAMAGE_CAL',
            0x40: 'PHASE_MAIN2',
            0x80: 'PHASE_END'
        }

    },
    STOC_ERROR_MSG: {
        0x1: 'ERRMSG_JOINERROR',
        0x2: 'ERRMSG_DECKERROR',
        0x3: 'ERRMSG_SIDEERROR',
        0x4: 'ERRMSG_VERERROR',
        ERRMSG_DECKERROR: [
            'DECKERROR_LFLIST',
            'DECKERROR_OCGONLY',
            'DECKERROR_TCGONLY',
            'DECKERROR_UNKNOWNCARD',
            'DECKERROR_CARDCOUNT',
            'DECKERROR_MAINCOUNT',
            'DECKERROR_EXTRACOUNT',
            'DECKERROR_SIDECOUNT'
        ]
    }
};

enums.complexTypes = {
    'Normal': 17,
    'Effect': 33,
    'Fusion': 65,
    'Fusion / Effect': 97,
    'Ritual': 129,
    'Ritual / Effect': 161,
    'Spirit': 545,
    'Ritual / Spirit / Effect': 673,
    'Union': 1057,
    'Gemini / Effect': 2081,
    'Tuner': 4113,
    'Tuner / Effect': 4129,
    'Fusion / Tuner': 4161,
    'Synchro': 8193,
    'Synchro / Effect': 8225,
    'Synchro / Tuner / Effect': 12321,
    'Token': 16401,
    'Flip / Effect': 2097185,
    'Flip / Tuner / Effect': 2101281,
    'Toon / Effect': 4194337,
    'Xyz': 8388609,
    'Xyz / Effect': 8388641,
    'Pendulum / Normal': 16777233,
    'Pendulum / Effect': 16777249,
    'Fusion / Pendulum / Effect': 16777313,
    'Pendulum / Tuner / Normal': 16781313,
    'Pendulum / Tuner / Effect': 16781345,
    'Synchro / Pendulum / Effect': 16785441,
    'Pendulum / Flip / Effect': 18874401,
    'Xyz / Pendulum / Effect': 25165857,
    'Link': 33554433,
    'Link / Effect': 33554465,
    'Spell / Normal': 2,
    'Trap / Normal': 4,
    'Spell / Ritual': 130,
    'Spell / Quick-Play': 65538,
    'Spell / Continuous': 131074,
    'Trap / Continuous': 131076,
    'Spell / Equip': 262146,
    'Spell / Field': 524290,
    'Trap / Counter': 1048580
};

enums.CTOS = {
    0x1: 'CTOS_RESPONSE',
    0x2: 'CTOS_UPDATE_DECK',
    0x3: 'CTOS_HAND_RESULT',
    0x4: 'CTOS_TP_RESULT',
    0x10: 'CTOS_PLAYER_INFO',
    0x11: 'CTOS_CREATE_GAME',
    0x12: 'CTOS_JOIN_GAME',
    0x13: 'CTOS_LEAVE_GAME',
    0x14: 'CTOS_SURRENDER',
    0x15: 'CTOS_TIME_COMFIRM',
    0x16: 'CTOS_CHAT',
    0x20: 'CTOS_HS_TODUELIST',
    0x21: 'CTOS_HS_TOOBSERVER',
    /*to observer*/
    0x22: 'CTOS_HS_READY',
    0x23: 'CTOS_HS_NOTREADY',
    0x24: 'CTOS_HS_KICK',
    0x25: 'CTOS_HS_START'
    /*defunc 0x26: "DEVPRO_GAME_INFO" */

};

enums.timeout = {
    'MSG_RETRY': 0,
    'MSG_HINT': 0,
    'MSG_WAITING': 0,
    'MSG_START': 0,
    'MSG_WIN': 0,
    'MSG_UPDATE_DATA': 0,
    'MSG_UPDATE_CARD': 0,
    'MSG_REQUEST_DECK': 0,
    'MSG_SELECT_BATTLECMD': 0,
    'MSG_SELECT_IDLECMD': 0,
    'MSG_SELECT_EFFECTYN': 0,
    'MSG_SELECT_YESNO': 0,
    'MSG_SELECT_OPTION': 0,
    'MSG_SELECT_CARD': 0,
    'MSG_SELECT_CHAIN': 0,
    'MSG_SELECT_PLACE': 0,
    'MSG_SELECT_POSITION': 0,
    'MSG_SELECT_TRIBUTE': 0,
    'MSG_SORT_CHAIN': 0,
    'MSG_SELECT_COUNTER': 0,
    'MSG_SELECT_SUM': 0,
    'MSG_SELECT_DISFIELD': 0,
    'MSG_SORT_CARD': 0,
    'MSG_CONFIRM_DECKTOP': 0,
    'MSG_CONFIRM_CARDS': 0,
    'MSG_SHUFFLE_DECK': 2000,
    'MSG_SHUFFLE_HAND': 3000,
    'MSG_REFRESH_DECK': 0,
    'MSG_SWAP_GRAVE_DECK': 0,
    'MSG_SHUFFLE_SET_CARD': 0,
    'MSG_REVERSE_DECK': 0,
    'MSG_DECK_TOP': 0,
    'MSG_NEW_TURN': 1000,
    'MSG_NEW_PHASE': 500,
    'MSG_MOVE': 300,
    'MSG_POS_CHANGE': 300,
    'MSG_SET': 300,
    'MSG_SWAP': 300,
    'MSG_FIELD_DISABLED': 0,
    'MSG_SUMMONING': 0,
    'MSG_SUMMONED': 300,
    'MSG_SPSUMMONING': 0,
    'MSG_SPSUMMONED': 0,
    'MSG_FLIPSUMMONING': 300,
    'MSG_FLIPSUMMONED': 300,
    'MSG_CHAINING': 0,
    'MSG_CHAINED': 0,
    'MSG_CHAIN_SOLVING': 0,
    'MSG_CHAIN_SOLVED': 0,
    'MSG_CHAIN_END': 0,
    'MSG_CHAIN_NEGATED': 0,
    'MSG_CHAIN_DISABLED': 0,
    'MSG_CARD_SELECTED': 0,
    'MSG_RANDOM_SELECTED': 0,
    'MSG_BECOME_TARGET': 0,
    'MSG_DRAW': 1000,
    'MSG_DAMAGE': 2000,
    'MSG_RECOVER': 2000,
    'MSG_EQUIP': 0,
    'MSG_LPUPDATE': 0,
    'MSG_UNEQUIP': 0,
    'MSG_CARD_TARGET': 0,
    'MSG_CANCEL_TARGET': 0,
    'MSG_PAY_LPCOST': 2000,
    'MSG_ADD_COUNTER': 2000,
    'MSG_REMOVE_COUNTER': 0,
    'MSG_ATTACK': 0,
    'MSG_BATTLE': 3000,
    'MSG_ATTACK_DISABLED': 0,
    'MSG_DAMAGE_STEP_START': 0,
    'MSG_DAMAGE_STEP_END': 0,
    'MSG_MISSED_EFFECT': 0,
    'MSG_BE_CHAIN_TARGET': 0,
    'MSG_CREATE_RELATION': 0,
    'MSG_RELEASE_RELATION': 0,
    'MSG_TOSS_COIN': 0,
    'MSG_TOSS_DICE': 0,
    'MSG_ANNOUNCE_RACE': 0,
    'MSG_ANNOUNCE_ATTRIB': 0,
    'MSG_ANNOUNCE_CARD': 0,
    'MSG_ANNOUNCE_NUMBER': 0,
    'MSG_CARD_HINT': 0,
    'MSG_TAG_SWAP': 0,
    'MSG_RELOAD_FIELD': 0,
    'MSG_AI_NAME': 0,
    'MSG_SHOW_HINT': 0,
    'MSG_MATCH_KILL': 0,
    'MSG_CUSTOM_MSG': 0
};

enums.enumReasons = {
    DESTROY: 0x1,
    RELEASE: 0x2,
    TEMPORARY: 0x4,
    MATERIAL: 0x8,
    SUMMON: 0x10,
    BATTLE: 0x20,
    EFFECT: 0x40,
    COST: 0x80,
    ADJUST: 0x100,
    LOST_TARGET: 0x200,
    RULE: 0x400,
    SPSUMMON: 0x800,
    DISSUMMON: 0x1000,
    FLIP: 0x2000,
    DISCARD: 0x4000,
    RDAMAGE: 0x8000,
    RRECOVER: 0x10000,
    RETURN: 0x20000,
    FUSION: 0x40000,
    SYNCHRO: 0x80000,
    RITUAL: 0x100000,
    XYZ: 0x200000,
    REPLACE: 0x1000000,
    DRAW: 0x2000000,
    REDIRECT: 0x4000000,
    LINK: 0x10000000
};

function invert(target) {
    var output = {};
    Object.keys(target).forEach(function (key) {
        output[target[key]] = key;
    });
    return output;
}

enums.textTypes = invert(enums.complexTypes);
enums.reasons = invert(enums.enumReasons);

function makeCheck(target) {
    'use strict';
    var destination = target + 'Check',
        value;
    enums[destination] = {};
    enums[target].enums = {};
    for (value in enums[target]) {
        if (enums[target].hasOwnProperty(value) && typeof value === 'string') {
            enums[destination][value] = false;
            enums[target].enums[enums[target][value]] = parseInt(value);
        }
    }
}
makeCheck('STOC');
makeCheck('CTOS');

module.exports = enums;