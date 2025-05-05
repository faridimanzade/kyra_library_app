-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('BORROW', 'BUY', 'RESTOCK');

-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "genres" TEXT[],
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "borrowPrice" DOUBLE PRECISION NOT NULL,
    "stockPrice" DOUBLE PRECISION NOT NULL,
    "copies" INTEGER NOT NULL,
    "initialCopies" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WalletMovement" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "MovementType" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletId" INTEGER NOT NULL,

    CONSTRAINT "WalletMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookActions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "ActionType" NOT NULL,
    "copies" INTEGER NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returned" BOOLEAN DEFAULT false,
    "returnedAt" TIMESTAMP(3) DEFAULT NULL,

    CONSTRAINT "BookActions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WalletMovement" ADD CONSTRAINT "WalletMovement_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookActions" ADD CONSTRAINT "BookActions_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
