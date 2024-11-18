class ApiResponse{
    constructor(success = "true", statusCode = "200", message = "Success", data = null){
        this.success = success,
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
    }

    static success(statusCode = 200, message = "Success", data = null){
        return new ApiResponse("true", statusCode, message, data)
    }

    static error(statusCode = 500, message = "Fail"){
        return new ApiResponse("false", statusCode, message)
    }
}


export default ApiResponse
