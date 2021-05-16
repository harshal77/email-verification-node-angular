export class Response {

    private statusCode: number;

    private message: String;

    public result: any;

    private isSuccess: Boolean;

    constructor(isSuccess: Boolean, statusCodes: number, message: String, result: any) {

        this.statusCode = statusCodes​;
        this.message = message;
        this.result = result;
        this.isSuccess = isSuccess;
    }

    public getIsSuccess() {

        return this.isSuccess;
    }

    public getStatusCode() {

        return this.statusCode;
    }

    public getResult() {
        return this.result;
    }

    public setResult(result) {
        return this.result = result;
    }
}
