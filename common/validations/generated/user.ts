import { AuthUserSchema, PublicUserSchema, UserDocumentSchema, userLoginSchema } from '../models/user';

export const LoginRequestSchema = userLoginSchema('en');
export const AuthResponseSchema = AuthUserSchema('en');
export const DefaultUserDocumentSchema = UserDocumentSchema('en');
export const DefaultPublicUserSchema = PublicUserSchema('en');
