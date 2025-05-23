import { create } from 'zustand';

type GoToMediaType = 'photos' | 'reorder' | 'videos' | 'attachments' | 'none';
interface MediaStore {
  goToMediaType: GoToMediaType;
  setMediaAction: (action: GoToMediaType) => void;
}

 const useUploadMediaStore = create<MediaStore>((set) => ({
  goToMediaType: 'none',
  setMediaAction: (action) => set({ goToMediaType: action }),
}));

// Definition of resetMediaStates
export const resetMediaStates = () => {
  useUploadMediaStore.getState().setMediaAction('none');
};

export default useUploadMediaStore;

