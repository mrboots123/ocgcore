const HashMap = require('hashmap');

const DataManager = (function () {

    let instance;
    let data = {
        _datas : new HashMap(),
        _strings : new HashMap()
    };

    function createInstance() {

        return data;
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

export default DataManager;
