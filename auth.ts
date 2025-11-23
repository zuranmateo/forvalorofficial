import { default as NextAuth, User, Profile } from 'next-auth';
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import Image from 'next/image';
import { use } from 'react';




 
export const { handlers, signIn, signOut, auth } = NextAuth({

  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { 
          id: profile?.id,
       });

      if(!existingUser){
        await writeClient.create({
          _type: 'author',
          id: profile?.id,
          name: user?.name,
          email: user?.email,
          imageUrl: user?.image,
        })
      }
      return true;
    },

    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        });

        token.id = user?._id;
        token.imageUrl = user?.imageUrl;
      }

      return token;
    },

    async session({ session, token }){
      Object.assign(session, {id: token.id, imageUrl: token.imageUrl,});
      return session;
    },
  }
})
