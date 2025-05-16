import { useNavigate } from 'react-router-dom';

const ProductCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      label: 'Ethnic Wear',
      realCategory: 'womens-dresses',
      url: 'https://images.meesho.com/images/marketing/1744634654837.webp'
    },
    {
      label: 'Footwear',
      realCategory: 'mens-shoes',
      url: 'https://images.meesho.com/images/marketing/1744634814643.webp'
    },
    {
      label: 'Menswear',
      realCategory: 'mens-shirts',
      url: 'https://images.meesho.com/images/marketing/1744634780426.webp'
    },
    {
      label: 'Beauty',
      realCategory: 'Beauty',
      url: 'https://images.meesho.com/images/marketing/1744634871107.webp'
    },
    {
      label: 'Women’s Bags',
      realCategory: 'womens-bags',
      url: 'https://images.meesho.com/images/marketing/1744634909968.webp'
    },
    {
      label: 'Groceries',
      realCategory: 'groceries',
      url: 'https://images.meesho.com/images/marketing/1744634937295.webp'
    }
  ];

  return (
    <div className="row g-2 mb-5">
      {categories.map((item, index) => (
        <div className="col-6 col-md-2" key={index}>
          <div
            className="text-center"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/category/${item.realCategory}`)}
          >
            <img
              src={item.url}
              alt={item.label}
              className="img-fluid rounded"
              style={{ width: '70%', height: '150px', objectFit: 'cover' }}
            />
            <p className="mt-2 fw-semibold text-secondary">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;
