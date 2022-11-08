// 1
let b1 = 1 == "1";
console.log(b1)
let b2 = 1 === "1";
console.log(b2)
// 2
let data = "3" + 1;
console.log(data)
let data1 = "3" - 1;
console.log(data1)
let data2 = "222" - -"111";
console.log(data2)
// 3
var i = 10;

function test() {
    i = 5;
}

test();
console.log(i);
// 4
var j = 10;

function test1() {
    j = 5;
    var j = 6;
}

test1();
console.log(j);
// 5
var a = "A";
a.test = 10;
console.log(a.test);
// 6
var o = {left: 1, right: 2};
console.log(o);
console.log(o.left);
console.log(o.right);
// 7
var n = new Number("abc");
console.log(n);
n = parseInt("abc");
console.log(n);
// 8
var max = Number.MAX_VALUE;
console.log(max);
var max1 = max + 1;
let data3 = max + " " + max1;
console.log(data3);
let data4 = max == max1;
console.log(data4);
let data5 = max === max1;
console.log(data5);
let data6 = max.toFixed();
console.log(data6);
// 9
var nan = Number.NaN;
console.log(isNaN(nan));
let data7 = nan == nan;
console.log(data7);
// 10
var d = new Date();
d.setFullYear(10);
console.log(d);
// 11
var e = new Date();
e.setYear(10);
console.log(e);
// 12
let date = new Date(2000, 1, 31);
console.log(date);
let date1 = new Date(2000, -2000);
console.log(date1);
let date2 = new Date(2000, 13);
console.log(date2);
// 13
var b = new Array();
b[0] = 1;
b[1] = b;
b[2] = 2;
console.log(b);
console.log(b[1]);
// 14
/*
var arr = new Array(99999999999999999999999999999);
console.log(arr)
*/
// 15
/*
var arra = new Array(Number.NaN);
console.log(arra)
*/
// 16
/*
var arr = new Array(-1);
console.log(arr.length);
*/

// 17
var array = new Array(016);
console.log(array.length);
// 18
var array1 = new Array(10);
console.log(array1.length);
// 19
var array2 = new Array(1, 1);
console.log(array2);
console.log(array2.length);

// 20
function f() {
    return 67
};
var array3 = new Array(f);
console.log(array3.length);
// 21
var array4 = [];
array4[99999999999999999999999999999] = 1;
console.log(array4.length);
array4[0] = 1;
console.log(array4.length);
// 22
let data8 = [4] * [4];
console.log(data8)
let data9 = [] * [];
console.log(data9)
// 23
let helloElement = "hello"[1];
console.log(helloElement)
let data10 = "hello".charAt(1);
console.log(data10)
let helloElement1 = "hello"[-1];
console.log(helloElement1)
let data11 = "hello".charAt(-1);
console.log(data11)
// 24
Array(3).forEach(function (elem) { console.log(elem);});
[undefined, undefined, undefined].forEach(function (elem) { console.log(elem);});
// 25
let data12 = Math.max(3, 0);
console.log(data12);
let data13 = Math.max(3, {});
console.log(data13);
let data14 = Math.max(3, []);
console.log(data14);
let data15 = Math.max(3, true);
console.log(data15);
let data16 = Math.max(3, "foo");
console.log(data16);
let data17 = Math.max(-1, null);
console.log(data17);
let data18 = Math.max(-1, undefined);
console.log(data18);
let data19 = Math.max(1, true);
console.log(data19);
let data20 = Math.max(0, true);
console.log(data20);
let data21 = Math.max(1, false);
console.log(data21);
let data22 = Math.max(-1, true);
console.log(data22);
let data23 = Math.max(-1, false);
console.log(data23);
let data24 = Math.max(-1, []);
console.log(data24);
let data25 = Math.max(-1, [1]);
console.log(data25);
let data26 = Math.max(-1, [1, 4]);
console.log(data26);
// 26
let s1 = [, , ,].join();
console.log(s1)
let s2=Array(20).map(function (elem) {
    return "a";
});
console.log(s2)
// 27
let b3 = isFinite(42);
let b4 = isFinite(1 / 0);
let b5 = isFinite(0 / 0);
let b6 = isFinite("42");
let b7 = isFinite("hi");
let b8 = isFinite();
let b9 = isFinite(undefined);
let b10 = isFinite(null);
// 28
let data27 = "true" == true;
console.log(data27)
let data28 = "false" === false;
console.log(data28)
// 29
var ab = 1;
bb = 1; // without "use strict" will actually work
(function () {
    var ab = 2;
    bb = 2;
}());
console.log(ab);
console.log(bb);
// 30
let data29 = null == false;
console.log(data29)
let data30 = !null;
console.log(data30)
// 31
let data31 = "Why am I a " + typeof +"";
console.log(data31);
// 32
var fa = function () {};
fa.foo = "foo";
let data32 = fa.foo;
console.log(data32);
let data33 = fa.name;
console.log(data33);
fa.name = "foo";
console.log(data33);
fa = function myFunction() {};
console.log(fa.name);
// 33
let data34 = [1, 2, 4] < [1, 2, 5];
console.log(data34)
let data35 = [1, 3, 4] < [1, 2, 5];
console.log(data35)
let data36 = [1, 2, 3] === [1, 2, 3];
console.log(data36)
let data37 = [1, 2, 3] < [1, 2, 3];
console.log(data37)
let data38 = [1, 2, 3] == [1, 2, 3];
console.log(data38)
let data39 = [1, 2, 3] > [1, 2, 3];
console.log(data39)
let data40 = [1, 2, 3] <= [1, 2, 3];
console.log(data40)
let data41 = [1, 2, 3] >= [1, 2, 3];
console.log(data41)

// 34
function hello(what) {
    what = "world";
    return "Hello, " + arguments[0] + "!";
}

let s = hello("javascript");
console.log(s)
// 35
let data42 = "3" - +-+-+"1" + "1" / "3" * "6" + "2";
console.log(data42)
// 36
let number1 = Math.max();
let number2 = Math.min();
let data43 = number1 > number2;
console.log(data43)
// 37
let data44 = parseInt(null, 24);
console.log(data44)
// 38
Array.prototype.getRealLength = function () {
    var length = 0;
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            length++;
        }
    }
    return length;
}
// 39
let number = [0][0];
console.log(number);
// 40
let data45 = typeof NaN;
console.log(data45)
// 41
let data46 = 9999999999999999;
console.log(data46)
// 42
var y = 1;
let data47 = y === Math.floor(y);
console.log(data47);
Number.prototype.isInteger = function () {
    return this === Math.floor(this);
}
let data48 = y.isInteger();
console.log(data48);
// 43
let data49 = (![] + [])[+[]] + (![] + [])[+!+[]] + ([![]] + [][[]])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]];
console.log(data49);

// 44
function fb(a) {
    if (a < 0) {
        var i = 3;
    }
    console.log(i);
}

fb(-1);

function fc(a) {
    if (a < 0) {
        let k = 3;
    }
    //console.log(k);
}

fc(-1);

// 45
function setLevel(level = 0) {

}

let level = setLevel();
console.log(level)
let level1 = setLevel(42);
console.log(level1)
let level2 = setLevel(undefined);
console.log(level2)
// 46
let {first: fd, last: la} = {first: "John", last: "Doe"};

let {first: fe, last: lb = "Unknown"} = {first: "John", last: "Doe"};
// 47
const fooa = "bar";

const foob = {bar: "baz"};
// 48
//{foo: foo, bar : bar}= {foo: bar, bar: foo}
// 49
for (var xa in arr) {
    console.log(xa);
}

for (var xb of arr) {
    console.log(xb);
}
// 50
let jane = {
    name: "Jane",
    sayHello: function (friends) {
        friends.forEach(friend => {
            console.log(this.name + " says hello to " + friend)
        });
    }
}
jane.sayHello(["Mark", "John"]);

let jane1 = {
    name: "Jane",
    sayHello: function (friends) {
        friends.forEach(function (friend) {
            console.log(this.name + " says hello to " + friend)
        });
    }
}
jane1.sayHello(["Mark", "John"]);