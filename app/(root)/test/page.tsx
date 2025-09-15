import ListingCard from "@/components/cards/ListingCard";
import Table from "@/components/table/Table";
import { columns } from "@/components/table/TableColumns";
import { payments } from "@/components/table/payments";
type CategoryType =
  | "property"
  | "vehicles"
  | "jobs"
  | "all"
  | "services"
  | "shops";

const Page = () => {
  const listings: Array<{
    category: CategoryType;
    listing: { id: string; status: string };
    index: number;
    cardType: "expanded" | "box";
    id: string;
    slug: string;
    imageUrls: string[];
    avatar?: string;
    title: string;
    description: string;
    postAge: string;
    price?: number;
    cardSize: "large" | "standard" | "small";
    isDashboard: boolean;
    isDeletable: boolean;
    suburb: string;
    city: string;
  }> = [
    {
      category: "property",
      listing: { id: "001", status: "active" },
      index: 0,
      cardType: "box",
      id: "001",
      slug: "apartment-sea-point",
      imageUrls: [
        "/houses/house.jpg",
        "/houses/house2.jpg",
        "/houses/house3.jpg",
      ],
      title: "Apartment in Sea Point",
      description: "Modern 2-bedroom apartment with balcony.",
      postAge: "3 days ago",
      price: 1200000,
      cardSize: "large",
      isDashboard: false,
      isDeletable: false,
      suburb: "Sea Point",
      city: "Cape Town",
    },
    {
      category: "vehicles",
      listing: { id: "002", status: "active" },
      index: 1,
      cardType: "box",
      id: "002",
      slug: "toyota-corolla-2021",
      imageUrls: ["/cars/cars.jpg", "/cars/cars_2.jpg"],
      title: "2021 Toyota Corolla",
      description: "Reliable sedan, low mileage.",
      postAge: "1 week ago",
      price: 250000,
      cardSize: "standard",
      isDashboard: false,
      isDeletable: true,
      suburb: "Sandton",
      city: "Johannesburg",
    },
    {
      category: "jobs",
      listing: { id: "003", status: "active" },
      index: 2,
      cardType: "box",
      id: "003",
      slug: "frontend-developer",
      imageUrls: [],
      title: "Frontend Developer",
      description: "Remote React/Next.js developer role.",
      postAge: "1 day ago",
      cardSize: "small",
      isDashboard: true,
      isDeletable: true,
      suburb: "Remote",
      city: "Global",
    },
    {
      category: "all",
      listing: {
        id: "000",
        status: "active",
      },
      index: 0,
      cardType: "box",
      id: "000",
      slug: "sample-generic-listing",
      imageUrls: [
        "/listing_images/portrait/1.jpg",
        "/listing_images/landscape/2.jpg",
        "/listing_images/landscape/3.jpg",
      ],
      title: "Sample Listing Sample Listing Sample Listing bample Listing",
      description:
        "This is a generic listing used for testing the 'all' category. This is a generic listing used for testing the 'all' category.This is a generic listing used for testing the 'all' category.",
      postAge: "Just now",
      price: 999,
      cardSize: "standard",
      isDashboard: false,
      isDeletable: false,
      avatar: "/profile_images/1.jpg",
      suburb: "Any Suburb",
      city: "Any City",
    },
    {
      category: "shops",
      listing: {
        id: "004",
        status: "active",
      },
      index: 0,
      cardType: "box",
      id: "004",
      slug: "sample-generic-listing",
      imageUrls: [
        "/listing_images/portrait/1.jpg",
        "/listing_images/landscape/2.jpg",
        "/listing_images/landscape/3.jpg",
      ],
      title: "Sample Listing Sample Listing Sample Listing bample Listing",
      description:
        "This is a generic listing used for testing the 'all' category. This is a generic listing used for testing the 'all' category.This is a generic listing used for testing the 'all' category.",
      postAge: "Just now",
      price: 999,
      cardSize: "standard",
      isDashboard: false,
      isDeletable: false,
      avatar: "/profile_images/1.jpg",
      suburb: "Any Suburb",
      city: "Any City",
    },
  ];



  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
      
      <Table columns={columns} data={payments} />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // alignItems: "center",
          gap: "20px",
        }}
      >
        {listings.map((listing) => (
          <div key={listing.id} style={{ marginTop: "200px" }}>
            <ListingCard
              category={listing.category}
              listing={listing.listing}
              index={listing.index}
              cardType={listing.cardType}
              id={listing.id}
              slug={listing.slug}
              imageUrls={listing.imageUrls}
              avatar={listing.avatar}
              title={listing.title}
              description={listing.description}
              postAge={listing.postAge}
              price={listing.price}
              cardSize={listing.cardSize}
              isDashboard={listing.isDashboard}
              isDeletable={listing.isDeletable}
              suburb={listing.suburb}
              city={listing.city}
            />
          </div>
        ))}
        {/* <ListingCard
        category="all"
        listing={{
          id: "123",
          title: "Modern Apartment in Cape Town",
          price: 1500000,
        }}
        index={1}
        cardType="box"
        id="123"
        slug="modern-apartment-cape-town"
        imageUrls={[
          "/listing_images/Portrait/1.jpg",
          "/listing_images/Landscape/1.jpg",
        ]}
        title="Modern Apartment in Cape Town"
        description="A spacious 2-bedroom apartment with sea views."
        descriptionLength={120}
        postAge="2 days ago"
        price={1500000}
        cardSize="large"
        aspectRatios={[16 / 9, 4 / 3]}
        width={400}
        height={300}
        isDashboard={true}
        isDeletable={true}
        checkedColour="#0f0"
        hoverColour="#f5f5f5"
        checkedHovered="#ccc"
        avatar="/profile_images/1.jpg"
        suburb="Sea Point"
        city="Cape Town"
      /> */}
        {/* <ListingCard
        category="property"
        listing={{
          id: "123",
          title: "Modern Apartment in Cape Town",
          price: 1500000,
        }}
        index={1}
        descriptionLength={120}
        cardSize="large"
        width={400}
        height={300}
        isDashboard={true}
        isDeletable={true}

      /> */}
      </div>
    </div>
  );
};

export default Page;
