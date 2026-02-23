import { useParams } from "next/navigation";
import { useMemo } from "react";

const useChat = () => {
   const params = useParams();

   const chatId = useMemo(() => {
        if(!params?.useChatId) {
            return ''
        };

        return params.chatId as string;
   },[params?.chatId]);

   const isOpen= useMemo(()=> !!chatId, [chatId]); // the !! turns a string to a boolean

   return useMemo(() => ({
    isOpen,
    chatId
   }), [isOpen, chatId]);
}

export default useChat