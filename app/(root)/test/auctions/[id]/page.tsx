'use client'
import { useEffect, useState } from 'react';
import { Auction } from './../../types/auction';
import { fakeAuctionData } from '../../mockData/mockData'; 
import DateTimePicker from '../../components/DateTimePicker';
import Upload from '../../components/Upload';
console.log('fakeAuctionData', fakeAuctionData)
const AuctionPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [auction, setAuction] = useState<Auction | null>(null);
    const [timeLeft, setTimeLeft] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const loadAuction = async () => {
        try {
          // Simulate a delay (optional)
          await new Promise((resolve) => setTimeout(resolve, 500));
          
          // Convert the string times to Date objects
          if (id === fakeAuctionData.id) {
            const auctionData = {
              ...fakeAuctionData,
              startTime: new Date(fakeAuctionData.startTime),
              endTime: new Date(fakeAuctionData.endTime),
            };
            setAuction(auctionData);
          } else {
            setError('Auction not found.');
          }
        } catch (error) {
          setError('Failed to load auction.');
        } finally {
          setLoading(false);
        }
      };
  
      loadAuction();
    }, [id]);
  
    useEffect(() => {
      if (!auction) return;
  
      const updateTimer = () => {
        const now = new Date().getTime();
        const endTime = auction.endTime.getTime();
        const distance = endTime - now;
  
        if (distance < 0) {
          setTimeLeft('Auction Ended');
          return;
        }
  
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      };
  
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }, [auction]);
  
    if (loading) return <div>Loading...</div>;
  
    if (error) return <div>{error}</div>;
  
    if (!auction) return <div>Auction not found.</div>;
  
    return (
      <div>
        <h1>{auction.title}</h1>
        <img src={auction.imageUrl} alt={auction.title} style={{ width: '100%', height: 'auto' }} />
        <p>{auction.description}</p>
        <p>Current Bid: ${auction.currentBid}</p>
        <p>Highest Bidder: {auction.highestBidder}</p>
        <h2>Time Left: {timeLeft}</h2>

        <div>
          <DateTimePicker/>
        </div>
        <div>
          <Upload/>
        </div>
      </div>
    );
  };
  
  export default AuctionPage;
