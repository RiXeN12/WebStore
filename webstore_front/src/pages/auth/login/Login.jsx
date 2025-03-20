import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../../hooks/useActions";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const navigate = useNavigate();
    const { isAuth } = useSelector((state) => state.auth);
    const { signIn } = useActions();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
        password: Yup.string().min(6, "Повинно бути 6 і більше символів").required("Обов'язкове поле"),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            const response = await signIn({ ...values, rememberMe });
            if (!response.success) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                navigate("/");
            }
        },
    });

    return (
        <div className="login-container" style={{
            background: 'linear-gradient(135deg, #f3e7fd, #e6d4fc)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif"
        }}>
            <div className="login-box" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(128, 72, 178, 0.2)',
                padding: '40px',
                width: '450px'
            }}>
                <form onSubmit={formik.handleSubmit} className="form d-flex flex-column gap-3 text-center">
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
                        Login
                    </h1>
                    <div className="form-group" style={{ width: '100%' }}>
                        <label style={{ color: '#6A3BAD', marginBottom: '10px' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                            style={{
                                borderColor: '#8A4FFF',
                                boxShadow: 'none',
                                backgroundColor: '#f3e7fd'
                            }}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="form-group" style={{ width: '100%' }}>
                        <label style={{ color: '#6A3BAD', marginBottom: '10px' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                            style={{
                                borderColor: '#8A4FFF',
                                boxShadow: 'none',
                                backgroundColor: '#f3e7fd'
                            }}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        )}
                    </div>
                    <div className="form-check" style={{ width: '100%', textAlign: 'left' }}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ accentColor: '#8A4FFF' }}
                        />
                        <label className="form-check-label" htmlFor="rememberMe" style={{ color: '#6A3BAD' }}>
                            Remember Me
                        </label>
                    </div>
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
                        Sign In
                    </button>
                    <div className="register-link" style={{ marginTop: '15px' }}>
                        <Link
                            to="/register"
                            style={{
                                color: '#6A3BAD',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
