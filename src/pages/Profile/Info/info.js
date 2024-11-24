import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";
import UserDashboard from "../../../components/User Dashboard/userDashboard";
import supabase from "../../../config/supabaseClient";
import "./info.css";

function Info() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch user info on component load
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      if (session?.user) {
        setUserId(session.user.id);

        // Fetch additional user info from the database
        const { data, error } = await supabase
          .from("users") // Replace "users" with your actual table name
          .select("name, email, phone, address")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        }
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleUpdate = async () => {
    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    const { data, error } = await supabase
      .from("users") // Replace "users" with your actual table name
      .update({
        name,
        email,
        phone,
        address,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user data:", error);
    } else {
      alert("Information updated successfully!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="account_information">
        <UserDashboard />
        
        <div className="info-container">
          <div className="info-header">
            <h1>Account information</h1>
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder={name || "Enter your full name"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group input-row">
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder={email || "Enter your email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="phone">Số điện thoại:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                placeholder={phone || "Enter your phone number"}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder={address || "Enter your address"}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="button" className="submit-btn" onClick={handleUpdate}>
            THAY ĐỔI
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Info;
