
export const fakeAuctionData = {
    id: '1',
    title: 'Vintage Watch',
    description: 'A rare vintage watch from the 1950s in excellent condition. Perfect for collectors!',
    imageUrl: '/images/vintage-watch.jpg', // Ensure this path points to a valid image in your public folder
    startTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // Started an hour ago
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // Ends in two hours
    currentBid: 150,
    highestBidder: 'John Doe',
  };
  