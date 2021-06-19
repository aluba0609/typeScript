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
//抽象类和抽象方法用来定义标准 ，标准Animal 这个类要求他的子类必须包含eat方法
abstract class Animal{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    abstract eat():any//必须包含抽象方法  不能被实例化
}
// var a =new Animal()//报错 

class Dog extends Animal{
    //抽象类的子类必须实现抽象类里面的抽象方法
    constructor(name:string){
        super(name)
    }
    eat(){
        console.log(this.name+'吃粮食') 
    }
}
var d=new Dog('小黑');
d.eat()

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

