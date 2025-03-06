import ImageGallery from "@/components/ImageGallery";
import { galleryImages } from "@/data/galleryImages";

const TestPage = () => {
  return (
    // <div className="p-4 space-y-8">
    <div className="p-4 space-y-8" style={{ paddingRight: "500px" }}>
      {galleryImages.map((gallery) => (
        <div key={gallery.id} className="space-y-4">
          <h2 className="text-2xl font-bold">{gallery.title}</h2>
          <ImageGallery images={gallery.images} />
        </div>
      ))}
    </div>
  );
};

export default TestPage;
