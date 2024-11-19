import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        // Set permissions and file types for this FileRoute

        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
         
        }),

    // Takes a 4 2mb images and/or 1 256mb video
    mediaPost: f({
        image: { maxFileSize: "4MB", maxFileCount: 1},
      
    })

        .onUploadComplete((data) => console.log("file")),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;