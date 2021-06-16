//public:公有           在类里面、子类、类外面都可以访问
//protected:保护类型     在类里面、子类 可以访问  类外面不访问
//private:私有             在类里面 可以访问  子类、类外面不访问
// 属性不加修饰符 默认就是公有
class person{
    private name:string;//属性  前面省略了public关键词
    constructor(name:string){
        this.name=name;
    }
    run():string{
        return `${this.name}在活动`
    }
}

class Web extends person{
    constructor(name){
        super(name)
    }
    run():string{
        return `${this.name}在活动-子类`
    }
    work(){
        alert(`${this.name}在工作`)
    }
}

let w=new Web('aluba')
w.work()//子类访问
w.run()//当前类访问
//类外部访问公有属性
var p=new person("哈哈哈")
p.name //类外部