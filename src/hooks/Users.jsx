import React, { useState, useEffect } from 'react';
import supabase from "../config/supabaseClient";

const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Thông tin từ bảng `auth.users`
  const [profile, setProfile] = useState(null); // Thông tin từ bảng `public.users`

  useEffect(() => {
    // Lấy thông tin user từ `auth.users`
    const fetchAuthUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching authenticated user:", error.message);
        return;
      }
      setUser(user); // Lưu thông tin user từ `auth.users`
      if (user) {
        fetchPublicUser(user.email); // Lấy thông tin từ bảng `public.users` dựa trên email
      }
    };

    // Lấy thông tin từ bảng `public.users`
    const fetchPublicUser = async (email) => {
      const { data, error } = await supabase
        .from('users') // Bảng `public.users`
        .select('*')
        .eq('email', email) // Khớp email với email từ `auth.users`
        .single();

      if (error) {
        console.error("Error fetching public user:", error.message);
      } else {
        setProfile(data); // Lưu thông tin từ bảng `public.users`
      }
    };

    fetchAuthUser();
  }, []);

  return (
    <UsersContext.Provider value={{ user, profile }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUser = () => React.useContext(UsersContext);
