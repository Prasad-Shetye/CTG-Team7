// Import necessary library
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

// Function to fetch role for a given user ID
export const fetchUserRole = async (userId) => {
  console.log(userId)
  try {
    const { data: userData, error: userDataError } = await supabase
      .from('profiles')
      .select('type')
      .eq('id', userId);

    if (userDataError) {
      throw userDataError;
    }
    
    console.log(userData);

    return userData[0].type;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return {};
  }
};

// Function to fetch role for a given user ID
export const fetchUserName = async (userId) => {
  console.log(userId)
  try {
    const { data: userData, error: userDataError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId);

    if (userDataError) {
      throw userDataError;
    }
    
    console.log(userData);

    return userData[0].full_name;
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return {};
  }
};