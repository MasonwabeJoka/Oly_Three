
'use server'
import { getUser } from '../actions/getUser';


export const getCurrentUserId = async () =>  {
  try {
    const user = await getUser();
    return user.id;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}


