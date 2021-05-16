
const baseURL = 'http://localhost:50004/api';

export class GlobalUrls {

    public static readonly loginUrl = `${baseURL}/login`;
    public static readonly signUpUrl = `${baseURL}/sign-up`;
    public static readonly resendEmail = `${baseURL}/resend-email`;
    public static readonly verifyEmail = `${baseURL}/verify-email/{id}`;
}
