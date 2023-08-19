import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";
import { createCustomtoken } from "src/firebase/functions";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.customtoken = token.customtoken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.id_token = account.id_token;
        token.access_token = account.access_token;
        token.customtoken = account.customtoken;
      }
      return token;
    },
  },
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
      token: {
        url: "https://api.line.me/oauth2/v2.1/token",
        async request(context) {
          const headers = new Headers();
          headers.set("content-type", "application/x-www-form-urlencoded");

          const response = await fetch(context.provider.token.url, {
            method: "POST",
            headers,
            body: new URLSearchParams({
              grant_type: context.client.grant_types.join(","),
              code: context.params.code,
              redirect_uri: encodeURI(context.client.redirect_uris.join(",")),
              client_id: context.client.client_id,
              client_secret: context.client.client_secret,
            }),
          });

          const tokens = await response.json();
          const customtokenResponse = await createCustomtoken(tokens);
          tokens.customtoken = customtokenResponse.data.customToken;
          return {
            tokens,
          };
        },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
