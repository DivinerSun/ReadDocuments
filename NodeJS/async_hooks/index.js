const async_hooks = require('async_hooks');

const eid = async_hooks.executionAsyncId();
const tid = async_hooks.triggerAsyncId();
console.warn('eid: ', eid, 'tid: ', tid);


const asyncHook = async_hooks.createHook({
    init() {
        console.warn('init');
    },
    before() {
        console.warn('before');
    },
    after() {
        console.warn('after');
    },
    destroy() {
        console.warn('destory');
    },
});

try {
    (() => {
        setTimeout(() => {
            asyncHook.disable();
            asyncHook.enable();
        }, 1000);
    })();
} catch (error) {
}