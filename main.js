// import Lib from "./core";
//
// const sqlite3 = require('sqlite3')
// const { open } = require('sqlite')
// const HashMap = require('hashmap');
//
// open({
//     filename: './cards.cdb',
//     driver: sqlite3.Database
// }).then(async (db) => {
//     const results = await db.all('select * from datas,texts where datas.id=texts.id');
//     const _datas = new HashMap();
//     const _strings = new HashMap();
//
//     results.forEach(result => {
//         const {
//             id, ot, alias, setcode, type, atk, def, level, race,
//             attribute, category, name, desc,
//         } = result;
//         _datas.set(id, {
//             id,
//             ot,
//             alias,
//             setcode,
//             type,
//             atk,
//             def,
//             level: level & 0xff,
//             lscale:  (level >> 24) & 0xff,
//             rscale:  (level >> 16) & 0xff,
//             race,
//             attribute,
//             category,
//         });
//         _strings.set(id, {
//             name,
//             desc,
//         });
//     });
//
//     const ocgcore = Lib.getInstance();
//
//
// });

import Lib from "./core";

const lib = Lib.getInstance();

console.log(Lib.getData())
