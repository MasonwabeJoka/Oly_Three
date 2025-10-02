import {create} from 'zustand';

type State = {
    isHeartHovered: boolean;
    setIsHeartHovered: (value: boolean) => void;
    isHeartClicked: boolean;
    setIsHeartClicked: (value: boolean) => void;
 
}

const useLikeButtonStore = create<State>((set) => ({
    isHeartHovered: false,
    setIsHeartHovered: (value: boolean) => set({isHeartHovered: value}),
    isHeartClicked: false,
    setIsHeartClicked: (value: boolean) => set({isHeartClicked: value})
}))

export default useLikeButtonStore