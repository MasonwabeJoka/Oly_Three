import ChatPage from "@/features/messages/components/ChatPage";
import { use } from "react";

const Page = ({ params }: { params: Promise<{ chatId: string }> }) => {
  const { chatId } = use(params);
  return <ChatPage chatId={Number(chatId)} />;
};

export default Page;
