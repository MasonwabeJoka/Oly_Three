import { create } from 'zustand';



interface UploadFilesState {
  uploadedImages: string[];
  setUploadedImages: (files: string[]) => void;
  uploadedVideos: string[];
  setUploadedVideos: (files: string[]) => void;
  uploadedAttachments: string[];
  setUploadedAttachments: (files: string[]) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  addVideo: (video: string) => void;
  removeVideo: (Video: string) => void;
  addAttachment: (attachment: string) => void;
  removeAttachment: (attachment: string) => void;
  reorderFiles: (newOrder: string[]) => void; // New action for reordering
}

const useUploadFiles = create<UploadFilesState>((set) => ({
  uploadedImages: [],
  setUploadedImages: (files) => set({ uploadedImages: files }),
  uploadedVideos: [],
  setUploadedVideos: (files) => set({ uploadedVideos: files }),
  uploadedAttachments: [],
  setUploadedAttachments: (files) => set({ uploadedAttachments: files }),
  addImage: (image) =>
    set((state) => ({ uploadedImages: [...state.uploadedImages, image] })),
  removeImage: (image) =>
    set((state) => ({
      uploadedImages: state.uploadedImages.filter((img) => img !== image),
    })),
    addVideo: (video) =>
    set((state) => ({ uploadedVideos: [...state.uploadedVideos, video] })),
    removeVideo: (video) =>
    set((state) => ({
      uploadedVideos: state.uploadedVideos.filter((vid) => vid !== video),
    })),
    addAttachment: (attachment) =>
      set((state) => ({ uploadedAttachments: [...state.uploadedAttachments, attachment] })),
    removeAttachment: (attachment) =>
      set((state) => ({
        uploadedAttachments: state.uploadedAttachments.filter((attach) => attach !== attachment),
      })),
  reorderFiles: (newOrder) => set({ uploadedImages: newOrder }), // New action
}));

export default useUploadFiles;