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
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype["delete"] = function (id) {
        throw new Error("Method not implemented.");
    };
    MysqlDb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MysqlDb;
}());
var user = /** @class */ (function () {
    function user() {
    }
    return user;
}());
var u = new user();
u.user = "张三";
u.password = "123456";
var mysqldb = new MysqlDb();
mysqldb.add(u);
