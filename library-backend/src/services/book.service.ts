import { ActionType } from '../enums/common.enum';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchBooks = async (query: string) => {  
  return prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { authors: { has: query } },
        { genres: { has: query } }
      ]
    }
  });
};

export const getBookDetails = async (id: string) => {
  return prisma.book.findUnique({ where: { id } });
};

export const getBookActions = async (id?: string, type?: string, email?: string) => {
  const where: any = {};

  if (id) {
    where.bookId = id;
  }
  if (type && Object.values(ActionType).includes(type as ActionType)) {
    where.type = type;
  }
  if (email) {
    where.email = email;
  }

  return prisma.bookActions.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
};
