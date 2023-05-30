import {Request, Response} from 'express';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import { hash } from 'bcrypt';
import { LoginUserPayload, RegisterUserPayload } from '../types/auth.type';
import { findUserByEmail, verifyUser } from '../services/auth.service';

class AuthController {

	static async login(req:Request,res:Response) {		
		const { email, password } = req.body;
		try {
			const verifiedUser = await verifyUser({
				email,
				password,
			});
			res.status(200).json({ auth: true, accessToken: verifiedUser.accessToken });
		} catch (error: any) {
			res.status(400).send({ message: error.message });
		}
	}

	static async register(req:Request,res:Response) {		
		try {
			const {username, email, password, role} = req.body;
			AuthController._validateRegisterUserPayload({username, email, password, role})
    	const existingUser = await findUserByEmail(email)

			if (existingUser) {
				return res.status(409).json({ error: 'User already exists with the provided email' });
			}

			const id = uuidv4();
			const hashedPassword = await hash(password, 10);
			const newUser =  await User.create({
				id,
				username,
				email,
				password: hashedPassword,
				role
			});

			// Exclude the password field from the response
    	const { password: _, ...userWithoutPassword } = newUser.toJSON();
   		res.status(201).json({ user: userWithoutPassword });
		} catch(error:any) {
			const message = error.message || "Internal server error";
			logger.error(message)
			res.status(500).json({ error: message });
		}
	}

	static _validateRegisterUserPayload(payload:RegisterUserPayload) {
		const {username, email, password, role} = payload;
		if (!username) {
      throw Error("Username cannot be empty");
    }
    if (!email) {
      throw Error("Email Id cannot be empty");
    }
    if (!password) {
      throw Error("Password cannot be empty");
    }
    if (!role) {
      throw Error("User role cannot be empty");
    }
	}

	static _validateLoginUserPayload(payload:LoginUserPayload) {
		const {email, password} = payload;
		if (!email) {
      throw Error("Email Id cannot be empty");
    }
    if (!password) {
      throw Error("Password cannot be empty");
    }
	}

}

export default AuthController;