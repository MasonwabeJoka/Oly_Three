    import {create} from 'zustand';

    type State = {
        isFeedOpen: boolean;
        setIsFeedOpen: (value: boolean) => void;
    }

    const useFeedStore = create<State>((set) => ({
        isFeedOpen: false,
        setIsFeedOpen: (value: boolean) => set({isFeedOpen: false}),
        // setIsFeedOpen: (value: boolean) => set({isFeedOpen: value})
    }))

    export default useFeedStore 