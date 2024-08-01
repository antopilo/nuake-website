import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";



const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.APP_GITHUB_ID || "",
            clientSecret: process.env.APP_GITHUB_SECRET || ""
        }),
        ],

    callbacks: {

        async jwt({ token, account }) {
            // Ensure account exists and accessToken is a string
            if (account && typeof account.access_token === 'string') {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Ensure token.accessToken is a string
            session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log(process.env.NEXTAUTH_URL)

            // Ensure baseUrl is correctly set to NEXTAUTH_URL
            const nextAuthUrl = process.env.NEXTAUTH_URL || baseUrl;

            // Allow relative callback URLs
            if (url.startsWith("/")) return `${nextAuthUrl}${url}`;

            // Allow callback URLs on the same origin
            else if (new URL(url).origin === nextAuthUrl) return url;

            // Otherwise, redirect to the base URL
            console.log('RETURNING : ' + nextAuthUrl)

            return nextAuthUrl;
          },
    }
});

export { handler as GET, handler as POST };