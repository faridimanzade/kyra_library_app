import dotenv from 'dotenv';

dotenv.config();

export async function restockBook(bookId: string) {
  console.log(`📚 Restocking book ID ${bookId}...`);

  try {
    const response = await fetch(`${process.env.BACKEND_BASE_URL}/api/operations/restock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'email': process.env.ADMIN_EMAIL || 'admin@dummy-library.com'
      },
      body: JSON.stringify({ bookId }),
    });


    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status ${response.status}: ${errorText}`);
    }

    console.log(`✅ Restocked book ID ${bookId}`);
  } catch (error) {
    console.error(`❌ Failed to restock book ID ${bookId}:`, error);
  }
}