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
        async signIn({ user }) {
            // Check if the user is the allowed user
            const allowedUser = '34318785'; // Replace with the allowed username
            
            if (user?.id === allowedUser) {
              return true; // Allow access
            } else {
                console.log("Unauthorized user tried signing in: " + user);
              return false; // Deny access
            }
        },
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
            // Ensure baseUrl is correctly set to NEXTAUTH_URL
            const nextAuthUrl = process.env.NEXTAUTH_URL || baseUrl;
            console.log("The NEXTAUTH_URL detected is: " + process.env.NEXTAUTH_URL + " \n" +
                "url:" + url + " base: " + baseUrl + " \n" + 
                "nextAuthUrl: " + nextAuthUrl)
            // Allow relative callback URLs
            if (url.startsWith("/")) {
                console.log("Redirect returns: " + `${nextAuthUrl}${url}`);
                return `${nextAuthUrl}${url}`;
            } 
            
            // Allow callback URLs on the same origin
            else if (new URL(url).origin === nextAuthUrl) {
                console.log("Redirect same origin returns: " + url);    
                return url;
            }

            // Otherwise, redirect to the base URL
            console.log('Redirect fallback: ' + nextAuthUrl)

            return nextAuthUrl;
          },
    }
});

export { handler as GET, handler as POST };