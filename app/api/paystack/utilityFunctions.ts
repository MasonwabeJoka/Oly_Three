
import axios from 'axios';

const calculateTotalAmount = (salePrice: number, platformFeePercent: number) => {
  const sellerAmount = salePrice;
  const platformFee = (platformFeePercent / 100) * salePrice;
  const paystackFee = (2.9 / 100) * (salePrice + platformFee) + 1;
  const totalAmount = salePrice + platformFee + paystackFee;
  return {
    sellerAmount,
    platformFee,
    paystackFee,
    totalAmount,
  };
};

const initiateTransaction = async (transactionDetails: any) => {
  const { sellerAmount, platformFee, paystackFee, totalAmount } = calculateTotalAmount(
    transactionDetails.salePrice,
    transactionDetails.platformFeePercent
  );

  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email: transactionDetails.buyerEmail,
      amount: Math.round(totalAmount * 100), // Total amount in cents
      subaccount: transactionDetails.sellerSubaccountCode,
      transaction_charge: Math.round((platformFee + paystackFee) * 100), // Fees in cents
      bearer: 'account', // Buyer bears the transaction charge
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  return response.data;
};

export { calculateTotalAmount, initiateTransaction };
