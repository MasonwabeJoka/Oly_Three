import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const numberOfFiles = 20;
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: numberOfFiles } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // Authentication removed - allowing all uploads

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { uploadedBy: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user:", metadata.uploadedBy);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.uploadedBy };
    }),


  videoUploader: f({ video: { maxFileSize: "2GB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // Authentication removed - allowing all uploads

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { uploadedBy: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user:", metadata.uploadedBy);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.uploadedBy };
    }),


  attachmentUploader: f({ pdf : { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
       // This code runs on your server before upload
       // Authentication removed - allowing all uploads

       // Whatever is returned here is accessible in onUploadComplete as `metadata`
       return { uploadedBy: "anonymous" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user:", metadata.uploadedBy);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.uploadedBy };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;