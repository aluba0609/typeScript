class Mypromise {
    constructor(executor) {
        this.status = 'pending'  //状态值
        this.value = undefined   //成功的返回值
        this.reason = undefined	 //失败的返回值
        this.onResolvedCallbacks = [] //成功的回调函数
        this.onRejectedCallbacks = [] //失败的回调函数
        // 成功
        let resolve = (value) => {debugger
            // pending用来屏蔽的，resolve和reject只能调用一个，不能同时调用，这就是pending的作用
            if (this.status == 'pending') {
                this.status = 'fullFilled'
                this.value = value
                // 发布执行函数
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        // 失败
        let reject = (reason) => {
            if (this.status == 'pending') {
                this.status = 'rejected'
                this.reason = reason
                //失败执行函数
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            // 执行函数
            executor(resolve, reject)
        } catch (err) {
            // 失败则直接执行reject函数
            reject(err)
        }
    }
    then(onFullFilled, onRejected) {
        // 这样就是一个递归
        let promise2 = new Mypromise((resolve, reject) => {
            // 函数里面调函数就跟第一次使用一样，主要的是这里面的this指向怎么变化的
            // 同步
            let x
            console.log('this', this)
            if (this.status == 'fullFilled') {
                // 箭头函数，无论this一直是指向最外层的对象
                x = onFullFilled(this.value)
                resolve(x) // resolve(x) // 这一步x只能处理普通值，但是x可能是一个函数对象，或者promise,所以要对x进行判断
                // 添加一个resolvePromise（）的方法来判断x跟promise2的状态，决定promise2是走成功还是失败
            }
            if (this.status == 'rejected') {
                x = onRejected(this.reason)
                reject(x)
            }
            // 异步
            if (this.status == 'pending') {
                // 在pending状态的时候先订阅
                this.onResolvedCallbacks.push(() => {
                    // todo
                    x = onFullFilled(this.value)
                    resolve(x)
                })
                this.onRejectedCallbacks.push(() => {
                    // todo
                    x = onRejected(this.reason)
                    resolve(x)
                })
            }
        })
        return promise2   //then方法返回一个promise对象
    }
}


const p = new Promise((resolve, reject) => {
    resolve(100)
})
p.then((data) => {
    return 100 * data
}).then((data) => {
    return new Promise((resolve, reject) => {
        console.log(data)
        resolve(data)
    })
}).then((data) => {
    console.log('result', data) // 10000
})