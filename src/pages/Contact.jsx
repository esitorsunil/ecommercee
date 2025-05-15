import { useForm } from 'react-hook-form';
import { 
  BiEnvelope,
  BiPhone,
  BiMap,
  BiTime,
  BiMessageAltDetail,
  BiUser,
  BiSend
} from 'react-icons/bi';

const Contact = () => {

const {
  register,
  handleSubmit,
  formState: { errors },
  reset
} = useForm({
  mode: 'onChange', 
});
const onSubmit = (data) => {
  console.log('Form Submitted:', data);
  alert('Application submitted successfully!');
  reset();
};
  return (
    
    <div className="bg-white text-dark py-5">
      <div className="container">
        <header className="text-center mb-5">
          <p className="lead">We'd love to hear from you</p>
          <div className="border-bottom mx-auto" style={{ width: '100px'}}></div>
        </header>

        <div className="row g-5">

          <div className="col-lg-5">
            <div className="pe-lg-4">
              <h2 className="h3 fw-bold mb-4 d-flex align-items-center">
                <BiMessageAltDetail className="me-2 text-primary" />
                Get in Touch
              </h2>
              
              <div className="mb-4">
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <BiEnvelope className="fs-4 text-primary" />
                    </div>
                  </div>
                  <div className="ms-3">
                    <h3 className="h6 fw-bold mb-1">Email Us</h3>
                    <p className="mb-0">support@shopcart.com</p>
                    <p className="mb-0">sales@shopcart.com</p>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <BiPhone className="fs-4 text-primary" />
                    </div>
                  </div>
                  <div className="ms-3">
                    <h3 className="h6 fw-bold mb-1">Call Us</h3>
                    <p className="mb-0">+91 (444) 123-4567</p>
                    <p className="mb-0">Mon-Fri: 9am-6pm IST</p>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <BiMap className="fs-4 text-primary" />
                    </div>
                  </div>
                  <div className="ms-3">
                    <h3 className="h6 fw-bold mb-1">Visit Us</h3>
                    <p className="mb-0">123 FLipkart</p>
                    <p className="mb-0">Bangalore, Financial district</p>
                  </div>
                </div>
              </div>

              <div className="border-top pt-4 mt-3">
                <h3 className="h5 fw-bold mb-3 d-flex align-items-center">
                  <BiTime className="me-2 text-primary" />
                  Business Hours
                </h3>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span>Monday - Friday</span>
                    <span className="fw-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between py-2 border-bottom">
                    <span>Saturday</span>
                    <span className="fw-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between py-2">
                    <span>Sunday</span>
                    <span className="fw-medium">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-lg-7">
            <h2 className="h3 fw-bold mb-4 d-flex align-items-center">
              <BiMap className="me-2 text-primary" />
              Our Location
            </h2>
            <div className="ratio ratio-16x9 bg-light rounded overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.014801171667!2d77.6972783148211!3d12.93522359087937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13f6f6e1a7f7%3A0x1e0b1b1e1e0b1b1e!2sFlipkart%20Internet%20Private%20Limited%2C%20Embassy%20Tech%20Village%2C%20Bengaluru%2C%20Karnataka%20560103!5e0!3m2!1sen!2sin!4v1689876423580!5m2!1sen!2sin"
  width="100%"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-top">
          <h2 className="h3 fw-bold mb-4 text-center">Careers – Explore Jobs</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <h3 className="h4 fw-bold mb-4">Send Us a Message</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
  <div className="row g-3">

    <div className="col-md-6">
      <label htmlFor="name" className="form-label d-flex align-items-center">
        <BiUser className="me-2 text-primary" /> Full Name
      </label>
      <input
        type="text"
        id="name"
        className="form-control"
        placeholder="Your name"
        {...register('name', { required: 'Full name is required' })}
      />
      {errors.name && <div className="text-danger mt-1">{errors.name.message}</div>}
    </div>

    <div className="col-md-6">
      <label htmlFor="email" className="form-label d-flex align-items-center">
        <BiEnvelope className="me-2 text-primary" /> Email Address
      </label>
      <input
        type="email"
        id="email"
        className="form-control"
        placeholder="Your email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Enter a valid email',
          },
        })}
      />
      {errors.email && <div className="text-danger mt-1">{errors.email.message}</div>}
    </div>

    <div className="col-12">
      <label htmlFor="subject" className="form-label">Subject</label>
      <input
        type="text"
        id="subject"
        className="form-control"
        placeholder="What role are you interested in?"
        {...register('subject', { required: 'Subject is required' })}
      />
      {errors.subject && <div className="text-danger mt-1">{errors.subject.message}</div>}
    </div>

    <div className="col-12">
      <label htmlFor="message" className="form-label">Message</label>
      <textarea
        id="message"
        rows="5"
        className="form-control"
        placeholder="Tell us about yourself..."
        {...register('message', { required: 'Message is required' })}
      ></textarea>
      {errors.message && <div className="text-danger mt-1">{errors.message.message}</div>}
    </div>

    <div className="col-12">
      <button type="submit" className="btn btn-primary px-4 py-2 d-flex align-items-center">
        <BiSend className="me-2" /> Send Application
      </button>
    </div>
  </div>
</form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
