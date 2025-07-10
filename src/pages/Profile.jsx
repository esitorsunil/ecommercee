import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../Redux/profileSlice';
import { toggleEditMode, resetEditMode } from '../Redux/editmodeSlice';

const Profile = () => {
 const dispatch = useDispatch();
const toastRef = useRef();

const { register, handleSubmit, reset, formState: { errors } } = useForm();

const authToken = useSelector((state) => state.auth.authToken);
const user = useSelector((state) => state.auth.user); // ✅ ADDED
const isAuthenticated = !!authToken;

const editMode = useSelector((state) => state.editMode.value);
const profiles = useSelector((state) => state.profile.profiles);
const profile = user && user.email && profiles[user.email] ? profiles[user.email] : null;
const isLoading = useSelector((state) => state.auth.isLoading);

useEffect(() => {
  if (user?.email && profiles[user.email]) {
    reset(profiles[user.email]);
  }
}, [user, profiles, reset]);

  const showToast = () => {
    const toast = new window.bootstrap.Toast(toastRef.current);
    toast.show();
  };

 
  const onSubmit = (data) => {
    if (user?.email) {
      dispatch(setProfile({ email: user.email, data }));
      showToast();
      dispatch(resetEditMode());
    }
  };

  const handleEditToggle = () => {
    reset(profile); // reset to last saved profile
    dispatch(toggleEditMode());
  };

  if (isLoading) {
  return <div className="text-center py-5">Loading profile...</div>;
}

  return (
    
    <div className="container py-5">
      <div className="d-flex justify-content-center">
        <div className="bg-white shadow-lg rounded p-4 w-100" style={{ maxWidth: '600px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Personal Information</h2>
            {isAuthenticated && (
              <button className="btn btn-primary" type="button" onClick={handleEditToggle}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            )}
          </div>

          {!isAuthenticated && (
            <div className="alert alert-warning">
              You must be logged in to edit your profile.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                className={`form-control ${editMode && errors.firstName ? 'is-invalid' : ''}`}
                {...register('firstName', { required: 'First name is required' })}
                disabled={!editMode}
              />
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                {...register('lastName', { required: 'Last name is required' })}
                disabled={!editMode}
              />
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Your Gender</label>
              <select
                id="gender"
                className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                {...register('gender', { required: 'Please select your gender' })}
                disabled={!editMode}
              >
                <option value="">Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <div className="invalid-feedback">{errors.gender.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                id="mobile"
                type="tel"
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit mobile number',
                  },
                })}
                placeholder="Enter 10-digit number"
                disabled={!editMode}
              />
              {errors.mobile && (
                <div className="invalid-feedback">{errors.mobile.message}</div>
              )}
              <div className="form-text">Enter your 10-digit mobile number.</div>
            </div>

            {editMode && (
              <button type="submit" className="btn btn-primary w-100">
                Save
              </button>
            )}
          </form>

          <section className="mt-5">
            <h3>Frequently Asked Questions</h3>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq1Heading">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                    aria-expanded="false"
                    aria-controls="faq1"
                  >
                    How do I change my password?
                  </button>
                </h2>
                <div
                  id="faq1"
                  className="accordion-collapse collapse"
                  aria-labelledby="faq1Heading"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    You can change your password from the settings page under "Account Security."
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="faq2Heading">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                    aria-expanded="false"
                    aria-controls="faq2"
                  >
                    How do I update my mobile number?
                  </button>
                </h2>
                <div
                  id="faq2"
                  className="accordion-collapse collapse"
                  aria-labelledby="faq2Heading"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Update your mobile number in the personal information form above and click Save.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="text-center mt-5">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
              alt="Profile Footer"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      <div
        className="position-fixed"
        style={{
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
        }}
      >
        <div
          ref={toastRef}
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              Profile saved successfully!
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
