
import axios from 'axios'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                let user = null         
                    const { email, password }: any = credentials

                    const response = await axios
                        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/signin`, {
                            email, password
                        })
                        .then(({ data }) => {
                            console.log(data)
                            return data?.data;
                        })
                        .catch((error) => {
                            console.log(error)
                            throw new Error(error?.response?.data?.message);
                        });
                    user = response
                
                return user
            }
        },
        )
    ],
    pages: {
        signIn: "/signin",
        signOut: '/signout'
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token = { ...token, ...user }
                token.sub = user.id
            }
            return token
        },
        async session({ session, token }: any) {
            if (session?.user) session.user = { ...session.user, ...token }
            return session
        },
    }

}