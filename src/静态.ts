class per{
    private name:string;
    private age:string;
    static sex:string='男';
    constructor(name:string){
        this.name=name;
    }
    run(){
        alert(`${this.name}在活动`) 
    }
    static print(){//无法被继承
        alert(`print方法+${this.age}`)//静态方法 里面无法直接调用类里面的属性 
        alert(`print方法+${this.sex}`)//静态方法 直接调用类里面的 静态 属性 

    }
}
var b=new per('张三')
console.log(b)

alert(per.sex)//类名直接调用静态属性
per.print()//类名直接调用静态方法




