export const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const email_service_url = process.env.EMAIL_SERVICE_URL || 'http://email-service:4000'
    await fetch(`${email_service_url}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        message,
      }),
    });
  } catch (error) {
    console.log('Error in sending email: ', error)
  }
};