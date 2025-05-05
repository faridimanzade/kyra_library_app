import { PrismaClient } from '@prisma/client';
import { sendEmail } from '../utils/email.util';
import { scheduleRestock, scheduleUserReturn } from '../utils/cron.util';
import { ActionType, MovementType } from '../enums/common.enum';

const prisma = new PrismaClient();


const BUY_LIMIT = 10;
const PER_BOOK_LIMIT = 2;
const BORROW_LIMIT = 3;
const CELEBRATION_LIMIT = 2000;

export const borrowBook = async (email: string, bookId: string) => {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.copies < 1) throw new Error('Book not available');

  const currentBorrowed = await prisma.bookActions.count({
    where: {
      email,
      type: ActionType.BORROW,
      returned: false
    }
  });

  if (currentBorrowed >= BORROW_LIMIT) throw new Error('Borrow limit exceeded');

  const alreadyBorrowed = await prisma.bookActions.findFirst({
    where: {
      email,
      bookId,
      type: ActionType.BORROW,
      returned: false
    }
  });

  if (alreadyBorrowed) throw new Error('You already borrowed this book');

  
  await prisma.book.update({
    where: { id: bookId },
    data: { copies: { decrement: 1 } }
  });

  
  let wallet = await prisma.wallet.update({
    where: { id: 1 },
    data: {
      balance: { increment: book.borrowPrice },
      movements: {
        create: {
          amount: book.borrowPrice,
          reason: `User ${email} borrowed ${book.title}`,
          type: MovementType.INCOME
        }
      }
    }
  });

  if (wallet.balance > CELEBRATION_LIMIT) {
    sendEmail((process.env.MANAGEMENT_DUMMY_EMAIL || 'management@dummy-library.com'), 'Library balance milestone', '🎉 Wallet balance exceeded $2000! Celebrate!');
  }

  
  const action = await prisma.bookActions.create({
    data: {
      email,
      type: ActionType.BORROW,
      copies: 1,
      bookId,
    }
  });

  const remaining = book.copies - 1;
  if (remaining === 1) {
    sendEmail((process.env.MANAGEMENT_LIBRARY || 'management@library.com'), 'Library restock operation', `Book "${book.title}" is running low on stock. Please restock.`);
  }


  scheduleUserReturn(bookId, email);
  return { message: 'Book borrowed successfully' };
};

export const returnBookEmail = async (email: string, bookId: string) => {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) throw new Error('Book not found');
  const borrow = await prisma.bookActions.findFirst({
    where: {
      email,
      bookId,
      type: ActionType.BORROW,
      returned: false
    }
  });
  if (!borrow) throw new Error('No active borrow record found');

  sendEmail(email, 'Deadline for the book', `Please return the book "${book.title}" you borrowed.`);

  return { message: 'Book returned email successfully' };
};

export const returnBook = async (email: string, bookId: string) => {
  const borrow = await prisma.bookActions.findFirst({
    where: {
      email,
      bookId,
      type: ActionType.BORROW,
      returned: false
    }
  });

  if (!borrow) throw new Error('No active borrow record found');

  await prisma.bookActions.update({
    where: { id: borrow.id },
    data: { returned: true, returnedAt: new Date() }
  });

  await prisma.book.update({
    where: { id: bookId },
    data: { copies: { increment: 1 } }
  });

  return { message: 'Book returned successfully' };
};

export const restockBook = async (email: string, bookId: string) => {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) throw new Error('Book not found');
  const wallet = await prisma.wallet.findFirst({});
  if (!wallet) throw new Error('Wallet not found');
  if (wallet.balance < book.stockPrice * (book.initialCopies - book.copies)) throw new Error('Not enough balance in wallet');

  await prisma.bookActions.create({
    data: {
      email,
      type: ActionType.RESTOCK,
      copies: book.initialCopies - book.copies,
      bookId
    }
  });

  await prisma.book.update({
    where: { id: bookId },
    data: {
      copies: book.initialCopies
    }
  });

  const updatedWallet = await prisma.wallet.update({
    where: { id: 1 },
    data: {
      balance: { decrement: book.stockPrice * (book.initialCopies - book.copies) },
      movements: {
        create: {
          amount: book.stockPrice * (book.initialCopies - book.copies),
          reason: `Restock of book ${book.title}`,
          type: MovementType.EXPENSE
        }
      }
    }
  });


  return { message: 'Book returned successfully' };
};


export const buyBook = async (email: string, bookId: string, count: string) => {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  const countNumber = parseInt(count);
  if (!book || book.copies < 1) throw new Error('Book not available');
  if (book.copies < countNumber) throw new Error('Not enough copies available');

  const totalBuys = await prisma.bookActions.count({
    where: {
      email,
      type: ActionType.BUY
    }
  });



  if (totalBuys + countNumber > BUY_LIMIT) throw new Error('Buy limit exceeded');

  const sameBookBuys = await prisma.bookActions.count({
    where: {
      email,
      bookId,
      type: ActionType.BUY
    }
  });

  if (sameBookBuys + countNumber > PER_BOOK_LIMIT) throw new Error('Buy limit for this book exceeded');

  // Update book copies
  const updatedBook = await prisma.book.update({
    where: { id: bookId },
    data: { copies: { decrement: countNumber } }
  });

  // Update wallet
  const wallet = await prisma.wallet.update({
    where: { id: 1 },
    data: {
      balance: { increment: book.sellPrice * countNumber },
      movements: {
        create: {
          amount: book.sellPrice * countNumber,
          reason: `User ${email} bought ${book.title}`,
          type: MovementType.INCOME
        }
      }
    }
  });


  if (wallet.balance > CELEBRATION_LIMIT) {
    sendEmail((process.env.MANAGEMENT_DUMMY_EMAIL || 'management@dummy-library.com'), 'Library balance milestone', '🎉 Wallet balance exceeded $2000! Celebrate!');
  }

  // Create buy record
  await prisma.bookActions.create({
    data: {
      email,
      type: ActionType.BUY,
      copies: countNumber,
      bookId
    }
  });

  // Check for restock
  const remaining = updatedBook.copies;
  if (remaining <= 1) {
    sendEmail((process.env.MANAGEMENT_LIBRARY || 'management@library.com'), 'Library restock operation', `Book "${book.title}" is running low on stock. Please restock.`);
    scheduleRestock(book.id)
  }

  return { message: 'Book bought successfully' };
};

export const getUserHistory = async (email?: string) => {
  const where: any = {};

  if (email) {
    where.email = email;
  }

  return prisma.bookActions.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { book: true }
  });
};
