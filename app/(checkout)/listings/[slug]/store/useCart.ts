import { Ad } from '@/sanityTemp/Types/Ad'
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'

export type CartItem = {
    ad: Ad
}

type CartState= {
    items: CartItem[];
    addItem: (ad: Ad) => void
    removeItem: (adId: string) => void
    clearCar: ()=> void // receive nothing and return nothing
}
// We will add items to the cart 
// Remove items
// Clear the cart
// Keep track of the current cart items
export const useCart = create<CartState>()(
    // the cart should persist when we reload the page
    // we will use the 'persist' middleware from Zustand
    // This will save the cart in local storage.
    persist(
        // this will take the set method, which will be used to update the state.
        (set)=> ({
            items: [], // empty default value 

            // ADD
            addItem: (ad) => set((state) => {
                return {items: [...state.items, {ad}]}
            }),
            // REMOVE
            removeItem: (id) => set((state)=> ({
                items: state.items.filter((item) => item.ad._id !== id)
            })),
            // CLEAR
            clearCar: () => set({items: []}),
        }), {
            name: "cart-storage", // what our state appears like in local storage
            storage: createJSONStorage(() => localStorage) // createJSONStorage is from zustand/middleware

        }
    )
)