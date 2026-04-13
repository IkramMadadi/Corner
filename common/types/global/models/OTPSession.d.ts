declare interface OTPSessionI {
	// username or email
	email: string;
}
declare interface OTPSessionSendI<ID = string> {
	sessionId: ID;
	otpCode: string;
}
declare interface ResetPasswordI<ID = string> extends OTPSessionSendI<ID> {
	password: string;
}
declare interface ConfirmedResetPasswordI<ID = string> extends ResetPasswordI<ID> {
	confirmPassword: string;
}
declare interface OTPSessionResponseI<ID = string, USER = NecessaryUserI> {
	sessionId: ID;
	user: USER;
}
