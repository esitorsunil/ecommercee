import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '../Custom Hooks/useaddToCart';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../Redux/WishlistSlice';

const ProductCard = ({ product, refProp = null }) => {
  const navigate = useNavigate();
  const handleAddToCart = useAddToCart();
  const dispatch = useDispatch();
const wishlist = useSelector((state) => state.wishlist);
const isWishlisted = wishlist.some((item) => item.id === product.id);

  const [shareOpen, setShareOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Share URLs and text
  const productUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = encodeURIComponent(`Check out this product: ${product.title}`);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${shareText}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(productUrl)}`;
  const instagramUrl = `https://www.instagram.com/`;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShareOpen(false);
      }
    };
    if (shareOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareOpen]);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div
      className="col-6 col-md-4 col-lg-3"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.id}`)}
      ref={refProp}
    >
      <div className="card h-100 shadow-sm">
        <div className="position-absolute top-0 end-0 m-2" onClick={(e) => {
  e.stopPropagation();
  dispatch(toggleWishlist(product));
}}>
  <i
    className={`bi bi-heart${isWishlisted ? '-fill text-danger' : ''}`}
    style={{ fontSize: '1.2rem', cursor: 'pointer' }}
    aria-label="Add to Wishlist"
  ></i>
</div>
        <img
          src={product.thumbnail || product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-secondary" title={product.title}>
            {product.title.length > 50
              ? product.title.slice(0, 50) + '...'
              : product.title}
          </h6>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <p className="card-text fw-bold mb-0">${product.price.toFixed(2)}</p>
            <p className="text-success small mb-0">Free Delivery</p>
          </div>
          <p className="text-warning mb-2">
            {'★'.repeat(Math.round(product.rating || 0)).padEnd(5, '☆')}
          </p>

          {/* Buttons row */}
          <div className="d-flex gap-2 mt-auto">
            <button
              className="btn btn-outline-primary btn-sm flex-grow-1"
              onClick={handleAddToCart(product)}
            >
              <i className="bi bi-cart-plus me-1"></i>Add to Cart
            </button>

            {/* Share icon button */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShareOpen((open) => !open);
                }}
                aria-label="Share"
              >
                <i className="bi bi-share-fill"></i>
                
              </button>

              {/* Dropdown */}
              {shareOpen && (
  <div
    className="position-absolute bg-white border rounded shadow-sm p-2 d-flex justify-content-between"
    style={{ top: '110%', right: 0, zIndex: 1000, width: '320px' }} // wider for 4 icons side by side
    onClick={stopPropagation}
  >
    {[ 
      { url: facebookShareUrl, icon: "bi-facebook", name: "Facebook" },
      { url: twitterShareUrl, icon: "bi-twitter", name: "Twitter" },
      { url: whatsappShareUrl, icon: "bi-whatsapp", name: "WhatsApp" },
      { url: instagramUrl, icon: "bi-instagram", name: "Instagram" }
    ].map(({ url, icon, name }) => (
      <button
  key={name}
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    window.open(url, '_blank', 'width=600,height=400');
  }}
  className="text-center text-decoration-none flex-grow-1 mx-1 border-0 bg-transparent"
  aria-label={`Share on ${name}`}
  style={{ color: 'inherit', fontSize: '0.9rem', cursor: 'pointer' }}
>
  <i className={`bi ${icon} fs-4 share-icon d-block mb-1`}></i>
  <span>{name}</span>
</button>

    ))}
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
