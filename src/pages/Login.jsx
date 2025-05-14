import React from 'react';
import { useForm } from 'react-hook-form';
import users from '../data/data.json';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { rememberMe, setRememberMe, showPassword, setShowPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow w-100" style={{ maxWidth: '400px' }}>
        <h3 className="mb-4 text-center">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/,
                    message: 'Must include uppercase, lowercase, number, and symbol',
                  },
                })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password.message}</div>
            )}
          </div>

          {/* Remember Me */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-dark w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
