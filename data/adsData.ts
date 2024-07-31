const ads = [
    {
      title: "Spacious Family Home",
      description: "A beautiful 4-bedroom family home with a large garden.",
      price: 500000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?house1",
        "https://source.unsplash.com/random/600x800/?house2",
        "https://source.unsplash.com/random/800x600/?house3",
        "https://source.unsplash.com/random/600x800/?house4",
        "https://source.unsplash.com/random/800x600/?house5",
        "https://source.unsplash.com/random/600x800/?house6",
        "https://source.unsplash.com/random/800x600/?house7",
        "https://source.unsplash.com/random/600x800/?house8",
        "https://source.unsplash.com/random/800x600/?house9"
      ],
      details: "Located in a quiet neighborhood, close to schools and parks.",
      features: ["4 bedrooms", "3 bathrooms", "2 car garage", "Large garden"],
      categories: ["Properties"]
    },
    {
      title: "Modern Apartment Downtown",
      description: "A stylish 2-bedroom apartment in the heart of the city.",
      price: 300000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?apartment1",
        "https://source.unsplash.com/random/600x800/?apartment2",
        "https://source.unsplash.com/random/800x600/?apartment3",
        "https://source.unsplash.com/random/600x800/?apartment4",
        "https://source.unsplash.com/random/800x600/?apartment5",
        "https://source.unsplash.com/random/600x800/?apartment6",
        "https://source.unsplash.com/random/800x600/?apartment7",
        "https://source.unsplash.com/random/600x800/?apartment8",
        "https://source.unsplash.com/random/800x600/?apartment9"
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
        "https://source.unsplash.com/random/800x600/?villa1",
        "https://source.unsplash.com/random/600x800/?villa2",
        "https://source.unsplash.com/random/800x600/?villa3",
        "https://source.unsplash.com/random/600x800/?villa4",
        "https://source.unsplash.com/random/800x600/?villa5",
        "https://source.unsplash.com/random/600x800/?villa6",
        "https://source.unsplash.com/random/800x600/?villa7",
        "https://source.unsplash.com/random/600x800/?villa8",
        "https://source.unsplash.com/random/800x600/?villa9"
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
        "https://source.unsplash.com/random/800x600/?suv1",
        "https://source.unsplash.com/random/600x800/?suv2",
        "https://source.unsplash.com/random/800x600/?suv3",
        "https://source.unsplash.com/random/600x800/?suv4",
        "https://source.unsplash.com/random/800x600/?suv5",
        "https://source.unsplash.com/random/600x800/?suv6",
        "https://source.unsplash.com/random/800x600/?suv7",
        "https://source.unsplash.com/random/600x800/?suv8",
        "https://source.unsplash.com/random/800x600/?suv9"
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
        "https://source.unsplash.com/random/800x600/?car1",
        "https://source.unsplash.com/random/600x800/?car2",
        "https://source.unsplash.com/random/800x600/?car3",
        "https://source.unsplash.com/random/600x800/?car4",
        "https://source.unsplash.com/random/800x600/?car5",
        "https://source.unsplash.com/random/600x800/?car6",
        "https://source.unsplash.com/random/800x600/?car7",
        "https://source.unsplash.com/random/600x800/?car8",
        "https://source.unsplash.com/random/800x600/?car9"
      ],
      details: "Great fuel economy and easy to park.",
      features: ["4 seats", "Manual transmission", "Bluetooth", "Airbags"],
      categories: ["Vehicles"]
    },
    {
      title: "Luxury Sedan",
      description: "A high-end sedan with all the latest features.",
      price: 60000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?sedan1",
        "https://source.unsplash.com/random/600x800/?sedan2",
        "https://source.unsplash.com/random/800x600/?sedan3",
        "https://source.unsplash.com/random/600x800/?sedan4",
        "https://source.unsplash.com/random/800x600/?sedan5",
        "https://source.unsplash.com/random/600x800/?sedan6",
        "https://source.unsplash.com/random/800x600/?sedan7",
        "https://source.unsplash.com/random/600x800/?sedan8",
        "https://source.unsplash.com/random/800x600/?sedan9"
      ],
      details: "Impeccable condition with full service history.",
      features: ["Leather seats", "Sunroof", "Heated seats", "Advanced safety features"],
      categories: ["Vehicles"]
    },
    {
      title: "Charming Cottage",
      description: "A cozy 2-bedroom cottage in the countryside.",
      price: 200000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?cottage1",
        "https://source.unsplash.com/random/600x800/?cottage2",
        "https://source.unsplash.com/random/800x600/?cottage3",
        "https://source.unsplash.com/random/600x800/?cottage4",
        "https://source.unsplash.com/random/800x600/?cottage5",
        "https://source.unsplash.com/random/600x800/?cottage6",
        "https://source.unsplash.com/random/800x600/?cottage7",
        "https://source.unsplash.com/random/600x800/?cottage8",
        "https://source.unsplash.com/random/800x600/?cottage9"
      ],
      details: "Surrounded by nature, perfect for a peaceful retreat.",
      features: ["2 bedrooms", "1 bathroom", "Fireplace", "Garden"],
      categories: ["Properties"]
    },
    {
      title: "Classic Muscle Car",
      description: "A vintage muscle car in pristine condition.",
      price: 45000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?musclecar1",
        "https://source.unsplash.com/random/600x800/?musclecar2",
        "https://source.unsplash.com/random/800x600/?musclecar3",
        "https://source.unsplash.com/random/600x800/?musclecar4",
        "https://source.unsplash.com/random/800x600/?musclecar5",
        "https://source.unsplash.com/random/600x800/?musclecar6",
        "https://source.unsplash.com/random/800x600/?musclecar7",
        "https://source.unsplash.com/random/600x800/?musclecar8",
        "https://source.unsplash.com/random/800x600/?musclecar9"
      ],
      details: "Fully restored with original parts.",
      features: ["V8 engine", "Manual transmission", "Leather seats", "Custom paint job"],
      categories: ["Vehicles"]
    },
    {
      title: "Beachfront Condo",
      description: "A luxurious condo with stunning ocean views.",
      price: 750000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?condo1",
        "https://source.unsplash.com/random/600x800/?condo2",
        "https://source.unsplash.com/random/800x600/?condo3",
        "https://source.unsplash.com/random/600x800/?condo4",
        "https://source.unsplash.com/random/800x600/?condo5",
        "https://source.unsplash.com/random/600x800/?condo6",
        "https://source.unsplash.com/random/800x600/?condo7",
        "https://source.unsplash.com/random/600x800/?condo8",
        "https://source.unsplash.com/random/800x600/?condo9"
      ],
      details: "Located in a prime area with private beach access.",
      features: ["3 bedrooms", "2 bathrooms", "Balcony", "Ocean view"],
      categories: ["Properties"]
    },
    {
      title: "Convertible Sports Car",
      description: "A sleek convertible perfect for summer drives.",
      price: 70000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?convertible1",
        "https://source.unsplash.com/random/600x800/?convertible2",
        "https://source.unsplash.com/random/800x600/?convertible3",
        "https://source.unsplash.com/random/600x800/?convertible4",
        "https://source.unsplash.com/random/800x600/?convertible5",
        "https://source.unsplash.com/random/600x800/?convertible6",
        "https://source.unsplash.com/random/800x600/?convertible7",
        "https://source.unsplash.com/random/600x800/?convertible8",
        "https://source.unsplash.com/random/800x600/?convertible9"
      ],
      details: "Low mileage and in excellent condition.",
      features: ["2 seats", "Automatic transmission", "Bluetooth", "Leather seats"],
      categories: ["Vehicles"]
    },
    {
      title: "Mountain Cabin",
      description: "A rustic cabin in the mountains, perfect for a getaway.",
      price: 350000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?cabin1",
        "https://source.unsplash.com/random/600x800/?cabin2",
        "https://source.unsplash.com/random/800x600/?cabin3",
        "https://source.unsplash.com/random/600x800/?cabin4",
        "https://source.unsplash.com/random/800x600/?cabin5",
        "https://source.unsplash.com/random/600x800/?cabin6",
        "https://source.unsplash.com/random/800x600/?cabin7",
        "https://source.unsplash.com/random/600x800/?cabin8",
        "https://source.unsplash.com/random/800x600/?cabin9"
      ],
      details: "Secluded location with breathtaking views.",
      features: ["3 bedrooms", "2 bathrooms", "Fireplace", "Hot tub"],
      categories: ["Properties"]
    },
    {
      title: "Electric Hatchback",
      description: "A compact electric car with excellent range.",
      price: 30000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?hatchback1",
        "https://source.unsplash.com/random/600x800/?hatchback2",
        "https://source.unsplash.com/random/800x600/?hatchback3",
        "https://source.unsplash.com/random/600x800/?hatchback4",
        "https://source.unsplash.com/random/800x600/?hatchback5",
        "https://source.unsplash.com/random/600x800/?hatchback6",
        "https://source.unsplash.com/random/800x600/?hatchback7",
        "https://source.unsplash.com/random/600x800/?hatchback8",
        "https://source.unsplash.com/random/800x600/?hatchback9"
      ],
      details: "Excellent condition with full service history.",
      features: ["5 seats", "Automatic transmission", "Air conditioning", "Bluetooth"],
      categories: ["Vehicles"]
    },
    {
      title: "Downtown Loft",
      description: "A modern loft in a vibrant downtown area.",
      price: 450000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?loft1",
        "https://source.unsplash.com/random/600x800/?loft2",
        "https://source.unsplash.com/random/800x600/?loft3",
        "https://source.unsplash.com/random/600x800/?loft4",
        "https://source.unsplash.com/random/800x600/?loft5",
        "https://source.unsplash.com/random/600x800/?loft6",
        "https://source.unsplash.com/random/800x600/?loft7",
        "https://source.unsplash.com/random/600x800/?loft8",
        "https://source.unsplash.com/random/800x600/?loft9"
      ],
      details: "Open floor plan with high ceilings and modern finishes.",
      features: ["2 bedrooms", "2 bathrooms", "Balcony", "City view"],
      categories: ["Properties"]
    },
    {
      title: "Luxury SUV",
      description: "A top-of-the-line SUV with all the bells and whistles.",
      price: 80000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?luxurysuv1",
        "https://source.unsplash.com/random/600x800/?luxurysuv2",
        "https://source.unsplash.com/random/800x600/?luxurysuv3",
        "https://source.unsplash.com/random/600x800/?luxurysuv4",
        "https://source.unsplash.com/random/800x600/?luxurysuv5",
        "https://source.unsplash.com/random/600x800/?luxurysuv6",
        "https://source.unsplash.com/random/800x600/?luxurysuv7",
        "https://source.unsplash.com/random/600x800/?luxurysuv8",
        "https://source.unsplash.com/random/800x600/?luxurysuv9"
      ],
      details: "Perfect condition with all the latest features.",
      features: ["7 seats", "Automatic transmission", "Sunroof", "Advanced safety features"],
      categories: ["Vehicles"]
    },
    {
      title: "Suburban House",
      description: "A spacious house in a quiet suburban neighborhood.",
      price: 400000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?suburbanhouse1",
        "https://source.unsplash.com/random/600x800/?suburbanhouse2",
        "https://source.unsplash.com/random/800x600/?suburbanhouse3",
        "https://source.unsplash.com/random/600x800/?suburbanhouse4",
        "https://source.unsplash.com/random/800x600/?suburbanhouse5",
        "https://source.unsplash.com/random/600x800/?suburbanhouse6",
        "https://source.unsplash.com/random/800x600/?suburbanhouse7",
        "https://source.unsplash.com/random/600x800/?suburbanhouse8",
        "https://source.unsplash.com/random/800x600/?suburbanhouse9"
      ],
      details: "Close to schools and parks.",
      features: ["4 bedrooms", "3 bathrooms", "Garage", "Backyard"],
      categories: ["Properties"]
    },
    {
      title: "Off-Road Truck",
      description: "A rugged truck built for off-road adventures.",
      price: 35000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?offroadtruck1",
        "https://source.unsplash.com/random/600x800/?offroadtruck2",
        "https://source.unsplash.com/random/800x600/?offroadtruck3",
        "https://source.unsplash.com/random/600x800/?offroadtruck4",
        "https://source.unsplash.com/random/800x600/?offroadtruck5",
        "https://source.unsplash.com/random/600x800/?offroadtruck6",
        "https://source.unsplash.com/random/800x600/?offroadtruck7",
        "https://source.unsplash.com/random/600x800/?offroadtruck8",
        "https://source.unsplash.com/random/800x600/?offroadtruck9"
      ],
      details: "In excellent condition with low mileage.",
      features: ["4WD", "Automatic transmission", "Air conditioning", "Tow package"],
      categories: ["Vehicles"]
    },
    {
      title: "Lakefront Cabin",
      description: "A charming cabin with direct access to the lake.",
      price: 500000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?lakefrontcabin1",
        "https://source.unsplash.com/random/600x800/?lakefrontcabin2",
        "https://source.unsplash.com/random/800x600/?lakefrontcabin3",
        "https://source.unsplash.com/random/600x800/?lakefrontcabin4",
        "https://source.unsplash.com/random/800x600/?lakefrontcabin5",
        "https://source.unsplash.com/random/600x800/?lakefrontcabin6",
        "https://source.unsplash.com/random/800x600/?lakefrontcabin7",
        "https://source.unsplash.com/random/600x800/?lakefrontcabin8",
        "https://source.unsplash.com/random/800x600/?lakefrontcabin9"
      ],
      details: "Ideal for fishing and water sports.",
      features: ["3 bedrooms", "2 bathrooms", "Dock", "Fireplace"],
      categories: ["Properties"]
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
      details: "Great fuel economy and low emissions.",
      features: ["5 seats", "Automatic transmission", "Bluetooth", "Air conditioning"],
      categories: ["Vehicles"]
    },
    {
      title: "Penthouse Suite",
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
      details: "Located in the heart of the city with private elevator access.",
      features: ["3 bedrooms", "3 bathrooms", "Private terrace", "City view"],
      categories: ["Properties"]
    },
    {
      title: "Convertible Coupe",
      description: "A stylish convertible coupe with a powerful engine.",
      price: 60000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?convertiblecoupe1",
        "https://source.unsplash.com/random/600x800/?convertiblecoupe2",
        "https://source.unsplash.com/random/800x600/?convertiblecoupe3",
        "https://source.unsplash.com/random/600x800/?convertiblecoupe4",
        "https://source.unsplash.com/random/800x600/?convertiblecoupe5",
        "https://source.unsplash.com/random/600x800/?convertiblecoupe6",
        "https://source.unsplash.com/random/800x600/?convertiblecoupe7",
        "https://source.unsplash.com/random/600x800/?convertiblecoupe8",
        "https://source.unsplash.com/random/800x600/?convertiblecoupe9"
      ],
      details: "Low mileage and in excellent condition.",
      features: ["2 seats", "Automatic transmission", "Bluetooth", "Leather seats"],
      categories: ["Vehicles"]
    },
    {
      title: "Countryside Farmhouse",
      description: "A traditional farmhouse with modern amenities.",
      price: 600000,
      pricingOption: "For Sale",
      images: [
        "https://source.unsplash.com/random/800x600/?farmhouse1",
        "https://source.unsplash.com/random/600x800/?farmhouse2",
        "https://source.unsplash.com/random/800x600/?farmhouse3",
        "https://source.unsplash.com/random/600x800/?farmhouse4",
        "https://source.unsplash.com/random/800x600/?farmhouse5",
        "https://source.unsplash.com/random/600x800/?farmhouse6",
        "https://source.unsplash.com/random/800x600/?farmhouse7",
        "https://source.unsplash.com/random/600x800/?farmhouse8",
        "https://source.unsplash.com/random/800x600/?farmhouse9"
      ],
      details: "Located on a large plot of land with stunning views.",
      features: ["5 bedrooms", "4 bathrooms", "Barn", "Garden"],
      categories: ["Properties"]
    }
  ];
  
  export default ads;
  