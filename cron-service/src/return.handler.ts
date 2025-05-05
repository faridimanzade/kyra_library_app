import dotenv from 'dotenv';

dotenv.config();

export async function returnBook(bookId: string, email: string) {
  console.log(`📚 Return book ID ${bookId}...`);

  try {
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/operations/sendEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': process.env.ADMIN_EMAIL || 'admin@dummy-library.com'
      },
      body: JSON.stringify({ bookId, email }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status ${response.status}: ${errorText}`);
    }

    console.log(`✅ Return book ID ${bookId}`);
  } catch (error) {
    console.error(`❌ Failed to return book ID ${bookId}:`, error);
  }
}