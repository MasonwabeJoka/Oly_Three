interface Message {
  id: number;
  name: string;
  contactName: string;
  profilePicture: string;
  createdAt: string;
  messages: MessageContent[];
}

interface MessageContent {
  text: string;
  senderType: "user" | "contact";
  time: string;
}

export const messages: Message[] = [
  {
    id: 1,
    name: "Jane Smith",
    contactName: "Jane Smith",
    profilePicture: "/profile_images/1.jpg",
    createdAt: "09:15",
    messages: [
      { text: "Hey, are we still meeting later today?", senderType: "contact", time: "09:15" },
      { text: "Sounds good! How about 3 PM?", senderType: "user", time: "09:16" },
      { text: "Just checking in if you got my last message.", senderType: "contact", time: "09:16" },
      { text: "Let me know what time works best for you!", senderType: "contact", time: "09:17" }
    ]
  },
  {
    id: 2,
    name: "Michael Johnson",
    contactName: "Michael Johnson",
    profilePicture: "/profile_images/6.jpg",
    createdAt: "08:42",
    messages: [
      { text: "The documents are ready for review. Do you want me to send them over email or WhatsApp?", senderType: "contact", time: "08:42" },
      { text: "Email works, thanks!", senderType: "user", time: "08:43" },
      { text: "By the way, great job on the presentation yesterday!", senderType: "contact", time: "08:43" }
    ]
  },
  {
    id: 3,
    name: "Emily Davis",
    contactName: "Emily Davis",
    profilePicture: "/profile_images/2.jpg",
    createdAt: "Yesterday",
    messages: [
      { text: "Can you send me the link to that article you mentioned?", senderType: "contact", time: "Yesterday" },
      { text: "Sure, I’ll send it now!", senderType: "user", time: "Yesterday" },
      { text: "I think it could really help with our research project.", senderType: "contact", time: "Yesterday" }
    ]
  },
  {
    id: 4,
    name: "David Lee",
    contactName: "David Lee",
    profilePicture: "/profile_images/9.jpg",
    createdAt: "Yesterday",
    messages: [
      { text: "Happy birthday! 🎉 Hope you have an amazing day!", senderType: "contact", time: "Yesterday" },
      { text: "Thanks! Planning a small party tonight.", senderType: "user", time: "Yesterday" },
      { text: "Let me know if you're doing anything fun to celebrate.", senderType: "contact", time: "Yesterday" }
    ]
  },
  {
    id: 5,
    name: "Sophia Wilson",
    contactName: "Sophia Wilson",
    profilePicture: "/profile_images/3.jpg",
    createdAt: "Mon",
    messages: [
      { text: "Quick reminder: our team meeting is tomorrow at 10am.", senderType: "contact", time: "Mon" },
      { text: "Thanks, I’ll be there!", senderType: "user", time: "Mon" },
      { text: "Here's the Zoom link: https://zoom.us/j/123456789", senderType: "contact", time: "Mon" },
      { text: "Let me know if you'll be able to make it.", senderType: "contact", time: "Mon" }
    ]
  },
  {
    id: 6,
    name: "Chris Brown",
    contactName: "Chris Brown",
    profilePicture: "/profile_images/13.jpg",
    createdAt: "Sun",
    messages: [
      { text: "Do you want to grab lunch this weekend?", senderType: "contact", time: "Sun" },
      { text: "Sounds great! Saturday works for me.", senderType: "user", time: "Sun" },
      { text: "There's a new Thai place downtown I’ve been wanting to try.", senderType: "contact", time: "Sun" }
    ]
  },
  {
    id: 7,
    name: "Olivia Martinez",
    contactName: "Olivia Martinez",
    profilePicture: "/profile_images/4.jpg",
    createdAt: "Sat",
    messages: [
      { text: "The client meeting has been moved to Thursday at 2pm.", senderType: "contact", time: "Sat" },
      { text: "I'll send you the updated agenda shortly.", senderType: "contact", time: "Sat" }
    ]
  },
  {
    id: 8,
    name: "Daniel Kim",
    contactName: "Daniel Kim",
    profilePicture: "/profile_images/14.jpg",
    createdAt: "Fri",
    messages: [
      { text: "Congrats on the promotion! 🎉", senderType: "contact", time: "Fri" },
      { text: "Let’s grab drinks to celebrate soon.", senderType: "contact", time: "Fri" }
    ]
  },
  {
    id: 9,
    name: "Ava Thompson",
    contactName: "Ava Thompson",
    profilePicture: "/profile_images/5.jpg",
    createdAt: "Thu",
    messages: [
      { text: "Here's the PDF you asked for.", senderType: "contact", time: "Thu" },
      { text: "Let me know if you need it in a different format.", senderType: "contact", time: "Thu" }
    ]
  },
  {
    id: 10,
    name: "James Anderson",
    contactName: "James Anderson",
    profilePicture: "/profile_images/james.jpg",
    createdAt: "Wed",
    messages: [
      { text: "Don't forget to RSVP for the company retreat!", senderType: "contact", time: "Wed" },
      { text: "Deadline is tomorrow at 5pm.", senderType: "contact", time: "Wed" }
    ]
  }
];