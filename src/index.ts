// require('typescript')

let a:string='a';
let arr:Array<string>=['ds','s'];
let arr1:Array<string|number>=['ds','s',1];
let arr2:number[]=[1];
let arr3:[number,string,boolean]=[1,'s',true];//元祖

enum color {green="green",blue='blue'}
let c:color=color.green;

function run():void{//没有返回值 因为你只能为它赋予undefined和null
    return null||undefined
}

function never():never{

    // while(true){
    //     console.log(1)
    // }

    throw new Error("111");
    
}


