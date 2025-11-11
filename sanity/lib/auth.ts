import { USER_BY_EMAIL, USER_BY_GITHUB_ID } from '@/sanity/queries';
import { writeClient } from '@/sanity/lib/client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { client } from './client';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    action: z.string().optional(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
        Credentials({
            credentials: {
                email: {},
                password: {},
                action: { label: 'Action', type: 'text' },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const { email, password, action='login' } = await signInSchema.parseAsync(credentials);


                    if (action === 'register') {

                        const existingUser = await writeClient.fetch(USER_BY_EMAIL, { email });

                        if (existingUser) {
                            throw new Error('User already exists');
                        }

                        const hashedPassword = await bcrypt.hash(password, 10);

                        const user = await writeClient.create({
                            _type: 'user',
                            email,
                            password: hashedPassword,
                        });

                        return { ...user, id: user._id };
                    }

                    // logic to verify if the user exists
                    user = await client.fetch(USER_BY_EMAIL, {
                        email
                    });

                    if (!user) {
                        throw new Error('Invalid credentials.');
                    }

                    const isValid = await bcrypt.compare(password, user.password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return { ...user, id: user._id };

                } catch (error) {
                    if (error instanceof z.ZodError) {
                        return null;
                    }
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user: { name, email, image }, account, profile }) {
            console.log("jjjjjj")
            if (account?.provider === 'github') {
                const { id, login, bio } = profile || {};

                const existingUser = await client.fetch(USER_BY_GITHUB_ID, {
                    id
                });

                if (!existingUser) {
                    await writeClient.withConfig({ useCdn: false }).create({
                        _type: 'user',
                        githubId: id,
                        name,
                        username: login,
                        email,
                        image,
                        bio: bio || ''
                    });
                }

                return true;
            }

            return true;
        },
        async jwt( { token, account, profile, user }) {
            console.log("gggg")
            if (account?.provider === 'github') {
                if (account && profile) {
                    const gitHubUser  = await client.withConfig({ useCdn: false }).fetch(USER_BY_GITHUB_ID, {
                        id: profile?.id
                    });
                    token.id = gitHubUser?._id;
                }
                return token;
            } else {
                if (user) {
                    token.id = user.id;
                }
                return token;
            }

        },

        async session({ session, token }) {
            Object.assign(session.user, { id: token.id });
            return session;
        }
    }
});