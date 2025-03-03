const ads = [
  {
    title: "Spacious Family Home",
    description: "A beautiful 4-bedroom family home with a large garden.",
    price: 500000,
    pricingOption: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1600607686669-6c7c3e56e1f6",
      "https://images.unsplash.com/photo-1598928506313-9d87a04e3883",
      "https://images.unsplash.com/photo-1560448204-4dd8f0f5f2a9",
      "https://images.unsplash.com/photo-1606818974626-4a307a5c2001",
      "https://images.unsplash.com/photo-1590540179220-a5ae14d9241b",
      "https://images.unsplash.com/photo-1560185127-6f34f87b73ef",
      "https://images.unsplash.com/photo-1600573475282-8e03edc6b5c2",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1580596779601-d51470b2c5a4"
    ],
    details: ["Located in a quiet neighborhood, close to schools and parks."],
    
    features: ["4 bedrooms", "3 bathrooms", "2 car garage", "Large garden"],
    categories: ["Properties"]
  },
  {
    title: "Modern Apartment Downtown",
    description: "A stylish 2-bedroom apartment in the heart of the city.",
    price: 300000,
    pricingOption: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      "https://images.unsplash.com/photo-1605276378101-3f17c82b0e95",
      "https://images.unsplash.com/photo-1618229727351-fae3a7d3d54f",
      "https://images.unsplash.com/photo-1600592784378-6a733d3c092e",
      "https://images.unsplash.com/photo-1601882107410-4528b34f748a",
      "https://images.unsplash.com/photo-1597004082604-6d27bd9b38f6",
      "https://images.unsplash.com/photo-1612746360920-084b7b6b4410",
      "https://images.unsplash.com/photo-1505245208761-ba872912fac0",
      "https://images.unsplash.com/photo-1582502431352-dcc39c8c01d2"
    ],
    details: "Close to public transport and shopping centers.",
    features: ["2 bedrooms", "2 bathrooms", "Balcony", "City view"],
    categories: ["Properties"]
  },
  {
    title: "Luxury Villa with Pool",
    description: "A stunning villa with a private pool and breathtaking views.",
    price: 1500000,
    pricingOption: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1606075392984-ef51d40fdbb0",
      "https://images.unsplash.com/photo-1590040532807-dba965a3baef",
      "https://images.unsplash.com/photo-1560185898-b60d3fb97bc0",
      "https://images.unsplash.com/photo-1560185977-70ac4ac943d6",
      "https://images.unsplash.com/photo-1600592784378-6a733d3c092e",
      "https://images.unsplash.com/photo-1590858733352-557f5fe69423",
      "https://images.unsplash.com/photo-1600573475282-8e03edc6b5c2",
      "https://images.unsplash.com/photo-1590414524493-d473b6c2a4d1"
    ],
    details: "Located in a gated community with 24/7 security.",
    features: ["5 bedrooms", "4 bathrooms", "Private pool", "Ocean view"],
    categories: ["Properties"]
  },
  {
    title: "Family SUV",
    description: "A reliable SUV perfect for family trips.",
    price: 25000,
    pricingOption: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1616161613122-47801d5ae11e",
      "https://images.unsplash.com/photo-1611123968528-ae73f6f155d3",
      "https://images.unsplash.com/photo-1610871154947-44ffdc0e00b1",
      "https://images.unsplash.com/photo-1518325536516-4f45282382c2",
      "https://images.unsplash.com/photo-1612456598566-7a05d3aabf56",
      "https://images.unsplash.com/photo-1608596953021-9d1e85cc8a2f",
      "https://images.unsplash.com/photo-1600051300545-7d1ff5a9ad10",
      "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      "https://images.unsplash.com/photo-1594349633709-e1d4e74f4566"
    ],
    details: "Low mileage and in excellent condition.",
    features: ["7 seats", "Automatic transmission", "Air conditioning", "GPS"],
    categories: ["Vehicles"]
  },
  {
    title: "Compact City Car",
    description: "A fuel-efficient compact car ideal for city driving.",
    price: 15000,
    pricingOption: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1600110812497-df72ebd344b2",
      "https://images.unsplash.com/photo-1603145733174-6232b8748c8e",
      "https://images.unsplash.com/photo-1582580622427-c9dd9691e021",
      "https://images.unsplash.com/photo-1597699400098-50f96d4f2735",
      "https://images.unsplash.com/photo-1583454110557-bd7c8e4b3e70",
      "https://images.unsplash.com/photo-1591874526725-d8b4b96e6184",
      "https://images.unsplash.com/photo-1580795690759-0d1e9c3a0f92",
      "https://images.unsplash.com/photo-1559752038-5487a9533c85",
      "https://images.unsplash.com/photo-1597699400098-50f96d4f2735"
    ],
    details: "Great fuel economy and easy to park.",
    features: ["4 seats", "Manual transmission", "Bluetooth", "Airbags"],
    categories: ["Vehicles"]
  },
  {
    title: "Hybrid Sedan",
    description: "An eco-friendly sedan with hybrid technology.",
    price: 25000,
    pricingOption: "For Sale",
    images: [
      "https://source.unsplash.com/random/800x600/?hybridsedan1",
      "https://source.unsplash.com/random/600x800/?hybridsedan2",
      "https://source.unsplash.com/random/800x600/?hybridsedan3",
      "https://source.unsplash.com/random/600x800/?hybridsedan4",
      "https://source.unsplash.com/random/800x600/?hybridsedan5",
      "https://source.unsplash.com/random/600x800/?hybridsedan6",
      "https://source.unsplash.com/random/800x600/?hybridsedan7",
      "https://source.unsplash.com/random/600x800/?hybridsedan8",
      "https://source.unsplash.com/random/800x600/?hybridsedan9"
    ],
    details: "In excellent condition with full service history.",
    features: ["5 seats", "Automatic transmission", "Bluetooth", "Hybrid engine"],
    categories: ["Vehicles"]
  },
  {
    title: "Penthouse Apartment",
    description: "A luxurious penthouse with panoramic city views.",
    price: 1000000,
    pricingOption: "For Sale",
    images: [
      "https://source.unsplash.com/random/800x600/?penthouse1",
      "https://source.unsplash.com/random/600x800/?penthouse2",
      "https://source.unsplash.com/random/800x600/?penthouse3",
      "https://source.unsplash.com/random/600x800/?penthouse4",
      "https://source.unsplash.com/random/800x600/?penthouse5",
      "https://source.unsplash.com/random/600x800/?penthouse6",
      "https://source.unsplash.com/random/800x600/?penthouse7",
      "https://source.unsplash.com/random/600x800/?penthouse8",
      "https://source.unsplash.com/random/800x600/?penthouse9"
    ],
    details: "Located in a prestigious building with private amenities.",
    features: ["4 bedrooms", "3 bathrooms", "Private elevator", "Rooftop terrace"],
    categories: ["Properties"]
  },
  {
    title: "Vintage Convertible",
    description: "A classic convertible in mint condition.",
    price: 55000,
    pricingOption: "For Sale",
    images: [
      "https://source.unsplash.com/random/800x600/?vintageconvertible1",
      "https://source.unsplash.com/random/600x800/?vintageconvertible2",
      "https://source.unsplash.com/random/800x600/?vintageconvertible3",
      "https://source.unsplash.com/random/600x800/?vintageconvertible4",
      "https://source.unsplash.com/random/800x600/?vintageconvertible5",
      "https://source.unsplash.com/random/600x800/?vintageconvertible6",
      "https://source.unsplash.com/random/800x600/?vintageconvertible7",
      "https://source.unsplash.com/random/600x800/?vintageconvertible8",
      "https://source.unsplash.com/random/800x600/?vintageconvertible9"
    ],
    details: "Fully restored with original parts.",
    features: ["V8 engine", "Manual transmission", "Leather seats", "Custom paint job"],
    categories: ["Vehicles"]
  },
  {
    title: "Seaside Villa",
    description: "A beautiful villa overlooking the ocean.",
    price: 1200000,
    pricingOption: "For Sale",
    images: [
      "https://source.unsplash.com/random/800x600/?seasidevilla1",
      "https://source.unsplash.com/random/600x800/?seasidevilla2",
      "https://source.unsplash.com/random/800x600/?seasidevilla3",
      "https://source.unsplash.com/random/600x800/?seasidevilla4",
      "https://source.unsplash.com/random/800x600/?seasidevilla5",
      "https://source.unsplash.com/random/600x800/?seasidevilla6",
      "https://source.unsplash.com/random/800x600/?seasidevilla7",
      "https://source.unsplash.com/random/600x800/?seasidevilla8",
      "https://source.unsplash.com/random/800x600/?seasidevilla9"
    ],
    details: "Located in a peaceful area with private beach access.",
    features: ["5 bedrooms", "4 bathrooms", "Private pool", "Ocean view"],
    categories: ["Properties"]
  },
  {
    title: "Urban Studio",
    description: "A modern studio apartment in the city center.",
    price: 200000,
    pricingOption: "For Sale",
    images: [
      "https://source.unsplash.com/random/800x600/?urbanstudio1",
      "https://source.unsplash.com/random/600x800/?urbanstudio2",
      "https://source.unsplash.com/random/800x600/?urbanstudio3",
      "https://source.unsplash.com/random/600x800/?urbanstudio4",
      "https://source.unsplash.com/random/800x600/?urbanstudio5",
      "https://source.unsplash.com/random/600x800/?urbanstudio6",
      "https://source.unsplash.com/random/800x600/?urbanstudio7",
      "https://source.unsplash.com/random/600x800/?urbanstudio8",
      "https://source.unsplash.com/random/800x600/?urbanstudio9"
    ],
    details: "Ideal for professionals or students.",
    features: ["1 bedroom", "1 bathroom", "City view", "Open plan"],
    categories: ["Properties"]
  }
  ];
  
  export default ads;
  