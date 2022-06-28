// 封装返回数据成功的模型和失败的模型
class BaseModel {
    constructor(data, message) {
        // data需要是一个对象类型，如果是string类型，则需要兼容
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 200
    }
}
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = -1
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}