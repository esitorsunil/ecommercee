import { 
  BiBullseye, 
  BiShieldAlt, 
  BiRocket, 
  BiCheckShield,
  BiLeaf,
  BiStar,
  BiLockAlt,
  BiHappyHeartEyes,
  BiPackage,
  BiRefresh,
  BiHeadphone
} from 'react-icons/bi';

const AboutUs = () => {
  return (
    <div className="bg-white text-dark min-vh-100 py-5">
      <div className="container">

        <header className="text-center mb-5">     
          <p className="lead">Your trusted shopping companion since 2018</p>
        </header>

<section className="row align-items-center mb-5 py-5">
  <div className="col-lg-6 mb-4 mb-lg-0">
    <div className="position-relative overflow-hidden rounded-4" style={{ height: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <img 
        src="https://i.pinimg.com/originals/ba/c0/a7/bac0a74d88800609c0600f7c578560a4.gif" 
        alt="Our Mission" 
        className="w-100 h-100 object-fit-cover"
        style={{ objectPosition: 'center' }}
      />
      
    </div>
  </div>
  <div className="col-lg-6 ps-lg-5">
    <div className="ps-lg-4">
      <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-3 py-2 rounded-pill d-inline-flex align-items-center">
        <BiBullseye className="me-2" />
        Our Promise
      </span>
      <p className="lead mb-4 text-muted">
        We're committed to transforming your online shopping experience through innovation, integrity, and impeccable service.
      </p>
      
      <div className="d-flex mb-4">
        <div className="me-4">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-2">
            <BiCheckShield className="fs-3 text-primary" />
          </div>
          <h4 className="h6 mb-1">Authenticity</h4>
          <p className="small text-muted">Verified products only</p>
        </div>
        <div className="me-4">
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-2">
            <BiLeaf className="fs-3 text-primary" />
          </div>
          <h4 className="h6 mb-1">Sustainability</h4>
          <p className="small text-muted">Eco-conscious packaging</p>
        </div>
        <div>
          <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-2">
            <BiHappyHeartEyes className="fs-3 text-primary" />
          </div>
          <h4 className="h6 mb-1">Satisfaction</h4>
          <p className="small text-muted">Customer-first approach</p>
        </div>
      </div>

      <div className="border-top pt-4 mt-2">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
              <BiStar className="fs-3 text-primary" />
            </div>
          </div>
          <div className="ms-3">
            <h4 className="h6 mb-1">Rated 4.9/5</h4>
            <p className="small text-muted mb-0">By 50,000+ customers worldwide</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <section className="py-5">
          <h2 className="text-center fw-bold mb-5 display-6">
            Why Choose <span className="text-primary">ShopCart</span>?
          </h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <BiRocket className="fs-2 text-primary" />
                    </div>
                    <h3 className="h5 mb-0">Lightning Fast Delivery</h3>
                  </div>
                  <p>
                    Our optimized platform and distributed warehouses ensure your orders reach you in record time.
                  </p>
                  <div className="d-flex align-items-center small mt-3">
                    <BiStar className="me-1 text-warning" />
                    <BiStar className="me-1 text-warning" />
                    <BiStar className="me-1 text-warning" />
                    <BiStar className="me-1 text-warning" />
                    <BiStar className="me-1 text-warning" />
                    <span className="ms-2">4.9/5 Delivery Speed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <BiLockAlt className="fs-2 text-primary" />
                    </div>
                    <h3 className="h5 mb-0">Secure Payments</h3>
                  </div>
                  <p>
                    Military-grade encryption protects your transactions with multiple payment options available.
                  </p>
                  <ul className="list-unstyled small mt-3">
                    <li className="mb-1">✓ 256-bit SSL Security</li>
                    <li className="mb-1">✓ PCI-DSS Compliant</li>
                    <li>✓ Fraud Protection</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                      <BiRefresh className="fs-2 text-primary" />
                    </div>
                    <h3 className="h5 mb-0">Hassle-Free Returns</h3>
                  </div>
                  <p>
                    30-day no-questions-asked return policy. We make returns as easy as purchases.
                  </p>
                  <div className="mt-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary me-2">Free Pickup</span>
                    <span className="badge bg-primary bg-opacity-10 text-primary">Instant Refunds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 mt-4 border-top ">
          <div className="row text-center g-4 ">
            <div className="col-md-3 ">
              <BiPackage className="display-4 text-primary mb-3" />
              <h3 className="fw-bold">10M+</h3>
              <p>Products Available</p>
            </div>
            <div className="col-md-3 ">
              <BiHeadphone className="display-4 text-primary mb-3" />
              <h3 className="fw-bold">24/7</h3>
              <p>Customer Support</p>
            </div>
            <div className="col-md-3">
              <BiShieldAlt className="display-4 text-primary mb-3" />
              <h3 className="fw-bold">100%</h3>
              <p>Secure Checkout</p>
            </div>
            <div className="col-md-3">
              <BiHappyHeartEyes className="display-4 text-primary mb-3" />
              <h3 className="fw-bold">98%</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;