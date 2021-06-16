class person{
    name:string;
    age:number;
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    run(){
        console.log(this.name)
    }
}

class me extends person{
    wifi:any;
    constructor(name,age,wifi){
        super(name,age)
        this.wifi=wifi
    }
}

let p=new person('aluba',18)
console.log(p)