import React, { useState } from "react";
import Logo from "../../assets/Logo_grey.png";
import supabase from "../../config/supabaseClient"; 
import "./Login.css";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: ''
  });

  const toggleForm = (form) => {
    setIsLoginForm(form === "login");
    setError(''); // Clear any previous error
    setFormData({ fullName: '', email: '', dateOfBirth: '', phoneNumber: '', password: '' }); // Clear form data
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    const { email, password } = formData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    }, {
      data: {
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        phone_number: formData.phoneNumber,
        gender: selectedGender
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
      alert("Signup successful! Please check your email to verify your account.");
    }
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
      alert("Login successful!");
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
            <form className="active-form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email"
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

              <button type="button" className="social-btn facebook-btn">
                Facebook
              </button>
              <button type="button" className="social-btn google-btn">
                Google
              </button>

              <div className="toggle-link">
                <a onClick={() => toggleForm("register")}>
                  Don't have an account yet?
                </a>
              </div>
            </form>
          ) : (
            <form>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Full name"
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

              <div className="divider">
                <div className="line"></div>
                <span className="or-text">OR</span>
                <div className="line"></div>
              </div>

              <button type="button" className="social-btn facebook-btn">
                Facebook
              </button>
              <button type="button" className="social-btn google-btn">
                Google
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
