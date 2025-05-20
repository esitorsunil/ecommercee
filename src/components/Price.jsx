
const PriceDetails = ({ totalPrice }) => (
  <div className="">
  <div className="border-start rounded p-4 sticky-top" style={{ top: '90px' }}>
    <h5 className="mb-4">Price Details</h5>

    <div className="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>₹{totalPrice.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between border-top pt-3 fs-5 fw-bold">
      <span>Total</span>
      <span>₹{(totalPrice).toFixed(2)}</span>
    </div>

    <img
      src="https://images.meesho.com/images/marketing/1588578650850.webp"
      alt="Promotional"
      className="img-fluid rounded mt-3"
    />
  </div>
</div>

);

export default PriceDetails;
