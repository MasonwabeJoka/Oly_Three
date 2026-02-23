import {create} from 'zustand';

type State = {
    isDashboard: boolean;
    setIsDashboard: (value: boolean) => void;
}

const useIsDashboardStore = create<State>((set) => ({
    isDashboard: true,
    setIsDashboard: (value: boolean) => set({isDashboard: value})
}))

export default useIsDashboardStore