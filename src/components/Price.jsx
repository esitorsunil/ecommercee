
const PriceDetails = ({ totalPrice }) => (
  <div className="border p-4 sticky-top" style={{ top: '90px' }}>
    <h5 className="mb-4">Price Details</h5>
    <div className="d-flex justify-content-between mb-3">
      <span>Subtotal</span>
      <span>₹{totalPrice.toFixed(2)}</span>
    </div>
    <div className="d-flex justify-content-between mb-3">
      <span>Shipping Fee</span>
      <span>₹50.00</span>
    </div>
    <hr />
    <div className="d-flex justify-content-between fs-5 fw-bold">
      <span>Total</span>
      <span>₹{(totalPrice + 50).toFixed(2)}</span>
    </div>
  </div>
);

export default PriceDetails;
