const assert = require('assert');

const AssertError1 = new assert.AssertionError({});
const AssertError2 = new assert.AssertionError({
    message: '出错了',
    actual: 1,
    expected: 3,
    operator: 'strictEqual',
    stackStartFn: () => ({ state: 'error' })
});

const { message: message1 } = AssertError1;
const { message: message2 } = AssertError2;

console.warn(111111111, 'AssertError1: ', AssertError1, 'AssertError2: ', AssertError2);
console.warn(222222222, 'message1: ', message1, 'message2: ', message2)


// 验证错误输出
try {
    assert.strictEqual(1, 3);
} catch (err) {
    console.warn(33333333, err)
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message2);
    assert.strictEqual(err.name, 'AssertionError2');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 3);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}