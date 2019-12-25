# asyc_hooks(异步钩子)

> `async_hooks` 模块提供了一组API，用于注册回调，以跟踪在NodeJS应用程序内部创建的异步资源的寿命
>
> 使用方式： **`const async_hooks = require('async_hooks');`**

### 术语
> 异步资源代表具有关联回调的对象， 此回调可以被多次调用，例如： `net.createServer()` 中调用 `connection` 事件； 而在 `fs.open()` 中仅调用一次
>
> 也可以在调用回调之前关闭资源， AsyncHook 不会明确区分这些不同的情况，但会将他们表示为资源的抽象概念
> 如果使用 **Workers**，则每一个线程都会有一个独立的 async_hooks 接口，并且每一个线程将使用一组新的一步ID

### 公共API
- **async_hooks.createHook(callbacks)**
    > 注册每一个异步操作的不同生命周期事件需要调用的函数
    - callbacks \<Object> 注册当前异步钩子函数
        - init \<Function> 初始化时的回调
        - before \<Function> 销毁之前的回调
        - after \<Function> before之后的回调
        - destroy \<Function> 销毁时的回调
    - Returns \<AsyncHook> 禁用和启用钩子函数的实例

- **asyncHook.enable()**
    > 为给定的 AsyncHook 实例启用回调， 如果未提供则无任何操作
    - Returns \<AsyncHook> asyncHook的实例
    - Example：「默认情况下，AsyncHook实例是禁用的。如果想要在实例创建后立即启用，则可以使用以下模式」
    ```javascript
    const async_hooks = require('async_hooks');

    const hook = async_hooks.createHook(callbacks).enable();
    ```

- **asyncHook.disable()**
    > 从要执行的 AsyncHook 回调的全局池中禁用给定 AsyncHook 实例的回调。 禁用后，若不启用则不会再次调用它
    - Returns \<AsyncHook> asyncHook的实例

### Callbacks(钩子回调函数)
- **init(asyncId, type, triggerAsyncId, resource)**
    > 在构造一个可能发出异步事件的类时调用。 这并不意味着实例必须在调用 destory 之前或之后调用，只是存在这种可能性而已
    - asyncId \<number> 异步资源的唯一ID
    - type \<string> 异步资源的类型
        > 用于表示导致初始化被调用的资源的类型，通常它对应资源的构造函数的名称
        >
        > FSEVENTWRAP, FSREQCALLBACK, GETADDRINFOREQWRAP,
        >
        > GETNAMEINFOREQWRAP, HTTPINCOMINGMESSAGE,
        > 
        > HTTPCLIENTREQUEST, JSSTREAM, PIPECONNECTWRAP, PIPEWRAP, PROCESSWRAP, QUERYWRAP,
        >
        > SHUTDOWNWRAP, SIGNALWRAP, STATWATCHER, TCPCONNECTWRAP, TCPSERVERWRAP(接收连接的服务器), TCPWRAP(来自客户端的新连接),
        > 
        > TTYWRAP, UDPSENDWRAP, UDPWRAP, WRITEWRAP, ZLIB, SSLCONNECTION, PBKDF2REQUEST,
        >
        > RANDOMBYTESREQUEST, TLSWRAP, Microtask, Timeout, Immediate, TickObject
        >
        > 还有 PROMISE 资源类型，该资源类型用于跟踪Promise实例和它们调度的异步工作
    - triggerAsyncId \<number> 在其执行上下文中创建此异步资源的异步资源的唯一ID
        > triggerAsyncId 是导致(或触发)新资源初始化并导致 init 调用的资源的 asyncId。 这与 async_hooks.executionAsyncId() 不同，后者仅显示创建资源的时间， 而 triggerAsyncId 显示创建资源的原因
        >
        > 以下是一个实例：
        >
        > ```javascript
        > const fs = require('fs');
        > const async_hooks = require('async_hooks');
        > 
        > async_hooks.createHook({
        >    init(asyncId, type, triggerAsyncId) {
        >       const eid = async_hooks.executionAsyncId();
        >       fs.writeSync(1, `${type}(${asyncId})---trigger: ${triggerAsyncId} excution: ${eid}\n`);
        >    }
        > }).enable();
        >
        > require('net').createServer((conn) => {}).listen(8080);
        > ```
        > 当建立新连接后，会立即构造一个 TCPWrap 的实例。这发生在任何JavaScript堆栈之外。（ executionAsyncId() 为0表示它是从C ++执行的，其上没有JavaScript堆栈。）仅具有该信息，就无法将导致资源创建的原因链接在一起，因此给出了triggerAsyncId 传播什么资源负责新资源的存在的任务。
    - resource \<Object> 需要在销毁期间释放对表示异步操作的资源的引用
        > 代表已初始化的实际异步资源。

- **before(asyncId)**
    > 当启动异步操作(例如：TCP服务器接收新连接)或者完成异步操作(例如：将数据写入磁盘)时，将调用此回调来通知用户。 在执行上述回调之前会调用 before 回调
    >
    > `asyncId` 是分配给将要执行回调的资源的唯一标识符
    >
    > **before** 回调会被调用 0 次或 N 次，持久性资源通常会调用多次， 其他操作只调用一次，如果取消了异步操作或者如TCP服务器未接收到任何连接，则通常调用 0 次
    - asyncId \<number>

- **after(asyncId)**
    > **before** 中指定的回调完成之后调用
    >
    > 如果在执行回调过程中发生未捕获的异常，则将在发出 `UNcaughtException` 事件或运行域的处理程序后运行 **after** 
    - asyncId \<number>

- **destroy(asyncId)**
    > 在销毁与 **asyncId** 对应的资源之后调用。 也可以从嵌入式 API `embedDestroy()` 异步调用它
    >
    > 一些资源依赖于垃圾回收机制来进行清理，因此，如果对传递给 **`init`** 的资源对象进行引用，则有可能永远不会调用 **`destroy`** 从而导致内存泄露(溢出)。如果资源不依赖垃圾回收机制，则不会存在此问题
    - asyncId \<number>

- **promiseResolve(asyncId)**
    > 版本： 新增于 `v8.6.0` 
    >
    > 在调用传递给 **Promise** 构造函数的 `resolve` 函数时调用(直接或通过其他解决 Promise 的方法)
    - asyncId \<number>

- **async_hooks.executionAsyncId()**
    > 创建一个 `asyncId` 
    > 
    > 从 `executionAsyncId()` 返回的ID与执行时间有关，与因果关系无关( triggerAsyncId() 涵盖了该因果关系 )
    >
    > 默认情况下， Promise上下文可能无法获得精确的 `executionAsyncId` 
    - Returns \<number> 当前执行上下文的 asyncId

- **async_hooks.tiggerAsyncId()**
    > 默认情况下， Promise上下文可能不会获得有效的 `triggerAsyncId` 
    - Returns \<number> 负责调用当前正在执行的回调资源的ID

### Promise 执行跟踪
> 默认情况下，由于 V8 提供的 Promise 内置的 API 使用成本较高，因此并没有为 Promise 执行分配 asyncIds。 这意味着默认情况下， 使用 `Promise` 或 `async/await` 的程序将无法正确执行，并且不会为 `Promise` 回调上下文触发ID
>
> 通过 `async_hooks.createHook()` 安装异步钩子可启用 **`Promise`** 执行跟踪
>
> ```javascript
> async_hooks.createHook({
>     init() {},
> }).enable();
> Promise.resolve(10001).then(() => {
>     console.warn(`eid: ${async_hooks.executionAsyncId()}\t tid: ${async_hooks.triggerAsyncId()}`);
> });
> ```

### JavaScript 嵌入的API
> 处理自己的异步资源来执行 I/O 、连接池或管理回调队列等任务的库开发人员， 可以使用 `AsyncWrap JavaScript API`, 以便调用所有适当的回调。

- **Class: AsyncResource**
    > `AsyncResource` 类，旨在由嵌入程序的异步资源扩展。使用此功能，用户可以轻松触发自己资源的生命周期事件
    >
    > 当实例化一个 `AsyncResource` 时， 会触发 `init()` 钩子函数

    - **new AsyncResource(type[, options])**
        - type \<string> 异步事件的类型
        - options \<Object>
            - triggerAsyncId \<number> 创建此异步事件的执行上下文的ID，默认值：`executionAsyncId()` 
            - requireManualDestroy \<boolean> 当对象被垃圾回收时，禁用自动的 `emitDestroy`。 除非需要检索资源的 `asyncId` 并与之一起调用敏感的API的 emitDestroy，否则通常无需设置(即使手动调用了 emitDestroy)， 默认值：`false` 
        - 示例代码：
        - ```javascript
            class DBQuery extends AsyncResource {
                constructor(db) {
                    super('DBQuery');
                    this.db = db;
                }

                getInfo(query, callback) {
                    this.db.get(query, (err, data) => {
                    this.runInAsyncScope(callback, null, err, data);
                    });
                }

                close() {
                    this.db = null;
                    this.emitDestroy();
                }
            }
          ```
        
    - **asyncResource.runInAsyncScope(fn[, thisArg, ...args])**
        > 版本： 新增于： `V9.6.0`
        >
        > 在异步资源的执行上下文中使用提供的参数调用提供的函数。这将建立上下文，在回调之前触发 AsyncHooks， 调用函数在回调之后触发 AsyncHooks， 然后还原原始执行上下文
        - fn \<Function> 在此异步资源的执行上下文中调用的函数
        - thisArg \<any> 用于函数调用的接收者
        - ...args \<any> 传递给函数的可选参数

    - **asyncResource.emitDestroy()**
        > 调用所有的销毁钩子函数，只能调用一次。 如果多次调用，则会引发错误。 必须手动调用它，如果资源留个 `GC` 收集， 则将永远不会调用 `destroy` 钩子
        - Returns \<AsyncResource> 返回一个 `asyncResource` 的引用

    - **asyncResource.asyncId()**
        - Returns \<number> 分配给资源的唯一的 `asyncId` 

    - **asyncResource.triggerAsyncId()**
        - Return \<number> 传递给 AsyncResource 构造函数的相同 triggerAsyncId

    
