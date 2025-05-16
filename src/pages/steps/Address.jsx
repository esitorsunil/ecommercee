const Address = ({ onNext }) => (
  <div>
    <h4>Address</h4>
    <p>Enter your address here.</p>
    <button className="btn btn-primary" onClick={onNext}>Continue to Payment</button>
  </div>
);
export default Address;