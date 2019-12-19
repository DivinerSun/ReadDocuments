// assert 及一些方法
const assert = require('assert');


assert(10 > 2, '111');
// assert(10 < 2, '222');

let a = 10;
let b = 20;
let c = a + b;
// assert.deepEqual(c, 20, '结果应该为： 30');  // Error
assert.deepEqual(c, 30, '结果应该为： 30');     // No Error
// assert.deepStrictEqual(c, 20, '结果应该为： 30');    // Error
assert.deepStrictEqual(c, 30, '结果应该为： 30');   // No Error

let d = 10;
let e = '20';
let f = d + e;
assert.deepEqual(f, 1020, '结果应该为： 1020');     // No Error
// assert.deepStrictEqual(f, 1020, '结果应该为： 1020');   // Error

(async () => {
    await assert.doesNotReject(
        async () => {
            // throw new TypeError('出错了呢');
        },
        SyntaxError
    );
})();

const a1 = 3;
const a2 = 5;
const a3 = a1 + a2;
assert.equal(a3, 8, '结果错误');    // No Error
// assert.equal(a3, 10, '结果错误');   // Error

// assert.fail()   // Error AssertionError
// assert.fail('出错了')   // Error AssertionError
// assert.fail(SyntaxError())   // Error SyntaxError
// assert.fail(ReferenceError())   // Error ReferenceError

const v1 = true;
const v2 = false;
const v3 = 0;
const v4 = 10;
const v5 = null;
const v6 = undefined;
const v7 = NaN;
const v8 = {};
// assert.ifError(v1);     // Error
// assert.ifError(v2);     // Error
// assert.ifError(v3);     // Error
// assert.ifError(v4);     // Error
assert.ifError(v5);     // No Error
assert.ifError(v6);     // No Error
// assert.ifError(v7);     // Error
// assert.ifError(v8);     // Error


// assert.notDeepStrictEqual({a: 1}, {a: 1});      // Error
assert.notDeepStrictEqual({a: 1}, {a: '1'});      // Error

// assert.notStrictEqual(1, 1);    // Error
assert.notStrictEqual(1, '1');  // No Error
assert.notStrictEqual(1, 2);    // No Error 


(async () => {
    await assert.rejects(
        async () => {
            throw new TypeError('错误值');
        },
        {
            name: 'TypeError',
            message: '错误值'
        }
    );
})();