import { create } from 'zustand';

interface ReportStoreProps {
   report: boolean;
   setReport: (value: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
}

const useReportStore = create<ReportStoreProps>((set) => ({
 report: false,
 setReport: (value: boolean) => set({report: value }),
  openModal: () => set({report: true }),
  closeModal: () => set({report: false }),
}));

export default useReportStore;