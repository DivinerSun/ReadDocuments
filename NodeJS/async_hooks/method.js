const async_hooks = require('async_hooks');


const executionAsyncId = async_hooks.executionAsyncId();
console.warn('executionAsyncId: ', executionAsyncId)

const triggerAsyncId = async_hooks.triggerAsyncId();
console.warn('triggerAsyncId: ', triggerAsyncId)

async_hooks.createHook({
    init() {},
}).enable();
Promise.resolve(10001).then(() => {
    console.warn(`eid: ${async_hooks.executionAsyncId()}\t tid: ${async_hooks.triggerAsyncId()}`);
});


const asyncResource = new async_hooks.AsyncResource('test');
console.warn('asyncResource: ', asyncResource);