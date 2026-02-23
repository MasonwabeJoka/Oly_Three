import {create} from 'zustand';

type State = {
    isMoreInfo: boolean;
    setIsMoreInfo: (value: boolean) => void;
}

const useFeatureInfo = create<State>((set) => ({
    isMoreInfo: false,
    setIsMoreInfo: (value: boolean) => set({isMoreInfo: value}),
   
}))

export default useFeatureInfo 