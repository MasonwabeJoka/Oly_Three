// types.ts
export type Reply = {
  id: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  date: string;
  content: string;
  likes: number;
  dislikes: number;
};

export type Comment = {
  id: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  date: string;
  content: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
};

export const comments: Comment[] = [
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
  {
    id: "2",
    author: {
      name: "Alice Brown",
      username: "aliceb",
      avatarUrl: "https://i.pravatar.cc/48?img=3",
    },
    date: "Aug 6",
    content: "Another perspective: the article missed an important point about pricing.",
    likes: 5,
    dislikes: 2,
    replies: [],
  },
];
