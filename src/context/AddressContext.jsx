import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const ShippingContext = createContext();

export const useShipping = () => useContext(ShippingContext);

export const ShippingProvider = ({ children }) => {
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

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const addresses = watch('addresses');
  const editIndex = watch('editIndex');
  const showModal = watch('showModal');
  const selectedAddressIndex = watch('selectedAddress');

  // New state for accordion expanded item index
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  // Load addresses from localStorage once
  useEffect(() => {
    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const savedAddresses = allAddresses[userEmail] || [];

    if (savedAddresses.length > 0 && fields.length === 0) {
      savedAddresses.forEach(addr => append(addr));
    }
  }, [append, fields.length]);

  const openModal = (index = null) => {
    setValue('editIndex', index);
    if (index !== null) {
      const addr = addresses[index];
      Object.entries(addr).forEach(([key, val]) => setValue(key, val));
      setExpandedIndex(index);  // keep accordion expanded for editing
    } else {
      // Clear modal fields
      setValue('name', '');
      setValue('mobile', '');
      setValue('houseNo', '');
      setValue('area', '');
      setValue('pincode', '');
      setValue('city', '');
      setValue('state', '');
      setExpandedIndex(null);
    }
    setValue('showModal', true);
  };

  const handleSaveAddress = (data) => {
    const currentIndex = watch('editIndex');

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
    // Clear modal fields only
    setValue('name', '');
    setValue('mobile', '');
    setValue('houseNo', '');
    setValue('area', '');
    setValue('pincode', '');
    setValue('city', '');
    setValue('state', '');

    // Collapse accordion after saving
    setExpandedIndex(null);
  };

  const handleDeleteAddress = (index) => {
    remove(index);

    const allAddresses = JSON.parse(localStorage.getItem('addresses')) || {};
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;
    const userAddresses = allAddresses[userEmail] || [];

    userAddresses.splice(index, 1);
    allAddresses[userEmail] = userAddresses;
    localStorage.setItem('addresses', JSON.stringify(allAddresses));

    const selectedIndex = watch('selectedAddress');
    if (selectedIndex === index) {
      setValue('selectedAddress', null);
    } else if (selectedIndex > index) {
      setValue('selectedAddress', selectedIndex - 1);
    }

    // If the deleted item was expanded, collapse accordion
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
  };

  return (
    <ShippingContext.Provider
      value={{
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
        errors,
        fields,
        append,
        update,
        remove,
        addresses,
        editIndex,
        showModal,
        selectedAddressIndex,
        expandedIndex,
        toggleAccordion,
        openModal,
        handleSaveAddress,
        handleDeleteAddress,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};
