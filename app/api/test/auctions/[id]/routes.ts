'use server';
import { NextResponse } from 'next/server';
import { Auction } from '../../../types/auction';

const mockAuctionData: Auction = {
  id: '1',
  title: 'Vintage Watch',
  description: 'A rare vintage watch from the 1950s.',
  imageUrl: '/images/vintage-watch.jpg',
  startTime: new Date(Date.now() - 1000 * 60 * 60), // Started an hour ago
  endTime: new Date(Date.now() + 1000 * 60 * 60 * 2), // Ends in two hours
  currentBid: 150,
  highestBidder: 'John Doe',
};

export async function GET(_: Request, { params }: { params: { id: string } }) {
  // Replace with actual database fetch logic
  if (params.id === mockAuctionData.id) {
    return NextResponse.json(mockAuctionData);
  }

  return NextResponse.json({ error: 'Auction not found' }, { status: 404 });
}
