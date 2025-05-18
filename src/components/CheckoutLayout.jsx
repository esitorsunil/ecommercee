import { useReducer } from 'react';
import Cart from './steps/Cart';
import Address from './steps/Address';
import Payment from './steps/Payment';
import Summary from './steps/Summary';

const steps = ['Cart', 'Address', 'Payment', 'Summary'];

const reducer = (state, action) => {
  switch (action.type) {
    case 'GOTO_STEP':
      return { currentStep: action.payload };
    case 'NEXT_STEP':
      return {
        currentStep: Math.min(state.currentStep + 1, steps.length - 1),
      };
    default:
      return state;
  }
};

const CheckoutLayout = () => {
  const [state, dispatch] = useReducer(reducer, { currentStep: 0 });

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <Cart onNext={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 1:
        return <Address onNext={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 2:
        return <Payment onNext={() => dispatch({ type: 'NEXT_STEP' })} />;
      case 3:
        return <Summary />;
      default:
        return null;
    }
  };

  return (
    <div className="container pt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-center flex-grow-1 p-2 border mx-1 rounded ${
              state.currentStep === index ? 'bg-primary text-white' : 'bg-light'
            }`}
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch({ type: 'GOTO_STEP', payload: index })}
          >
            <div>{index + 1}</div>
            <small>{step}</small>
          </div>
        ))}
      </div>

      {renderStep()}
    </div>
  );
};

export default CheckoutLayout;
