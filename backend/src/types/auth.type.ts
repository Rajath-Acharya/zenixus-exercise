export interface RegisterUserPayload {
	username: string,
	email: string,
	password: string,
	role: string
}

export interface LoginUserPayload extends Pick<RegisterUserPayload, "email" | "password"> {};