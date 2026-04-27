type MessageStatus = "sending" | "sent" | "delivered" | "seen" | "failed";
interface MessageContent {
  id: string;
  text: string;
  senderType: "user" | "contact";
  status: MessageStatus;
  createdAt: number;
}
interface Chat {
  id: number;
  name: string;
  contact: { id: string; name: string; avatar: string };
  createdAt: number;
  messages: MessageContent[];
  opened: boolean;
}
const now = Date.now();

const minutesAgo = (mins: number) => now - mins * 60 * 1000;
const daysAgo = (days: number) => now - days * 24 * 60 * 60 * 1000;

export const chats: Chat[] = [
  {
    id: 1,
    name: "Jane Smith",
    contact: {
      id: "c1",
      name: "Jane Smith",
      avatar: "/profile_images/1.jpg",
    },
    createdAt: minutesAgo(5),
    opened: false,
    messages: [
      {
        id: "m1",
        text: "Hey, are we still meeting later today?",
        senderType: "contact",
        status: "seen",
        createdAt: minutesAgo(5),
      },
      {
        id: "m2",
        text: "Sounds good! How about 3 PM?",
        senderType: "user",
        status: "seen",
        createdAt: minutesAgo(4),
      },
      {
        id: "m3",
        text: "Just checking in if you got my last message.",
        senderType: "contact",
        status: "delivered",
        createdAt: minutesAgo(3),
      },
      {
        id: "m4",
        text: "Let me know what time works best for you!",
        senderType: "contact",
        status: "delivered",
        createdAt: minutesAgo(2),
      },
    ],
  },
  {
    id: 2,
    name: "Michael Johnson",
    contact: {
      id: "c2",
      name: "Michael Johnson",
      avatar: "/profile_images/6.jpg",
    },
    createdAt: minutesAgo(30),
    opened: true,
    messages: [
      {
        id: "m5",
        text: "The documents are ready for review. Do you want me to send them over email or WhatsApp?",
        senderType: "contact",
        status: "seen",
        createdAt: minutesAgo(30),
      },
      {
        id: "m6",
        text: "Email works, thanks!",
        senderType: "user",
        status: "seen",
        createdAt: minutesAgo(29),
      },
      {
        id: "m7",
        text: "By the way, great job on the presentation yesterday!",
        senderType: "contact",
        status: "delivered",
        createdAt: minutesAgo(28),
      },
    ],
  },
  {
    id: 3,
    name: "Emily Davis",
    contact: {
      id: "c3",
      name: "Emily Davis",
      avatar: "/profile_images/2.jpg",
    },
    createdAt: daysAgo(1),
    opened: true,
    messages: [
      {
        id: "m8",
        text: "Can you send me the link to that article you mentioned?",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(1),
      },
      {
        id: "m9",
        text: "Sure, I’ll send it now!",
        senderType: "user",
        status: "sent",
        createdAt: daysAgo(1) + 1000,
      },
      {
        id: "m10",
        text: "I think it could really help with our research project.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(1) + 2000,
      },
    ],
  },
  {
    id: 4,
    name: "David Lee",
    contact: {
      id: "c4",
      name: "David Lee",
      avatar: "/profile_images/9.jpg",
    },
    createdAt: daysAgo(1),
    opened: false,
    messages: [
      {
        id: "m11",
        text: "Happy birthday! 🎉 Hope you have an amazing day!",
        senderType: "contact",
        status: "seen",
        createdAt: daysAgo(1),
      },
      {
        id: "m12",
        text: "Thanks! Planning a small party tonight.",
        senderType: "user",
        status: "seen",
        createdAt: daysAgo(1) + 1000,
      },
      {
        id: "m13",
        text: "Let me know if you're doing anything fun to celebrate.",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(1) + 2000,
      },
    ],
  },
  {
    id: 5,
    name: "Sophia Wilson",
    contact: {
      id: "c5",
      name: "Sophia Wilson",
      avatar: "/profile_images/3.jpg",
    },
    createdAt: daysAgo(3),
    opened: true,
    messages: [
      {
        id: "m14",
        text: "Quick reminder: our team meeting is tomorrow at 10am.",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(3),
      },
      {
        id: "m15",
        text: "Thanks, I’ll be there!",
        senderType: "user",
        status: "seen",
        createdAt: daysAgo(3) + 1000,
      },
      {
        id: "m16",
        text: "Here's the Zoom link: https://zoom.us/j/123456789",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(3) + 2000,
      },
      {
        id: "m17",
        text: "Let me know if you'll be able to make it.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(3) + 3000,
      },
    ],
  },
  {
    id: 6,
    name: "Chris Brown",
    contact: {
      id: "c6",
      name: "Chris Brown",
      avatar: "/profile_images/13.jpg",
    },
    createdAt: daysAgo(4),
    opened: false,
    messages: [
      {
        id: "m18",
        text: "Do you want to grab lunch this weekend?",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(4),
      },
      {
        id: "m19",
        text: "Sounds great! Saturday works for me.",
        senderType: "user",
        status: "seen",
        createdAt: daysAgo(4) + 1000,
      },
      {
        id: "m20",
        text: "There's a new Thai place downtown I’ve been wanting to try.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(4) + 2000,
      },
    ],
  },
  {
    id: 7,
    name: "Olivia Martinez",
    contact: {
      id: "c7",
      name: "Olivia Martinez",
      avatar: "/profile_images/4.jpg",
    },
    createdAt: daysAgo(5),
    opened: false,
    messages: [
      {
        id: "m21",
        text: "The client meeting has been moved to Thursday at 2pm.",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(5),
      },
      {
        id: "m22",
        text: "I'll send you the updated agenda shortly.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(5) + 1000,
      },
    ],
  },
  {
    id: 8,
    name: "Daniel Kim",
    contact: {
      id: "c8",
      name: "Daniel Kim",
      avatar: "/profile_images/14.jpg",
    },
    createdAt: daysAgo(6),
    opened: false,
    messages: [
      {
        id: "m23",
        text: "Congrats on the promotion! 🎉",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(6),
      },
      {
        id: "m24",
        text: "Let’s grab drinks to celebrate soon.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(6) + 1000,
      },
    ],
  },
  {
    id: 9,
    name: "Ava Thompson",
    contact: {
      id: "c9",
      name: "Ava Thompson",
      avatar: "/profile_images/5.jpg",
    },
    createdAt: daysAgo(7),
    opened: false,
    messages: [
      {
        id: "m25",
        text: "Here's the PDF you asked for.",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(7),
      },
      {
        id: "m26",
        text: "Let me know if you need it in a different format.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(7) + 1000,
      },
    ],
  },
  {
    id: 10,
    name: "James Anderson",
    contact: {
      id: "c10",
      name: "James Anderson",
      avatar: "/profile_images/james.jpg",
    },
    createdAt: daysAgo(8),
    opened: false,
    messages: [
      {
        id: "m27",
        text: "Don't forget to RSVP for the company retreat!",
        senderType: "contact",
        status: "delivered",
        createdAt: daysAgo(8),
      },
      {
        id: "m28",
        text: "Deadline is tomorrow at 5pm.",
        senderType: "contact",
        status: "sent",
        createdAt: daysAgo(8) + 1000,
      },
    ],
  },
];
