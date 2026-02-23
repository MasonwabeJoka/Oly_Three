import {ChatType, Message, User} from "@prisma/client"

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
};

export type FullChatType = ChatType & {
    users: User[];
    messages: FullMessageType[],
}