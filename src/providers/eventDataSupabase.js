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

// Function to add a relation between user and event in the 'event_user' table
export const addEventUserRelation = async (userId, eventId) => {
  try {
    // Insert the user_id and event_id into the 'event_user' table
    const { data, error } = await supabase
      .from('event_user')
      .insert([{
        user_id: userId,
        event_id: eventId
      }]);

    // Check for errors
    if (error) {
      throw error;
    }

    // Log success and return inserted data
    console.log('User-event relation inserted:', data);
    return data;
  } catch (error) {
    console.error('Error inserting user-event relation:', error.message);
    return null;
  }
};

// Function to fetch all events the user has RSVP'd to
export const fetchRSVPedEvents = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('event_user')
      .select('event_id')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    // Extracting just the event IDs
    const eventIds = data.map((relation) => relation.event_id);
    return eventIds;
  } catch (error) {
    console.error('Error fetching RSVP events:', error.message);
    return [];
  }
};

// Function to remove the RSVP (delete entry) for a user from an event
export const removeEventUserRelation = async (userId, eventId) => {
  try {
    const { data, error } = await supabase
      .from('event_user')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (error) {
      throw error;
    }

    console.log('Un-RSVP successful:', data);
    return data;
  } catch (error) {
    console.error('Error removing RSVP:', error.message);
    return null;
  }
};


export const fetchRSVPCounts = async () => {
  try {
    const { data, error } = await supabase
      .from('event_rsvp_counts')  // Fetching from the view
      .select('*');

    if (error) {
      throw error;
    }

    return data;  // This will return an array with event details and RSVP counts
  } catch (error) {
    console.error('Error fetching RSVP count:', error.message);
    return [];
  }
};


export const fetchUserIdsByEvent = async (eventId) => {
  try {
    const { data, error } = await supabase
      .from('event_user')  // Replace with the actual table for attendees
      .select('user_id')
      .eq('event_id', eventId);

    if (error) {
      throw error;
    }

    return data.map(item => item.user_id); // Return an array of user IDs
  } catch (error) {
    console.error('Error fetching user IDs:', error.message);
    return [];
  }
};

export const fetchUserDetails = async (userIds) => {
  try {
    const { data, error } = await supabase
      .from('profiles')  // Replace with your actual users table
      .select('*')
      .in('id', userIds); // Assuming 'id' is the user ID column

    if (error) {
      throw error;
    }

    return data; // Return an array of user details
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    return [];
  }
};

// Function to add an email and message to the 'issues' table
export const addIssue = async (email, message) => {
  try {
    // Insert email and message into the 'issues' table
    const { data, error } = await supabase
      .from('issues')
      .insert([{
        email: email,
        message: message
      }]);

    // Check for errors
    if (error) {
      throw error;
    }

    // Log success and return inserted data
    console.log('Issue added:', data);
    return data;
  } catch (error) {
    console.error('Error adding issue:', error.message);
    return null;
  }
};

// Function to fetch all issues in chronological order
export const fetchAllIssues = async () => {
  try {
    // Fetch all rows from the 'issues' table, ordered by 'created_at' in ascending order
    const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('created_at', { ascending: true }); // Change to false for descending order (newest first)

    // Check for errors
    if (error) {
      throw error;
    }

    // Log and return the fetched data
    console.log('Fetched issues:', data);
    return data;
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    return [];
  }
};
