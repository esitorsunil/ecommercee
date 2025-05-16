const Payment = ({ onNext }) => (
  <div>
    <h4>Payment</h4>
    <p>Choose payment method.</p>
    <button className="btn btn-primary" onClick={onNext}>Continue to Summary</button>
  </div>
);
export default Payment;