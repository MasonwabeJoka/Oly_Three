
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const VehicleSellerDetails = () => {
  const router = useRouter();
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    city: "",
    sellerType: "private",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSeller((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => router.push("/sell/review");

  return (
    <main>
      <h1>Seller Information</h1>

      <label>
        Name
        <input name="name" value={seller.name} onChange={handleChange} />
      </label>

      <label>
        Email
        <input type="email" name="email" value={seller.email} onChange={handleChange} />
      </label>

      <label>
        Phone
        <input type="tel" name="phone" value={seller.phone} onChange={handleChange} />
      </label>

      <label>
        Province
        <input name="province" value={seller.province} onChange={handleChange} />
      </label>

      <label>
        City
        <input name="city" value={seller.city} onChange={handleChange} />
      </label>

      <label>
        Seller Type
        <select name="sellerType" value={seller.sellerType} onChange={handleChange}>
          <option value="private">Private</option>
          <option value="dealer">Dealer</option>
        </select>
      </label>

      <button type="button" onClick={handleNext} disabled={!seller.name || !seller.phone}>
        Next
      </button>
    </main>
  );
}

export default VehicleSellerDetails;
