import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);
  const { signUp } = useActions();

  const [formValues, setFormValues] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.userName) newErrors.userName = "Обов'язкове поле";
    if (!formValues.firstName) newErrors.firstName = "Обов'язкове поле";
    if (!formValues.lastName) newErrors.lastName = "Обов'язкове поле";
    if (!formValues.email) {
      newErrors.email = "Обов'язкове поле";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Некоректний емайл";
    }
    if (!formValues.password || formValues.password.length < 8) {
      newErrors.password = "Повинно бути 8 і більше символів";
    }
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await signUp(formValues);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
      <div className="register-container" style={{
        background: 'linear-gradient(135deg, #f3e7fd, #e6d4fc)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Montserrat', sans-serif",
        padding: '20px'
      }}>
        <div className="register-box" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(128, 72, 178, 0.2)',
          padding: '40px',
          width: '500px'
        }}>
          <form
              onSubmit={handleSubmit}
              className="form d-flex flex-column gap-3 text-center"
          >
            <div style={{
              display: 'flex',
              justifyContent: 'center',

            }}>
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L85 30V70L50 90L15 70V30L50 10Z" fill="#8A4FFF" />
                <path d="M50 50L15 30L50 10L85 30L50 50Z" fill="#B687FF" />
                <path d="M50 50V90L15 70V30L50 50Z" fill="#6A3BAD" />
              </svg>
            </div>
            <h1 style={{
              color: '#6A3BAD',
              fontWeight: 'bold',

            }}>
              Register
            </h1>
            {[
              { label: "User Name", name: "userName" },
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
            ].map(({ label, name, type = "text" }) => (
                <div key={name} style={{ width: '100%' }}>
                  <label style={{
                    color: '#6A3BAD',
                    marginBottom: '10px',
                    display: 'block',
                    textAlign: 'left'
                  }}>
                    {label}
                  </label>
                  <input
                      type={type}
                      name={name}
                      onChange={handleChange}
                      value={formValues[name]}
                      className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                      style={{
                        borderColor: '#8A4FFF',
                        boxShadow: 'none',
                        backgroundColor: '#f3e7fd'
                      }}
                  />
                  {errors[name] && (
                      <div
                          className="invalid-feedback"
                          style={{
                            display: 'block',
                            textAlign: 'left',
                            color: '#FF4D4D'
                          }}
                      >
                        {errors[name]}
                      </div>
                  )}
                </div>
            ))}
            <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#8A4FFF',
                  color: 'white',
                  borderRadius: '25px',
                  width: '100%',
                  padding: '10px',
                  transition: 'background-color 0.3s ease',
                  marginTop: '20px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#B687FF'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#8A4FFF'}
            >
              Sign Up
            </button>
            <div
                className="login-link"
                style={{
                  marginTop: '15px',
                  textAlign: 'center'
                }}
            >
              <Link
                  to="/login"
                  style={{
                    color: '#6A3BAD',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
              >
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;
