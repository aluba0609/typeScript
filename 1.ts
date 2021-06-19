// //多态属于继承
// class Animal{
//     name:string;
//     constructor(name:string){
//         this.name=name;
//     }
//     eat(){
//         console.log('吃的方法')
//     }
// }

// class Dog extends Animal{
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         return this.name+'吃粮食'
//     }
// }
// class Cat extends Animal{
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         return this.name+'吃老鼠'
//     }
// }




//typescript 中的抽象类，他是提供其他类继承的基类，不能直接被实例化
//用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现(不能被实例化  必须包含抽象方法)
//abstract 抽象方法是能放在抽象类里面
// //抽象类和抽象方法用来定义标准 ，标准Animal 这个类要求他的子类必须包含eat方法
// abstract class Animal{
//     public name:string;
//     constructor(name:string){
//         this.name=name;
//     }
//     abstract eat():any//必须包含抽象方法  不能被实例化
// }
// // var a =new Animal()//报错 

// class Dog extends Animal{
//     //抽象类的子类必须实现抽象类里面的抽象方法
//     constructor(name:string){
//         super(name)
//     }
//     eat(){
//         console.log(this.name+'吃粮食') 
//     }
// }
// var d=new Dog('小黑');
// d.eat()

// class Cat extends Animal{
//     constructor(name:string){
//         super(name)
//     }
//     run(){
//         return this.name+'吃老鼠'
//     }
// }
// var c=new Cat('小黑');//报错没有eat方法
// c.run()



//批量方法传入参数进行约束

// interface params{
//     firstName:string;
//     secondName:string;
//     age?:number
// }

// function  print(params:params):string {
//         return (params.firstName+'---'+params.secondName+'年龄:'+params.age)
// }

// print({
//     firstName:"alu",
//     secondName:"ba",
//     age:18
// })


//函数类型接口：对方法传入的参数 以及返回值进行约束

// interface fn{
//     (key:string,val:string):string
// }

// var fn:fn=function (key,val) {
//     return (key+'----'+val)   
// }
// fn("a","a")


// //定义数组的方式  对 数组的约束

// interface UserArr{
//     [index:number]:string
// }
// var arr:UserArr=["1"]

// //定义对象的方式  对对象的约束

// interface UserObj{
//     [index:string]:string
// }
// var Obj:UserObj={
//     key:"1"
// }


// //类类型接口：对类的约束 和  抽象类有点相似

// interface Animals{
//     name:string;
//     eats(str:string):void;//参数不强制传 
// }
// class Dog implements Animals{
//     name:string
//     constructor(name:string){
//         this.name=name;
//     }

//     eats(str:string){
//         return "111"+str
//     }
// }

// var hei=new Dog("小黑")
// hei.eats("111")

// interface Person extends Animals{//扩展接口
//     names:string;
//     eata(str:string):void;
// }


// class perDog implements Person{//扩展接口
//     name:string;
//     names:string;
//     constructor(name:string,names:string){
//         this.name=name;
//         this.names=names;
//     }
//     eata(){
//         console.log(this.name)
//     }
//     eats(){
//         console.log(this.names)
//     }
// }
// var pG=new perDog("狗","人")
// pG.eata()
// pG.eats()



//函数泛型
// function getName<T>(value:T):T {
//     return value;
// }
// getName<string>("1")

// function getNames<T>(value:T):any {
//     return value+'1111';
// }
// getNames<number>(1)


//类的泛型

// class minClas<T>{
//     list:T[]=[];
//     add(value:T):void{
//         this.list.push(value)
//     }
//     min():T{
//         let firstVal=this.list[0];
//         for(let i=1;i<this.list.length;i++){
//             if(this.list[i]<firstVal){
//                 firstVal=this.list[i]
//             }
//         }
//         return firstVal
//     }
// }
// let min=new minClas<number>();//实例化类 并且制定了累的T为number
// min.add(2);
// min.add(3);
// min.add(4);
// min.add(9);
// min.add(10);
// min.add(11);
// min.add(1);
// min.add(-1);
// console.log(min.min())



//1.泛型接口

// interface Config{
//     <T>(value:T):T
// }

// let getData:Config=function <T>(val:T):T {
//     return val;
// }

// getData<string>('123')

//2.泛型接口

// interface Config<T>{
//     (value:T):T
// }

// // var myGetData:Config<string>=function <T>(val:T):T {
// //     return val;
// // }
// var myGetData:Config<string>=function (val) {
//     return val;
// }

// myGetData("1")









interface DBI<T>{
    add(info:T):boolean;
    update(info:T,id:number):boolean;
    delete(id:number):boolean;
    get(id:number):any[];
}

class MysqlDb<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.");
    }
    
}

class user{
    user:string|undefined;
    password:string|undefined;
}
var u=new user();
u.user="张三";
u.password="123456";

var mysqldb=new MysqlDb<user>();
mysqldb.add(u)