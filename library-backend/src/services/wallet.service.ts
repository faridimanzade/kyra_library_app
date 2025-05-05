import { MovementType } from '../enums/common.enum';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export const getWalletInfo = async () => {
  return prisma.wallet.findFirst({});
};



export const getWalletMovements = async (type?: string) => {
  const where: any = {};
  if (type && Object.values(MovementType).includes(type as MovementType)) {
    where.type = type;
  }
  return prisma.walletMovement.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });
};
