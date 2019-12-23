const fs = require('fs');
const net = require('net');
const async_hooks = require('async_hooks');


async_hooks.createHook({
    init(asyncId, type, triggerAsyncId) {
        const eid = async_hooks.executionAsyncId();
        fs.writeSync(1, `${type}(${asyncId}): tigger: ${triggerAsyncId} execution: ${eid}\n`);
    },
}).enable();


net.createServer((conn) => { console.warn('服务监听：localhost:8080', conn) }).listen(8080);