import { create } from "zustand";
import { Comment, Reply } from "../data/comments";

type CommentsState = {
  comments: Comment[];
  addComment: (text: string) => void;
  addReply: (commentId: string, text: string) => void;
  likeComment: (id: string) => void;
  dislikeComment: (id: string) => void;
  likeReply: (commentId: string, replyId: string) => void;
  dislikeReply: (commentId: string, replyId: string) => void;
};

const initialComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      username: "johndoe",
      avatarUrl: "https://i.pravatar.cc/48?img=1",
    },
    date: "Aug 4",
    content:
      "Reply to @manseeker: This is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 12,
    dislikes: 1,
    replies: [
      {
        id: "r1",
        author: {
          name: "Jane Smith",
          username: "janesmith",
          avatarUrl: "https://i.pravatar.cc/48?img=2",
        },
        date: "Aug 5",
        content: "I totally agree with you John!",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
];

export const useCommentsStore = create<CommentsState>((set) => ({
  comments: initialComments,

  addComment: (text) =>
    set((state) => ({
      comments: [
        {
          id: Date.now().toString(),
          author: {
            name: "You",
            username: "you",
            avatarUrl: "https://i.pravatar.cc/48?img=5",
          },
          date: "Just now",
          content: text,
          likes: 0,
          dislikes: 0,
          replies: [],
        },
        ...state.comments,
      ],
    })),

  addReply: (commentId, text) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now().toString(),
                  author: {
                    name: "You",
                    username: "you",
                    avatarUrl: "https://i.pravatar.cc/48?img=5",
                  },
                  date: "Just now",
                  content: text,
                  likes: 0,
                  dislikes: 0,
                },
              ],
            }
          : c
      ),
    })),

  likeComment: (id) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      ),
    })),

  dislikeComment: (id) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === id ? { ...c, dislikes: c.dislikes + 1 } : c
      ),
    })),

  likeReply: (commentId, replyId) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, likes: r.likes + 1 } : r
              ),
            }
          : c
      ),
    })),

  dislikeReply: (commentId, replyId) =>
    set((state) => ({
      comments: state.comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? { ...r, dislikes: r.dislikes + 1 } : r
              ),
            }
          : c
      ),
    })),
}));
