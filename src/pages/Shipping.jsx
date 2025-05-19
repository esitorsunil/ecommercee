import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import StepHeader from '../Cart Pages/StepHeader';
import { useEffect } from 'react';

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
      showModal: false,
      editIndex: null,
      name: '',
      mobile: '',
      houseNo: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
    },
  });

  const addresses = watch('addresses');
  const editIndex = watch('editIndex');
  const showModal = watch('showModal');
  const selectedAddressIndex = watch('selectedAddress');

  const { fields, append, update } = useFieldArray({
    control,
    name: 'addresses',
  });

  const openModal = (index = null) => {
    setValue('editIndex', index);
    if (index !== null) {
      const addr = addresses[index];
      Object.entries(addr).forEach(([key, val]) => setValue(key, val));
    } else {
      reset({
        ...watch(),
        name: '',
        mobile: '',
        houseNo: '',
        area: '',
        pincode: '',
        city: '',
        state: '',
      });
    }
    setValue('showModal', true);
  };

  const handleSaveAddress = (data) => {
    const currentIndex = watch('editIndex');

    // Parse localStorage once
    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const userAddresses = allAddresses[userEmail] || [];

    if (currentIndex !== null) {
      update(currentIndex, data);
      userAddresses[currentIndex] = data;
    } else {
      append(data);
      userAddresses.push(data);
    }

    allAddresses[userEmail] = userAddresses;
    localStorage.setItem('addresses', JSON.stringify(allAddresses));

    setValue('showModal', false);
    setValue('editIndex', null);
    reset({
      ...watch(),
      name: '',
      mobile: '',
      houseNo: '',
      area: '',
      pincode: '',
      city: '',
      state: '',
    });
  };

  useEffect(() => {
    // Load addresses once on mount
    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const savedAddresses = allAddresses[userEmail] || [];

    if (savedAddresses.length > 0) {
      savedAddresses.forEach((addr) => append(addr));
    }
  }, [append]);

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    const selectedIndex = selectedAddressIndex;

    if (selectedIndex === null || selectedIndex === undefined) {
      alert('Please select a shipping address');
      return;
    }

    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const userAddresses = allAddresses[userEmail] || [];

    const selectedAddress = userAddresses[selectedIndex];

    if (!selectedAddress) {
      alert('Selected address not found');
      return;
    }

    // Save selected address in localStorage (key: 'selectedShippingAddress')
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

            <div className="accordion" id="addressAccordion">
              {fields.map((address, index) => (
                <div className="accordion-item" key={address.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                    >
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="radio"
                          className="form-check-input me-2"
                          name="selectedAddress"
                          checked={selectedAddressIndex === index}
                          onChange={() => setValue('selectedAddress', index)}
                        />
                        <strong>
                          {address.name} - {address.city}
                        </strong>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#addressAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>Mobile:</strong> {address.mobile}
                      </p>
                      <p>
                        <strong>House No:</strong> {address.houseNo}
                      </p>
                      <p>
                        <strong>Area:</strong> {address.area}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {address.pincode}
                      </p>
                      <p>
                        <strong>City:</strong> {address.city}
                      </p>
                      <p>
                        <strong>State:</strong> {address.state}
                      </p>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => openModal(index)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-primary mt-4" onClick={handleSubmitShipping}>
              Continue to Payment
            </button>
          </div>

          <div className="col-md-4">
            <div className="border-start rounded p-4">
              <h5 className="mb-4">Price Details</h5>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span>Order Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit(handleSaveAddress)}>
              <div className="modal-header">
                <h5 className="modal-title py-2">{editIndex !== null ? 'Edit Delivery Address' : 'Add Delivery Address'}</h5>
                <button type="button" className="btn-close" onClick={() => setValue('showModal', false)}></button>
              </div>
              <div className="modal-body">
                {/* Contact Details */}
                <h5 className="mb-3 d-flex align-items-center">
                  <i className="bi bi-telephone-inbound-fill text-primary me-2"></i> Contact Details
                </h5>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    className={`underline-input ${errors.name ? 'is-invalid' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <div className="input-group">
                    <input
                      className={`underline-input ${errors.mobile ? 'is-invalid' : ''}`}
                      {...register('mobile', {
                        required: 'Mobile number is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit mobile number' },
                      })}
                    />
                  </div>
                  {errors.mobile && <div className="invalid-feedback d-block">{errors.mobile.message}</div>}
                </div>

                {/* Address */}
                <h5 className="mt-5 mb-3 d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i> Address
                </h5>

                <div className="mb-3">
                  <label className="form-label">House No</label>
                  <input
                    className={`underline-input ${errors.houseNo ? 'is-invalid' : ''}`}
                    {...register('houseNo', { required:'House number is required' })}
/>
{errors.houseNo && <div className="invalid-feedback">{errors.houseNo.message}</div>}
</div>

            <div className="mb-3">
              <label className="form-label">Area</label>
              <input
                className={`underline-input ${errors.area ? 'is-invalid' : ''}`}
                {...register('area', { required: 'Area is required' })}
              />
              {errors.area && <div className="invalid-feedback">{errors.area.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input
                className={`underline-input ${errors.pincode ? 'is-invalid' : ''}`}
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: { value: /^[1-9][0-9]{5}$/, message: 'Enter a valid 6-digit pincode' },
                })}
              />
              {errors.pincode && <div className="invalid-feedback">{errors.pincode.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                className={`underline-input ${errors.city ? 'is-invalid' : ''}`}
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <select
                className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                {...register('state', { required: 'State is required' })}
              >
                <option value="">Select State</option>
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setValue('showModal', false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</>
);
};

export default Shipping;
