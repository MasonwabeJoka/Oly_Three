import useMessageStore from "@/features/messages/store/useMessageStore";
import usePaymentModalStore from "../store/usePaymentModalStore";
import useAuctionModalStore from "../auction/store/useAuctionModalStore";

const TestPage = () => {
  const { setShowAuctionModal } = useAuctionModalStore();
  const { setShowPaymentModal } = usePaymentModalStore();
  const { setChats } = useMessageStore();

  return (
    <div>
      <button onClick={() => setShowAuctionModal(true)}>Open Auction</button>
      <button onClick={() => setShowPaymentModal(true)}>Open Payment</button>
      <button onClick={() => setChats(true)}>Open Chat</button>
    </div>
  );
};

export default TestPage;
