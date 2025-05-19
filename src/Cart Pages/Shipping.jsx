import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StepHeader from './StepHeader';
import AddressList from './Shipping Address/AddressList';
import AddressModal from './Shipping Address/AddressModal';
import PriceDetails from '../components/Price';
import { useShipping } from '../context/AddressContext';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const Shipping = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    fields,
    openModal,
    handleSaveAddress,
    handleDeleteAddress,
    editIndex,
    showModal,
    selectedAddressIndex,
  } = useShipping();

  // State to control which accordion item is open
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (selectedAddressIndex === null || selectedAddressIndex === undefined) {
      alert('Please select a shipping address');
      return;
    }

    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const userAddresses = allAddresses[userEmail] || [];

    const selectedAddress = userAddresses[selectedAddressIndex];

    if (!selectedAddress) {
      alert('Selected address not found');
      return;
    }

    localStorage.setItem('selectedShippingAddress', JSON.stringify(selectedAddress));

    navigate('/payment', {
      state: {
        totalPrice,
        address: selectedAddress,
      },
    });
  };

  return (
    <>
      <StepHeader currentStep={2} />
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Shipping Address</h3>
              <button className="btn btn-outline-primary" onClick={() => openModal()}>
                Add New Address
              </button>
            </div>

            <AddressList
              fields={fields}
              selectedAddressIndex={selectedAddressIndex}
              setValue={setValue}
              openModal={openModal}
              onDelete={handleDeleteAddress}
              expandedIndex={expandedIndex}
              toggleAccordion={toggleAccordion}
            />

            <button className="btn btn-primary mt-4" onClick={onSubmit}>
              Continue to Payment
            </button>
          </div>

          <div className="col-md-4">
            <PriceDetails totalPrice={totalPrice} />
          </div>
        </div>
      </div>

      {showModal && (
        <AddressModal
          indianStates={indianStates}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleSaveAddress={handleSaveAddress}
          setValue={setValue}
          editIndex={editIndex}
        />
      )}
    </>
  );
};

export default Shipping;
