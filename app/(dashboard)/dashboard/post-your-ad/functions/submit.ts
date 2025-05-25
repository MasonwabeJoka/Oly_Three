import { useState } from 'react'
import { Ad } from '@/sanity/Types/Ad';

export const submit = async (data: Ad) => {
    const [message, setMessage] = useState("");
    try {
      // Call your server action here
      const response = await fetch("/api/createAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setMessage("Ad created successfully");
    } catch (error) {
      console.error("Error creating ad:", error);
      setMessage("Error creating ad");
    }
};
