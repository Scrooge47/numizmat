import { PrismaClient } from '../prisma'
import { Session } from 'next-auth'

export interface Context {
  prisma: PrismaClient
  session: Session | null
}

