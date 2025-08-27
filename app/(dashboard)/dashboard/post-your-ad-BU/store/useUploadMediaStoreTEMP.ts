import { create } from 'zustand';

type MediaAction = 'photos' | 'reorder' | 'videos' | 'attachments' | 'none';
interface MediaStore {
  mediaAction: MediaAction;
  setMediaAction: (action: MediaAction) => void;
}

const useUploadMediaStore = create<MediaStore>((set) => ({
  mediaAction: 'none',
  setMediaAction: (action) => set({ mediaAction: action }),
}));;

export default useUploadMediaStore;
