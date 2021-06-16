// require('typescript')
var a = 'a';
var arr = ['ds', 's'];
var arr1 = ['ds', 's', 1];
var arr2 = [1];
var arr3 = [1, 's', true]; //元祖
var color;
(function (color) {
    color["green"] = "green";
    color["blue"] = "blue";
})(color || (color = {}));
var c = color.green;
function run() {
    return null || undefined;
}
function never() {
    // while(true){
    //     console.log(1)
    // }
    throw new Error("111");
}
