import { useEffect, useState, useContext } from 'react';
import ProductContext from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const SimilarProductsYouLike = () => {
  const { state } = useContext(ProductContext);
  const { browsingHistory = [], pastPurchases = [], searchQueries = [] } = state;

  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual GroqAPI details
  const GROQ_API_URL = 'https://api.groqapi.com/recommendations';
  const GROQ_API_KEY = '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';

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (
        browsingHistory.length === 0 &&
        pastPurchases.length === 0 &&
        searchQueries.length === 0
      ) {
        setSimilarProducts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const payload = {
          browsingHistory,
          pastPurchases,
          searchQueries,
          maxResults: 10,
        };

        const res = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        setSimilarProducts(data.recommendations || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [browsingHistory, pastPurchases, searchQueries]);

  if (loading) return <p>Loading similar products you might like...</p>;
  if (error) return <p>Error loading similar products: {error}</p>;
  if (similarProducts.length === 0)
    return <p>No similar products found right now.</p>;

  return (
    <section className="mb-5">
      <h2 className="mb-3">Similar Products You Like</h2>
      <div className="row g-3">
        {similarProducts.map(
          (product) =>
            product.thumbnail && (
              <ProductCard key={`similar-${product.id}`} product={product} />
            )
        )}
      </div>
    </section>
  );
};

export default SimilarProductsYouLike;
