import { create } from 'zustand';

type GoToMediaType = 'photos' | 'reorder' | 'videos' | 'attachments' | 'none';
interface MediaStore {
  goToMediaType: GoToMediaType;
  setMediaAction: (action: GoToMediaType) => void;
  setUploadPhotos: (photos: any[]) => void;
  setUploadVideos: (videos: any[]) => void;
  setUploadAttachments: (attachments: any[]) => void;
  setReorderPhotos: (photos: any[]) => void;
}

 const useUploadMediaStore = create<MediaStore>((set) => ({
  goToMediaType: 'none',
  setMediaAction: (action) => set({ goToMediaType: action }),
  setUploadPhotos: (photos) => {},
  setUploadVideos: (videos) => {},
  setUploadAttachments: (attachments) => {},
  setReorderPhotos: (photos) => {},
}));

// Definition of resetMediaStates
export const resetMediaStates = () => {
  useUploadMediaStore.getState().setMediaAction('none');
};

export default useUploadMediaStore;

