import {create} from 'zustand';

type State = {
    currentSlideIndex: number;
    setCurrentSlideIndex: (value: number) => void;
}

const useCurrentSlideIndex = create<State>((set) => ({
    currentSlideIndex: 0,
    setCurrentSlideIndex: (value: number) => set({currentSlideIndex: value}),
   
}))

export default useCurrentSlideIndex 