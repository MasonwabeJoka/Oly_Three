import { create } from 'zustand';

interface EditState {
  uploadPhotos: boolean;
  setUploadPhotos: (uploadPhotos: boolean) => void;
  reorderPhotos: boolean;
  setReorderPhotos: (reorderPhotos: boolean) => void;
  uploadVideos: boolean;
  setUploadVideos: (uploadVideos: boolean) => void;
  uploadAttachments: boolean;
  setUploadAttachments: (uploadAttachments: boolean) => void;
}

const useUploadMediaStore = create<EditState>((set) => ({
    uploadPhotos: false,
    setUploadPhotos: (uploadPhotos: boolean) => set({ uploadPhotos }),
    reorderPhotos: false,
    setReorderPhotos: (reorderPhotos: boolean) => set({ reorderPhotos }),
    uploadVideos: false,
    setUploadVideos: (uploadVideos: boolean) => set({ uploadVideos }),
    uploadAttachments: false,
    setUploadAttachments: (uploadAttachments: boolean) => set({ uploadAttachments }),
}));

export default useUploadMediaStore;
