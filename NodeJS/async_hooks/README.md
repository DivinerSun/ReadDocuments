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
        - before \<Function> 初始化之前的回调
        - after \<Function> 销毁之后的回调
        - destroy \<Function> 销毁时的回调
    - Returns \<AsyncHook> 禁用和启用钩子函数的实例