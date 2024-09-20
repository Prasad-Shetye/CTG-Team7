
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

export const signInWithPassword = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signUp = async (email, password, firstname, lastname) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstname,
        last_name: lastname,
      },
    },
  });
};

export const insertProfile = async (userId, email, fullName, type) => {
  return await supabase.from("profiles").insert([
    {
      id: userId,
      email: email,
      full_name: fullName,
      type: type,
    },
  ]);
};

export const getSession = () => {
    const userSessionData = localStorage.getItem("userSessionData");
    if (userSessionData) {
      return JSON.parse(userSessionData);
    }
    return null;
  };
  
export const resetPasswordForEmail = async (email) => {
  return await supabase.auth.resetPasswordForEmail(email);
};
