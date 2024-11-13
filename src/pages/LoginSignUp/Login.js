import React, { useState } from "react";
import Logo from "../../assets/Logo_grey.png";
import supabase from "../../config/supabaseClient"; 
import "./Login.css";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [selectedGender, setSelectedGender] = useState(null);
  console.log(supabase);
  const toggleForm = (form) => {
    setIsLoginForm(form === "login");
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
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
                  type="text"
                  className="form-input"
                  placeholder="Email or phone number"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>

              <button type="submit" className="submit-btn login-btn">
                Login
              </button>

              <div className="divider">
                <div class="line"></div>
                <span class="or-text">OR</span>
                <div class="line"></div>
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
                  className="form-input"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  className="form-input"
                  placeholder="Date of birth"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  className="form-input"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="gender-options">
                <div
                  className={`gender-option ${
                    selectedGender === "male" ? "selected" : ""
                  }`}
                  onClick={() => selectGender("male")}
                >
                  Male
                </div>
                <div
                  className={`gender-option ${
                    selectedGender === "female" ? "selected" : ""
                  }`}
                  onClick={() => selectGender("female")}
                >
                  Female
                </div>
                <div
                  className={`gender-option ${
                    selectedGender === "customize" ? "selected" : ""
                  }`}
                  onClick={() => selectGender("customize")}
                >
                  Customize
                </div>
              </div>

              <button type="submit" className="submit-btn register-btn">
                Register
              </button>

              <div className="divider">
                <div class="line"></div>
                <span class="or-text">OR</span>
                <div class="line"></div>
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
