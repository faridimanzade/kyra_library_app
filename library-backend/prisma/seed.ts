import { PrismaClient } from '@prisma/client';
import books from './books.json';
const prisma = new PrismaClient();

async function main() {
  
  await prisma.bookActions.deleteMany();
  await prisma.walletMovement.deleteMany();
  await prisma.book.deleteMany();
  await prisma.wallet.deleteMany();

  
  await prisma.wallet.create({
    data: {
      id: 1,
      balance: 100.0,
    },
  });


  
  for (const book of books) {
    await prisma.book.create({
      data: {
        id: book.isbn,
        title: book.title,
        authors: book.authors,
        genres: book.genres,
        sellPrice: book.prices.sell,
        borrowPrice: book.prices.borrow,
        stockPrice: book.prices.stock,
        copies: book.copies,
        initialCopies: book.copies,
      },
    });
  }

  console.log('Database has been seeded');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
