import customerModel from '&common/Customer';
import { AuthOptions, getServerSession } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import loadWebsiteData from '~common/websiteCache';

export const privatePages = ['/account'];

export const authOptions = {
	pages: {
		signIn: '/auth/login',
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);
				if (!parsedCredentials.success) throw new Error('Invalid credentials');
				const { email, password } = parsedCredentials.data;
				const website = await loadWebsiteData();
				const customer = await customerModel.findOne({
					email: email.toLocaleLowerCase(),
					website: website._id,
				});
				if (!customer) throw new Error('User not found');
				if (!customer.enabled) throw new Error('User account has been disabled');

				const passwordMatch = await customer.comparePassword(password);

				if (!passwordMatch) throw new Error('Email or Password is not correct');
				return customer.toOptimizedObject();
			},
		}),
		/* GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}), */
	],
	session: {
		strategy: 'jwt',
		maxAge: 1296000, // 15 * 24 * 60 * 60,
		// 24 * 60 * 60,
		updateAge: 24 * 60 * 60,
	},
	callbacks: {
		async session({ session, token }) {
			// Attach the `id` to the session user object
			if (token?.user) {
				if (token.user.enabled === false) {
					throw new Error('User is disabled');
				}
				session.user = {
					...session.user,
					...token.user,
				};
			}

			return session;
		},
		async jwt({ token, user /* ,trigger */ }) {
			// Attach the `id` to the JWT token
			if (user) {
				/* if (trigger === 'update') {
					consol e.log('JWT token called');
				} */
				token.user = user as NecessaryCustomerI;
			}

			return token;
		},
	},
} satisfies AuthOptions;
export const getSession = () => getServerSession(authOptions);
