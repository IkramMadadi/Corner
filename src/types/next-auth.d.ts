import { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: NecessaryCustomerI & DefaultSession['user'];
	}

	type User = NecessaryCustomerI;
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		user: NecessaryCustomerI;
	}
}
