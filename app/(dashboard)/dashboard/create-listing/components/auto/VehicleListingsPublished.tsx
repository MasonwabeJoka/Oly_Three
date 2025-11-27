'use client';
import { useRouter } from "next/navigation";

const VehicleListingsPublished = () => {
  const router = useRouter();

  return (
    <main>
      <h1>Your Car is Now Listed!</h1>
      <p>Congratulations! Your listing is live and visible to buyers and dealers.</p>

      <button onClick={() => router.push("/sell/dashboard")}>
        View My Listings
      </button>

      <button onClick={() => router.push("/sell/promotions")}>
        Promote Listing
      </button>
    </main>
  );
}

export default VehicleListingsPublished;