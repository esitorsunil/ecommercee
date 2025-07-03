import './routeShimmer.css';

const RouteShimmer = () => {
  return (
    <div className="container py-5">
      <div className="row g-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="col-6 col-md-4 col-lg-3" key={index}>
            <div className="shimmer-card card h-100 p-3">
              <div className="shimmer shimmer-img mb-2"></div>
              <div className="shimmer shimmer-line w-75 mb-2"></div>
              <div className="shimmer shimmer-line w-50 mb-1"></div>
              <div className="shimmer shimmer-line w-25"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteShimmer;
