import NextAuth, { AuthOptions, SessionStrategy, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient as prisma } from "@repo/db/client";
import { customAlphabet } from "nanoid"
import bcrypt from "bcryptjs"

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: number
      username: string
    } & DefaultSession["user"]
  }

  // Define the User type without extending NextAuthUser
  interface User {
    id: number
    username: string
    name?: string
    email?: string
    avatar?: string 
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: number
    username: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if ((!credentials?.email || !credentials.username) && !credentials?.password) {
          throw new Error("Email/Username and Password are required!");
        }

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials?.email },
              { username: credentials?.username }
            ]
          }
        });

        if (!existingUser) {
          if (!credentials.name || !credentials.email || !credentials.password) {
            throw new Error("Important fields are missing!");
          }
          const nanoid = customAlphabet("1234567890", 10);
          const providerId = `credentials_${nanoid()}`;
          try {
            const hashedPassword = await bcrypt.hash(credentials.password, 5);
            const user = await prisma.user.create({
              data: {
                email: credentials.email,
                username: credentials.username,
                provider: "credentials",
                providerId: providerId,
                name: credentials.name,
                password: hashedPassword
              }
            })
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              username: user.username,
              avatar: user.avatar || undefined 
            };
          }
          catch (err) {
            throw new Error("Failed to create user");
          }
        }
        else {
          const hashedPassword = await bcrypt.compare(credentials.password, existingUser.password);
          if (!hashedPassword) {
            throw new Error("Invalid password");
          }
          return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            username: existingUser.username,
            avatar: existingUser.avatar || undefined 
          };
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials') {
        return true;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            providerId: account?.provider + "_" + account?.providerAccountId
          },
        });

        if (!existingUser) {
          if (!user.name || !user.email || !account?.provider) {
            return false;
          }

          const newUser = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              username: user.email,
              avatar: user.avatar || undefined, 
              provider: account?.provider,
              providerId: account?.provider + "_" + account?.providerAccountId,
              password: "SSO"
            }
          });
          user.id = newUser.id;
          user.username = newUser.username;
        } else {
          user.id = existingUser.id;
          user.username = existingUser.username;
        }
        return true;
      }
      catch (err) {
        console.error("SignIn Error:", err);
        return false;
      }
    },
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id as number;
    //     token.email = user.email;
    //     token.name = user.name;
    //     // token.avatar = user.avatar || undefined; 
    //     token.username = user.username;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (session.user) {
    //     session.user.id = token.id;
    //     session.user.email = token.email;
    //     session.user.name = token.name;
    //     session.user.username = token.username;
    //   }
    //   return session;
    // }
  },
  debug: true
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }