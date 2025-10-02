import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IsAuctionProps {
  isAuction: boolean;
  setIsAuction: (value: boolean) => void;
}

export const useIsAuctionStore = create<IsAuctionProps>()(
  persist(
    (set) => ({
      isAuction: false,
      setIsAuction: (value: boolean) => set({ isAuction: value }),
    }),
    {
      name: 'auction-state',
    }
  )
)
