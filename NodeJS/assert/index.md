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
    > 遗留模式已废弃，应使用 `assert.deepStrictEqual()`；严格模式也为：`assert.deepStrictEqual()`
    - actual \<any> 实际值
    - expected \<any> 期望值
    - message \<string> | \<Error> 检查`出错`后输出的消息(堆栈信息，包含 message )