import NextAuth from 'next-auth'

import { AUTH_CONFIG } from './auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth(AUTH_CONFIG)
