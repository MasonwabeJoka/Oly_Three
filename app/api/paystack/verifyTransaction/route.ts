import axios from 'axios';

const verifyTransaction = async (reference: string) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    throw new Error('Failed to verify transaction');
  }
};

export default verifyTransaction;
