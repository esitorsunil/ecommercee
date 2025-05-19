const AddressModal = ({
  indianStates,
  register,
  errors,
  handleSubmit,
  handleSaveAddress,
  setValue,
  editIndex,
}) => {
  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit(handleSaveAddress)}>
          <div className="modal-header">
            <h5 className="modal-title py-2">{editIndex !== null ? 'Edit Delivery Address' : 'Add Delivery Address'}</h5>
            <button type="button" className="btn-close" onClick={() => setValue('showModal', false)}></button>
          </div>
          <div className="modal-body">
            <h5 className="mb-3 d-flex align-items-center">
              <i className="bi bi-telephone-inbound-fill text-primary me-2"></i> Contact Details
            </h5>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
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
                    pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit mobile number'
},
})}
/>
</div>
{errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
</div>
        <h5 className="mb-3 d-flex align-items-center mt-4">
          <i className="bi bi-house-fill text-primary me-2"></i> Delivery Address
        </h5>

        <div className="mb-3">
          <label className="form-label">House/Flat No.</label>
          <input
            className={`underline-input ${errors.houseNo ? 'is-invalid' : ''}`}
            {...register('houseNo', { required: 'House number is required' })}
          />
          {errors.houseNo && <div className="invalid-feedback">{errors.houseNo.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Area/Street</label>
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
            className={`underline-input ${errors.state ? 'is-invalid' : ''}`}
            {...register('state', { required: 'State is required' })}
          >
            <option value="">Select State</option>
            {indianStates.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
          {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setValue('showModal', false)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {editIndex !== null ? 'Update Address' : 'Add Address'}
        </button>
      </div>
    </form>
  </div>
</div>
);
};

export default AddressModal;