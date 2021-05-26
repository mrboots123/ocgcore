const HashMap = require('hashmap');

const Lib = (function () {
    let instance;
    const _datas = new HashMap();
    const _strings = new HashMap();

    function createInstance() {

        const db = require('better-sqlite3')('/Users/user/Desktop/ocgcore/core/bin/cards.cdb', {});

        const results = db.prepare('select * from datas,texts where datas.id=texts.id').all();

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

        return 'null';
    }

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }

    function getData() {
        return _datas;
    }
    function getStrings() {
        return _strings;
    }
    return {
        getInstance,
        getData,
        getStrings
    };
})();

export default Lib;
