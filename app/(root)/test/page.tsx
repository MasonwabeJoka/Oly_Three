// Helper to simulate a delay
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function TestPage() {
  // Simulate a 2 second delay
  await wait(2000);

  return <div>Test page loaded!</div>;
}
