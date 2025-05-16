import React from 'react';
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
            {/* Step Circle */}
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

            {/* Connecting Line (except for last step) */}
            {index !== steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  top: '20px', // vertically center relative to circle height (40px / 2)
                  right: '-50%',
                  width: '100%',
                  height: '1px',
                  backgroundColor:
                    index + 1 < currentStep ? '#198754' : '#ccc', // green if completed, gray otherwise
                  zIndex: 1,
                }}
              />
            )}

            {/* Step Label */}
            <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepHeader;
