const Lib = (function () {
    let instance;


    function createInstance() {

        return null;
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

export default Lib;
