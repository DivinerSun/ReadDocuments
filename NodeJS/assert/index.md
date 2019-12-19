# assert(断言)
> **`assert`** 模块提供了一组简单的断言测试，可用于测试不变量/常量；该模块提供了推荐使用的 `严格模式` 和 比较宽松的 `遗留模式`。

### assert.AssertionError 类
> 继承自： **Error类**
>
> 表示断言失败。 assert 模块抛出的所有错误都是 `AssertionError` 类的实例
- **New assert.AssertionError(options)** 
    > 版本： 新增于 `v0.1.21` 
    > 
    > `Error` 的子类，表示断言失败。
    - **options**: \<Object>
        - message \<string> 如果提供，则将错误消息设置为此值
        - actual \<any> 错误实例上的 `actual` 属性将包含此值
        - expected \<any> 错误实例上的 expected 属性将包含此值。
        - operator \<string> 错误实例上的 operator 属性将包含此值。
        - stackStartFn \<Function> 如果提供，则生成的堆栈跟踪将移除所有帧直到提供的函数。

### assert
> 使用方式： **`assert(value[, message])`**
>
> 版本： 新增于 `v0.5.9`
>
> `assert.ok()` 的别名
- **assert(value[, message])** 
    - value \<any> 检查是否为真的输入
    - message \<string> | \<Error> 检查`出错`后输出的消息(堆栈信息，包含 message )

- **assert.deepEqual(actual, expected[, message])** 
    > 遗留模式不推荐使用，应使用 `assert.deepStrictEqual()`；严格模式也为：`assert.deepStrictEqual()`
    - actual \<any> 实际值
    - expected \<any> 期望值
    - message \<string> | \<Error> 检查`出错`后输出的消息(堆栈信息，包含 message )

- **assert.doesNotReject(asyncFn[, error][, message])** 
    > 版本： 新增于 `v10.0.0`
    >
    > 等待 `asyncFn` Promise，如果 `asyncFn` 是一个函数，则立即调用该函数并等待返回的 Promise 完成。然后它将检查 Promise 是否被拒绝。
    >
    > **除了等待的异步性质之外，完成行为与 assert.doesNotThrow() 完全相同。**
    - asyncFn \<Function> | \<Promise>
    - error \<RegExp> | \<Function>
    - message \<string>

- **assert.doesNotThrow(fn[, error][, message])** 
    > 断言 `fn` 函数不会抛出错误
    - fn \<Function>
    - error \<RegExp> | \<Function>
    - message \<string>

- **assert.equal(actual, expected[, message])** 
    > 版本： 新增于 `v0.1.21`
    >
    > 推荐使用 **`assert.strictEqual()`**, 参数与此方法一致
    - actual \<any>
    - expected \<any>
    - message \<string> | \<Error>

- **assert.fail([message])** 
    > 版本： 新增于 `v0.1.21` 
    > 
    > 使用提供的错误消息或者默认的错误消息抛出 `AssertionError`。如果 `message` 是 **Error** 的实例，则抛出的不一定为 **AssertionError** 
    - message \<string> | \<Error> 默认值： **`Failed`** 

- **assert.ifError(value)** 
    > 如果 **value** 值不为 `undefined` 或 `null`, 则抛出 value
    >
    > 在回调中测试 **error** 参数时，很有用
    - value \<any>

- **assert.notDeepStrictEqual(actual, expected[, message])** 
    > 深度测试是否存在严格的不相等现象， 类似于 === ； 与 **assert.deepStrictEqual()** 相反
    - actual \<any>
    - expected \<any>
    - message \<string> | \<Error>

- **assert.notStrictEqual(actual, expected[, message])** 
    > 测试 **actual** 和 **expected** 参数之间严格不相等
    - actual \<any>
    - expected \<any>
    - message \<string> | \<Error>

- **assert.rejects(asyncFn[, error][, message])** 
    > 等待 `asyncFn` Promise；如果 `asyncFn` 是一个函数，则立即调用该函数并等待返回的 Promise 返回，然后检查 Promise 是否被拒绝
    - asyncFn \<Function> | \<Promise>
    - error \<RegExp> | \<Function> | \<Object> | \<Error>
    - message \<string>

- ****