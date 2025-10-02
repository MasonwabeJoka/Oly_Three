// app/thank-you/page.tsx
import { notFound } from 'next/navigation';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-08-05',
});

export async function generateMetadata({ searchParams }: { searchParams: { transactionId: string } }) {
  const { transactionId } = searchParams;
  const transaction = await client.fetch(
    `*[_type == "transaction" && _id == $transactionId]`,
    { transactionId }
  );

  if (!transaction.length) {
    return notFound();
  }

  return {
    title: `Thank You - ${transaction[0]._id}`,
  };
}

export default async function ThankYou({ searchParams }: { searchParams: { transactionId: string } }) {
  const { transactionId } = searchParams;
  const transaction = await client.fetch(
    `*[_type == "transaction" && _id == $transactionId]`,
    { transactionId }
  );

  if (!transaction.length) {
    return notFound();
  }

  return (
    <div>
      <h1>Thank You for Your Purchase!</h1>
      <p>Your transaction ID is {transaction[0]._id}</p>
      {/* Display other transaction details if needed */}
    </div>
  );
}
