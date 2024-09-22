// Import necessary library
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

// Function to post event data to the Supabase database
export const postEventData = async (eventData) => {
  try {
    const { subject, subcategories, severity, message, notification_methods, eventDate } = eventData;

    // Insert event data into the 'broadcasts' table
    const { data, error } = await supabase
      .from('events')
      .insert([{
        subject: subject,
        subcategories: subcategories,  // Should be an array
        severity: severity,
        message: message,
        notification_methods: notification_methods,  // Should be an array
        eventdate: eventDate  // Date in 'YYYY-MM-DD' format
      }]);

    // Check for errors
    if (error) {
      throw error;
    }

    // Log success and return inserted data
    console.log('Event data inserted:', data);
    return data;
  } catch (error) {
    console.error('Error inserting event data:', error.message);
    return null;
  }
};


// Function to fetch all event data from the Supabase database
export const fetchAllEvents = async () => {
  try {
    // Fetch all rows from the 'events' table
    const { data, error } = await supabase
      .from('events')
      .select('*');  // Fetches all columns

    // Check for errors
    if (error) {
      throw error;
    }

    // Log and return the fetched data
    console.log('Fetched events:', data);
    return data;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    return [];
  }
};
