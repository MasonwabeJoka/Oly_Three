// types/feedback.ts
export type FeedbackType = 
  | "All"
  | "General"
  | "Feature Request"
  | "Bug Report"
  | "Report Listing";

export interface Feedback {
  id: string;
  user?: string;
  email: string;
  title: string;
  feedback: string;
  profilePicture: string;       
  date: string;          // ISO string for sorting/filtering
  time: string; 
  listingId?: string|number;
  type: FeedbackType;    
  status?: "open" | "in-progress" | "resolved" | "closed"; // optional workflow
}


export const feedbackData: Feedback[] = [
  {
    id: "1",
    user: "John Doe",
    email: "john@example.com",
    title: "Love the clean UI!",
    feedback: "The site feels modern and easy to navigate. Great job!",
    profilePicture: "/profile_images/1.jpg",
    date: "2025-09-29T12:00:00Z",
    time: "12:00 PM",
    type: "General",
    status: "resolved",
  },
  {
    id: "2",
    user: "John Smith",
    email: "john@example.com",
    title: "Dark Mode Feature",
    feedback: "It would be amazing if you could add a dark mode toggle.",
    profilePicture: "/profile_images/2.jpg",
    date: "2025-09-28T08:30:00Z",
    time: "08:30 AM",
    type:  "Feature Request",
    status: "in-progress",

  },
  {
    id: "3",
    user: "Alice M.",
    email: "alice@example.com",
    title: "Search not working properly",
    feedback: "When I search for 'Toyota', I don’t get relevant results.",
    profilePicture: "/profile_images/3.jpg",
    date: "2025-09-27T14:10:00Z",
    time: "14:10 PM",
    type: "Bug Report",
    status: "open", 
  },
  {
    id: "4",
    user: "Michael K.",
    email: "michael@example.com",
    title: "Fake listing - Toyota Corolla",
    feedback: "The listing for 'Toyota Corolla 2020 - R50,000' seems fake.",
    profilePicture: "/profile_images/4.jpg",
    date: "2025-09-25T10:45:00Z",
    time: "10:45 AM",
    listingId: "12345",
    type: "Report Listing",
  },
];

export const feedbackLabels: string[] = [
  "All",
  "General",
  "Feature Request",
  "Bug Report",
  "Report Listing",
];
