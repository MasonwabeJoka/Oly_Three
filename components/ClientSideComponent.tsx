"use client";

import { useEffect, useState } from "react";

const ClientSideComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      {/* Your client-side only content */}
      Client side content here
    </div>
  );
};

export default ClientSideComponent;
