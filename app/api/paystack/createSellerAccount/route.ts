import axios from 'axios';

interface SellerDetails {
  businessName: string;
  bankCode: string;
  accountNumber: string;
  percentageCharge: number;
}

const createSubaccount = async (sellerDetails: SellerDetails) => {
  try {
    // Validate seller details (basic example)
    if (!sellerDetails.businessName || !sellerDetails.bankCode || !sellerDetails.accountNumber || sellerDetails.percentageCharge === undefined) {
      throw new Error('Invalid seller details');
    }

    const response = await axios.post(
      'https://api.paystack.co/subaccount',
      {
        business_name: sellerDetails.businessName,
        bank_code: sellerDetails.bankCode,
        account_number: sellerDetails.accountNumber,
        percentage_charge: sellerDetails.percentageCharge, // Percentage the seller will receive
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error creating subaccount:', error);
    throw new Error('Failed to create subaccount');
  }
};

export default createSubaccount;
