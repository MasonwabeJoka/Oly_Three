'use server'
import { redirect } from 'next/navigation';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AddProductAction = async(formData: FormData) => {
    await wait(2000); // 2 second delay to test pending state
    console.log(formData)
    redirect('/oly-shops/dashboard/products');
}


export const toggleProductAvailability = async (id: string, availableForPurchase: boolean) => {
  // Mock implementation
  console.log(`Toggling product ${id} availability to ${availableForPurchase}`);
};

export const deleteProduct = async (id: string) => {
  // Mock implementation
  console.log(`Deleting product ${id}`);
};