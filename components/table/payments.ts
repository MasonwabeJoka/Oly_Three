
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed" | "completed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "a1f3c9d8",
    amount: 250,
    status: "completed",
    email: "john.doe@example.com",
  },
  {
    id: "b2e4d5f6",
    amount: 300,
    status: "pending",
    email: "jane.smith@example.com",
  },
  {
    id: "c3f5e6a7",
    amount: 75,
    status: "processing",
    email: "alex.lee@example.com",
  },
  {
    id: "d4g6h7i8",
    amount: 450,
    status: "completed",
    email: "sara.jones@example.com",
  },
  {
    id: "e5h7i8j9",
    amount: 600,
    status: "pending",
    email: "paul.white@example.com",
  },
  {
    id: "f6i8j9k0",
    amount: 90,
    status: "completed",
    email: "lucas.martin@example.com",
  },
  {
    id: "g7j9k0l1",
    amount: 180,
    status: "processing",
    email: "emma.brown@example.com",
  },
  {
    id: "h8k0l1m2",
    amount: 220,
    status: "completed",
    email: "chris.wilson@example.com",
  },
  {
    id: "i9l1m2n3",
    amount: 130,
    status: "pending",
    email: "olivia.davis@example.com",
  },
  {
    id: "j0m2n3o4",
    amount: 500,
    status: "completed",
    email: "noah.thomas@example.com",
  },
  {
    id: "k1n3o4p5",
    amount: 340,
    status: "processing",
    email: "ava.moore@example.com",
  },
  {
    id: "l2o4p5q6",
    amount: 410,
    status: "pending",
    email: "liam.jackson@example.com",
  },
  {
    id: "m3p5q6r7",
    amount: 275,
    status: "completed",
    email: "mia.taylor@example.com",
  },
  {
    id: "n4q6r7s8",
    amount: 360,
    status: "processing",
    email: "ethan.harris@example.com",
  },
  {
    id: "o5r7s8t9",
    amount: 200,
    status: "completed",
    email: "sophia.clark@example.com",
  },
  {
    id: "p6s8t9u0",
    amount: 150,
    status: "pending",
    email: "mason.robinson@example.com",
  },
  {
    id: "q7t9u0v1",
    amount: 80,
    status: "completed",
    email: "isabella.walker@example.com",
  },
  {
    id: "r8u0v1w2",
    amount: 310,
    status: "processing",
    email: "james.young@example.com",
  },
  {
    id: "s9v1w2x3",
    amount: 95,
    status: "pending",
    email: "amelia.king@example.com",
  },
  {
    id: "t0w2x3y4",
    amount: 120,
    status: "completed",
    email: "logan.scott@example.com",
  },
  {
    id: "u1x3y4z5",
    amount: 275,
    status: "processing",
    email: "harper.green@example.com",
  },
  {
    id: "v2y4z5a6",
    amount: 330,
    status: "completed",
    email: "benjamin.adams@example.com",
  },
  {
    id: "w3z5a6b7",
    amount: 470,
    status: "pending",
    email: "charlotte.baker@example.com",
  },
  {
    id: "x4a6b7c8",
    amount: 260,
    status: "completed",
    email: "elijah.nelson@example.com",
  },
  {
    id: "y5b7c8d9",
    amount: 190,
    status: "processing",
    email: "abigail.carter@example.com",
  },
  {
    id: "z6c8d9e0",
    amount: 140,
    status: "pending",
    email: "william.mitchell@example.com",
  },
  {
    id: "a7d9e0f1",
    amount: 210,
    status: "completed",
    email: "ella.roberts@example.com",
  },
  {
    id: "b8e0f1g2",
    amount: 380,
    status: "processing",
    email: "jackson.turner@example.com",
  },
  {
    id: "c9f1g2h3",
    amount: 500,
    status: "completed",
    email: "scarlett.phillips@example.com",
  },
  {
    id: "d0g2h3i4",
    amount: 270,
    status: "pending",
    email: "sebastian.campbell@example.com",
  },
  {
    id: "e1h3i4j5",
    amount: 360,
    status: "processing",
    email: "aria.parker@example.com",
  },
  {
    id: "f2i4j5k6",
    amount: 420,
    status: "completed",
    email: "henry.evans@example.com",
  },
  {
    id: "g3j5k6l7",
    amount: 290,
    status: "pending",
    email: "avery.edwards@example.com",
  },
  {
    id: "h4k6l7m8",
    amount: 135,
    status: "completed",
    email: "mila.collins@example.com",
  },
];
