import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import PriceDetails from '../components/Price';
import StepHeader from './StepHeader';

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
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      addresses: [],
      selectedAddress: null,
      editIndex: null,
      showModal: false,
      name: '',
      mobile: '',
      houseNo: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const selectedAddressIndex = watch('selectedAddress');
  const showModal = watch('showModal');
  const editIndex = watch('editIndex');

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const savedAddresses = allAddresses[userEmail] || [];
    if (savedAddresses.length) {
      reset({
        addresses: savedAddresses,
        selectedAddress: null,
        editIndex: null,
        showModal: false,
      });
    }
  }, [reset]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    if (!userEmail) return;

    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    allAddresses[userEmail] = fields;
    localStorage.setItem('addresses', JSON.stringify(allAddresses));
  }, [fields]);

  const openModal = (index = null) => {
    if (index !== null) {
      const addr = fields[index];
      setValue('name', addr.name);
      setValue('mobile', addr.mobile);
      setValue('houseNo', addr.houseNo);
      setValue('area', addr.area);
      setValue('pincode', addr.pincode);
      setValue('city', addr.city);
      setValue('state', addr.state);
      setValue('editIndex', index);
    } else {
      reset({
        name: '',
        mobile: '',
        houseNo: '',
        area: '',
        pincode: '',
        city: '',
        state: '',
        editIndex: null,
      }, { keepValues: true });
    }
    setValue('showModal', true);
  };

  const closeModal = () => {
    setValue('showModal', false);
    setValue('editIndex', null);
  };
  const handleSaveAddress = (data) => {
    const {
      name, mobile, houseNo, area, pincode, city, state, editIndex,
    } = data;

    const newAddress = { id: Date.now().toString(), name, mobile, houseNo, area, pincode, city, state };

    if (editIndex !== null && editIndex !== undefined) {
      update(editIndex, newAddress);
    } else {
      append(newAddress);
    }
    closeModal();
  };

  const handleDeleteAddress = (index) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      remove(index);
      if (selectedAddressIndex === index) {
        setValue('selectedAddress', null);
      }
    }
  };

  const onSubmit = () => {
    if (selectedAddressIndex === null || selectedAddressIndex === undefined) {
      alert('Please select a shipping address');
      return;
    }

    const selectedAddress = fields[selectedAddressIndex];
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
      <div className="container pt-5 bg-light">
        <div className="row">
          <div className="col-md-7 col-lg-7">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Shipping Address</h3>
              <button className="btn btn-outline-primary" onClick={() => openModal()}>
                Add New Address
              </button>
            </div>

     <div className="row  g-2">
  {fields.map((address, index) => (
    <div className="col" key={address.id}>
      <div className={`card shadow-sm border ${selectedAddressIndex === index ? 'border-primary' : ''}`}>
        <div className="card-body">
          <div className="form-check mb-3">
            <input
              type="radio"
              className="form-check-input me-2"
              name="selectedAddress"
              checked={selectedAddressIndex === index}
              onChange={() => setValue('selectedAddress', index)}
              id={`address-${index}`}
            />
            <label htmlFor={`address-${index}`} className="form-check-label fw-semibold">
              {address.name} - {address.city}
            </label>
          </div>
         
<p className="mb-2 text-secondary">
  {address.houseNo}, {address.area}, {address.city} , {address.state} - {address.pincode}
</p>
<p className="mb-1 text-secondary"> {address.mobile}</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => openModal(index)}
            >
              <i className="bi bi-pencil-square me-1"></i> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDeleteAddress(index)}
            >
              <i className="bi bi-trash me-1"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      <button className="btn btn-primary mt-4" onClick={onSubmit}>
        Deliver to this Address
      </button>
    </div>

   <div className="col-md-5 col-lg-4 mt-5">
      <PriceDetails totalPrice={totalPrice} />
    </div>
  </div>

  {showModal && (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={closeModal}
    >
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <form className="modal-content" onSubmit={handleSubmit(handleSaveAddress)}>
          <div className="modal-header">
            <h5 className="modal-title py-2">
              {editIndex !== null ? 'Edit Delivery Address' : 'Add Delivery Address'}
            </h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <h5 className="mb-3 d-flex align-items-center">
              <i className="bi bi-telephone-inbound-fill text-primary me-2"></i> Contact Details
            </h5>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Min 3 chars' } })}
                id="name"
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Full Name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                {...register('mobile', {
                  required: 'Mobile is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid Indian mobile number' },
                })}
                id="mobile"
                type="tel"
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                placeholder="10 digit mobile number"
              />
              {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
            </div>

            <h5 className="mb-3 mt-4 d-flex align-items-center">
              <i className="bi bi-house-door-fill text-primary me-2"></i> Address
            </h5>

            <div className="mb-3">
              <label htmlFor="houseNo" className="form-label">House Number</label>
              <input
                {...register('houseNo', { required: 'House number required' })}
                id="houseNo"
                type="text"
                className={`form-control ${errors.houseNo ? 'is-invalid' : ''}`}
                placeholder="House number or building name"
              />
              {errors.houseNo && <div className="invalid-feedback">{errors.houseNo.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="area" className="form-label">Area</label>
              <input
                {...register('area', { required: 'Area is required' })}
                id="area"
                type="text"
                className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                placeholder="Area, locality"
              />
              {errors.area && <div className="invalid-feedback">{errors.area.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: { value: /^\d{6}$/, message: 'Invalid 6-digit pincode' },
                })}
                id="pincode"
                type="text"
                className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
                placeholder="6-digit PIN code"
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                {...register('city', { required: 'City is required' })}
                id="city"
                type="text"
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                placeholder="City"
              />
              {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <select
                {...register('state', { required: 'State is required' })}
                id="state"
                className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                defaultValue=""
              >
                <option value="" disabled>Select State</option>
                {indianStates.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editIndex !== null ? 'Update Address' : 'Add Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
</>
  )}

export default Shipping;