import Avatar from "@/components/Avatars";
import styles from "./BidHistory.module.scss";
import { format } from "date-fns";

const BidHistory = () => {
  const bids = [
    {
      id: 1,
      bidder: {
        name: "Alice Smith",
        avatarUrl: "/profile_images/1.jpg",
      },
      amount: "R 5000",
      time: "10:00 AM",
    },
    {
      id: 2,
      bidder: {
        name: "Bob Johnson",
        avatarUrl: "/profile_images/4.jpg",
      },
      amount: "R 4500",
      time: "10:15 AM",
    },
    {
      id: 3,
      bidder: {
        name: "Carol Williams",
        avatarUrl: "/profile_images/2.jpg",
      },
      amount: "R 4000",
      time: "10:21 AM",
    },
    {
      id: 4,
      bidder: {
        name: "David Brown",
        avatarUrl: "/profile_images/5.jpg",
      },
      amount: "R 5500",
      time: "10:25 AM",
    },
    {
      id: 5,
      bidder: {
        name: "Emma Davis",
        avatarUrl: "/profile_images/6.jpg",
      },
      amount: "R 4750",
      time: "10:30 AM",
    },
    {
      id: 6,
      bidder: {
        name: "Frank Wilson",
        avatarUrl: "/profile_images/7.jpg",
      },
      amount: "R 4250",
      time: "10:35 AM",
    },
    {
      id: 7,
      bidder: {
        name: "Grace Lee",
        avatarUrl: "/profile_images/8.jpg",
      },
      amount: "R 6000",
      time: "10:40 AM",
    },
    {
      id: 8,
      bidder: {
        name: "Henry Taylor",
        avatarUrl: "/profile_images/9.jpg",
      },
      amount: "R 5100",
      time: "10:45 AM",
    },
    {
      id: 9,
      bidder: {
        name: "Isabella Martinez",
        avatarUrl: "/profile_images/10.jpg",
      },
      amount: "R 4600",
      time: "10:50 AM",
    },
  ];

  return (
    <div className={styles.container}>
      {bids.map((bid, index) => (
        <div
          key={bid.id}
          className={`${styles.bid} ${index === 0 ? styles.firstBid : ''}`}
        >
          <div className={styles.bidder}>
            <div className={styles.avatarContainer}>
              <Avatar
                className={styles.avatar}
                avatarSize="small"
                avatar={bid.bidder.avatarUrl}
              />
            </div>
            <p className={styles.name}>
              {bid.bidder.name.length > 32
                ? `${bid.bidder.name.slice(0, 32)}...`
                : bid.bidder.name}
            </p>
          </div>
          <div className={styles.bidAmount}>{bid.amount}</div>
          <p className={styles.time}>{bid.time}</p>
        </div>
      ))}
    </div>
  );
};

export default BidHistory;