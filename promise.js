// let resolvePromise = (promise2, x, resolve, reject) => {
//     //判断x的值 如果是普通值 直接resolve  如果是promise 继续调用then 根据status状态调用resolve 或者 reject  如果是promise2报错
//     if(promise2===x){
//         return reject( new TypeError("Chaining cycle detected for promise #<promise>"))
//     }
//     if(typeof x==='object'&&typeof x!==null||typeof x==='function'){
//         try {
//             let then=x.then//有可能x里面有 通过defineProperty来定义的的then
//             if(typeof then ==='function'){
//                 then.call(x,(y)=>{
//                     resolve(y)
//                 },r=>{
//                     reject(r)
//                 })//能保证再次取then得值
//             }else{
//                 resolve(x)//说明x是一个普通的对象 {then:1}
//             }
//         } catch (e) {
//             reject(e)
//         }
//     }else{
//         //x是一个普通值
//         resolve(x)
//     }
// }
// class Promise {
//     constructor(executor) {
//         this.status = 'pending'
//         this.value = undefined
//         this.reason = undefined
//         this.onResolvedCallbacks = []
//         this.onRejectedCallbacks = []
//         let resolve = (value) => {
//             debugger
//             if (this.status == 'pending') {
//                 this.status = 'fullFilled'
//                 this.value = value
//                 this.onResolvedCallbacks.forEach(fn => fn())
//             }
//         }
//         let reject = (reason) => {
//             if (this.status == 'pending') {
//                 this.status = 'rejected'
//                 this.reason = reason
//                 this.onRejectedCallbacks.forEach(fn => fn())
//             }
//         }
//         try {
//             executor(resolve, reject)
//         } catch (err) {
//             reject(err)
//         }
//     }
//     then(onFullFilled, onRejected) {
//         let promise2 = new Promise((resolve, reject) => {
//             let x
//             if (this.status == 'fullFilled') {
//                 setTimeout(() => {//定时器是为了拿到new promise 后赋值给promise2 
//                     try {//防止then(()=>{ throw new Error()})  需要放在定时器里面 因为异步问题
//                         x = onFullFilled(this.value)
//                         resolvePromise(promise2, x, resolve, reject)
//                     } catch (e) {
//                         reject(e)
//                     }
//                 }, 0)
//             }
//             if (this.status == 'rejected') {
//                 setTimeout(() => {
//                     try {
//                         x = onRejected(this.reason)
//                         resolvePromise(promise2, x, resolve, reject)
//                     } catch (e) {
//                         reject(e)
//                     }
//                 }, 0)
//             }
//             if (this.status == 'pending') {
//                 this.onResolvedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             x = onFullFilled(this.value)
//                             resolvePromise(promise2, x, resolve, reject)
//                         } catch (e) {
//                             reject(e)
//                         }
//                     }, 0)
//                 })
//                 this.onRejectedCallbacks.push(() => {
//                     setTimeout(() => {
//                         try {
//                             x = onRejected(this.reason)
//                             resolvePromise(promise2, x, resolve, reject)
//                         } catch (e) {
//                             reject(e)
//                         }
//                     }, 0)
//                 })
//             }
//         })
//         return promise2
//     }
// }




// //例子 promise2==x
// // let p = new Promise((resolve, reject) => {
// //     resolve()
// // })
// // let promise2=p.then(() => {
// //     return promise2
// // })
// // promise2.then(null,err => {
// //     console.log(err)
// // })

// let p = new Promise((resolve, reject) => {
//     resolve(100)
// })
// let promise2=p.then(data=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             reject('hello')
//         },1000)
//     })
// })

// promise2.then(data=>{
//     console.log(data)
// },e=>{
//     console.log(e)
//     return 100
// }).then((data)=>{
//     console.log('s '+data)
// })






const PADDING='padding';
const RESOLVE='resolve';
const REJECT='reject';
function resolvePromise(promise2,x,resolve,reject){
    if(x === promise2){
        return new TypeError("Chaining cycle detected for promise #<promise>")
    }
    if(typeof x==='object'&&x!==null||typeof x==='function'){
        let then=x.then;
        if(typeof then=='function'){
            then.call(x,r=>{resolve(r)},y=>{reject(y)})
        }else{
            resolve(x)
        }
    }else{
        resolve(x)
    }
}

class Promise{
    constructor(executor){
        this.status=PADDING;
        this.value=undefined;
        this.reason=undefined;
        this.onResolvedCallbacks=[];
        this.onRejectedCallbacks=[];

        let resolve = (value)=>{
            try {
                this.value=value;
                this.status=RESOLVE;
                this.onResolvedCallbacks.forEach(fn=>fn());        
            } catch (error) {
                reject(error)
            }

        }
        let reject = (reason)=>{
            try {
                this.reason=reason;
                this.status=REJECT;
                this.onRejectedCallbacks.forEach(fn=>fn());        
            } catch (error) {
                reject(error)
            }

        }


        try {
            executor(resolve,reject);
        } catch (e) {
            reject(e);
        }
    }
    then(onFullFilled,onRejected){
        let promise2=new Promise((resolve,reject)=>{
            let x;
            if(this.status===RESOLVE){
                setTimeout(()=>{
                    try {
                        x=onFullFilled(this.value);
                        resolvePromise(promise2,x,resolve,reject)   
                    } catch (error) {
                        reject(error)
                    }

                },0)

            }
            if(this.status===REJECT){
                setTimeout(()=>{
                    try {
                        x=onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject)    
                    } catch (error) {
                        reject(error)
                    }

                },0)
            }
            if(this.status===PADDING){
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            x=onFullFilled(this.value);
                            resolvePromise(promise2,x,resolve,reject)  
                        } catch (error) {
                            reject(error)
                        }

                    },0)
                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try {
                            x=onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error)
                        }

                    },0)

                });
            }
        })
        return promise2
    }
}

// let p=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve(1)
//     },1000)
// })
// p.then((res)=>{
//     console.log(res)
//     return new Promise((resolve,reject)=>{
//         resolve('靠')
//     })
// },e=>{
//     console.log(e)
// }).then((res)=>{
//     console.log(2,res)
// },e=>{console.log(e)})

let p = new Promise((resolve, reject) => {
    resolve(100)
})
let promise2=p.then(data=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('hello')
        },1000)
    })
})
promise2.then(data=>{
    console.log(data)
},e=>{
    console.log(e)
    return 100
}).then((data)=>{
    console.log('s '+data)
})