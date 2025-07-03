import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { rememberMe, setRememberMe, showPassword, setShowPassword, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    // Allow anyone to log in without checking credentials
    const token = 'mock_token';

    login(token, { email: data.email });

    const toastEl = document.getElementById('loginToast');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }

    navigate('/');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow rounded overflow-hidden bg-white" style={{ maxWidth: '900px', width: '100%' }}>
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0">
          <img
            src="https://static.wixstatic.com/media/88d39f_80645d58ead343a590b0fe7ef6df6b89~mv2.gif"
            alt="eCommerce Illustration"
            className="img-fluid w-100"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6 p-5">
          <h3 className="mb-4 text-center fw-bold">Login to Your Store</h3>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 3, message: 'Min 3 characters' },
                  })}
                />
                <span className="input-group-text bg-white">
                  <i
                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} cursor-pointer`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <div className="invalid-feedback d-block">{errors.password.message}</div>
              )}
            </div>

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

            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
