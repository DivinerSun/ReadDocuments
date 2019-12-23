const async_hooks = require('async_hooks');
const fs = require('fs');

const eid = async_hooks.executionAsyncId();
const tid = async_hooks.triggerAsyncId();
console.warn('eid: ', eid, 'tid: ', tid);


const asyncHook = async_hooks.createHook({
    init() {
        // console.warn('init');
        fs.writeFileSync('./log.out', 'init......');
    },
    before() {
        // console.warn('before');
        fs.writeFileSync('./log.out', 'before......');
    },
    after() {
        // console.warn('after');
        fs.writeFileSync('./log.out', 'after......');
    },
    destroy() {
        // console.warn('destory');
        fs.writeFileSync('./log.out', 'destory......');
    },
});

// asyncHook.enable();
asyncHook.disable();