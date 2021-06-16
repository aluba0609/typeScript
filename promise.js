

class promise{
    constructor(executor){
        this.status="pedding";
        this.onRejectCallback=[];
        this.onResolveCallback=[];
        this.value=undefined;
        this.reason=undefined;
        let resolve=(value)=>{
            if(this.status==='pedding'){
                this.status='resolve';
                this.value=value;
                this.onResolveCallback.forEach((fn)=>{fn()});
            }

        }

        let reject=(reason)=>{
            if(this.status==='pedding'){
                this.status='reject';
                this.reason=reason;
                this.onRejectCallback.forEach((fn)=>{fn()});
            }
        }
        try {
            executor(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(res){

        console.log(res)
    }
}

let myp=new promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(1)
        resolve('完成')
    },1000)
})
myp.then((res)=>{
    console.log(2)
    console.log(res)
})