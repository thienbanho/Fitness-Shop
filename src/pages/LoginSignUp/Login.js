import React, { useState } from "react";
import Logo from "../../assets/Logo_grey.png";
import supabase from "../../config/supabaseClient";
import "./Login.css";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const toggleForm = (form) => {
    setIsLoginForm(form === "login");
    setError(''); // Clear any previous error
    setFormData({ fullName: '', email: '', dateOfBirth: '', phoneNumber: '', password: '' }); // Clear form data
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          dob: dob,
          gender: selectedGender,
        },
      },
    });

    if (error) {
      alert(`Error during sign up: ${error.message}`);
    } else {
      alert("Sign up successful! Please check your email to verify your account.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Error during login: ${error.message}`);
    } else {
      alert("Login successful!");
      console.log(data);
    }
  };

  const handleGoogleLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (user) {
      // Kiểm tra xem có email hay không trước khi sử dụng
      if (user.email) {
        console.log("User email:", user.email);
        handleUserMetadata(user);
      } else {
        console.error("User does not have an email associated.");
      }
    } else {
      console.error("User object is undefined or null.");
    }
  };

  const handleFacebookLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http://localhost:3000", 
      },
    });

    if (error) {
      console.error("Error during Facebook login:", error.message);
      alert(`Error during Facebook login: ${error.message}`);
      return;
    }
  
    if (user) {
      // Kiểm tra xem có email hay không trước khi sử dụng
      if (user.email) {
        console.log("User email:", user.email);
        handleUserMetadata(user);
      } else {
        console.error("User does not have an email associated.");
      }
    } else {
      console.error("User object is undefined or null.");
    }
  };
  
  const handleUserMetadata = async (user) => {
    // data non-exist --> init
    const { data, error } = await supabase
      .from("users")
      .upsert({
        email: user.email,
        full_name: user.user_metadata.full_name || user.email, // use email to replace name if no exist
      });
  
    if (error) {
      console.log("Error saving metadata", error);
    } else {
      console.log("User metadata saved:", data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="brand-section">
          <img src={Logo} alt="The Fitness Shop" className="brand-logo" />
          <h2 className="brand-tagline">
            Your Fitness Hub – Everything You Need to Train, Fuel, and Succeed!
          </h2>
        </div>

        <div className="form-container">
          {isLoginForm ? (
            <form className="active-form" onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="error-text">{error}</p>}

              <button 
                type="button" 
                className="submit-btn login-btn" 
                onClick={handleLogin}
              >
                Login
              </button>

              <div className="divider">
                <div className="line"></div>
                <span className="or-text">OR</span>
                <div className="line"></div>
              </div>

              <button type="button" onClick={handleFacebookLogin} className="social-btn facebook-btn">
                Facebook
              </button>
              <button type="button" onClick={handleGoogleLogin} className="social-btn google-btn">
                Google
              </button>

              <div className="toggle-link">
                <a onClick={() => toggleForm("register")}>
                  Don't have an account yet?
                </a>
              </div>
            </form>
          ) : (
            // **Form Sign Up**
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="gender-options">
                <div
                  className={`gender-option ${selectedGender === "male" ? "selected" : ""}`}
                  onClick={() => selectGender("male")}
                >
                  Male
                </div>
                <div
                  className={`gender-option ${selectedGender === "female" ? "selected" : ""}`}
                  onClick={() => selectGender("female")}
                >
                  Female
                </div>
                <div
                  className={`gender-option ${selectedGender === "customize" ? "selected" : ""}`}
                  onClick={() => selectGender("customize")}
                >
                  Customize
                </div>
              </div>

              {error && <p className="error-text">{error}</p>}

              <button 
                type="button" 
                className="submit-btn register-btn" 
                onClick={handleSignUp}
              >
                Register
              </button>

              <div className="toggle-link">
                <a onClick={() => toggleForm("login")}>
                  Already have an account?
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
