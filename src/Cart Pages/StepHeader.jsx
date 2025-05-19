import 'bootstrap/dist/css/bootstrap.min.css';

const StepHeader = ({ currentStep }) => {
  const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

  const getCircleClass = (index) => {
    if (index + 1 === currentStep) return 'bg-primary text-white';
    if (index + 1 < currentStep) return 'bg-success text-white';
    return 'bg-light text-muted border';
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center position-relative">
        {steps.map((label, index) => (
          <div
            key={index}
            className="text-center flex-fill mx-2 position-relative"
            style={{ cursor: 'default' }}
          >

            <div
              className={`rounded-circle d-inline-flex align-items-center justify-content-center ${getCircleClass(index)}`}
              style={{
                width: '40px',
                height: '40px',
                margin: '0 auto 8px',
                fontWeight: '600',
                fontSize: '1.2rem',
                borderRadius: '50%',
                border: index + 1 < currentStep ? 'none' : '1px solid #ccc',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {index + 1}
            </div>

            {index !== steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px', 
                  right: '-50%',
                  width: '100%',
                  height: '1px',
                  backgroundColor:
                    index + 1 < currentStep ? '#198754' : '#ccc', 
                  zIndex: 1,
                }}
              />
            )}

            <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepHeader;
