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

// interface fn{  //入参可少不可多
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
//     eats(str:string,str1:string):void;//入参可少不可多
// }

// let a:Animals={
//     name:"dog",
//     eats:function (params:string) {
        
//     }
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









// interface DBI<T>{
//     add(info:T):boolean;
//     update(info:T,id:number):boolean;
//     delete(id:number):boolean;
//     get(id:number):any[];
// }

// class MysqlDb<T> implements DBI<T>{
//     add(info: T): boolean {
//         console.log(info)
//         return true
//     }
//     update(info: T, id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): boolean {
//         throw new Error("Method not implemented.");
//     }
//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
    
// }

// class user{
//     user:string|undefined;
//     password:string|undefined;
// }
// var u=new user();
// u.user="张三";
// u.password="123456";

// var mysqldb=new MysqlDb<user>();
// mysqldb.add(u)


class test{
    private privateName:string;
    protected protectedName:string;
    static staticName:"staticName";
    constructor(privateName:string,protectedName:string){
        this.privateName=privateName;
        this.protectedName=protectedName;
    }
    private getPrivate():void{
        console.log("测试继承")
        console.log(this.privateName)
    }
    protected getProtected():void{
        console.log("测试继承")
        console.log(this.privateName)
    }
    public init(){
        this.getPrivate()
        this.getProtected()
    }
    static getStatic(){
        console.log(this.staticName)//静态属性只能在静态方法调用  且无法继承
    }
}

class otherTest extends test{
    private otherName:string
    constructor(privateName,protectedName,otherName){
        super(privateName,protectedName)
        this.otherName=otherName
    }
    otherInit(){
        // this.getPrivate() //无法在子类中调用父类私有的方法
        this.getProtected()//能够在子类中调用父类的保护方法
        // console.log(this.privateName)//无法在子类中调用父类私有的属性
        console.log(this.protectedName)//能够在子类中调用父类的保护属性
        console.log(this.otherName)
    }
}

let t=new test("privateName","protectedName")
// t.getPrivate()//无法在类外部调用私有
// t.getProtected()//无法在类外部调用保护类型
t.init()

let ot=new otherTest("privateName","protectedName","otherName")
// ot.getPrivate()//无法在子类中调用父类私有方法
// ot.getProtected()//无法在子类中调用父类保护方法
ot.otherInit()