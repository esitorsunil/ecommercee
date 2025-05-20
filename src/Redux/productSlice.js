import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const data = await res.json();
    return data.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    all: [],
    filtered: [],
    categories: [],
    brands: [],
    selectedCategories: [],
    selectedBrands: [],
    priceRange: [0, 1000],
    rating: 0,
    sortBy: '',
    categorySearch: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleCategory(state, action) {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    toggleBrand(state, action) {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter(b => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setRating(state, action) {
      state.rating = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setCategorySearch(state, action) {
      state.categorySearch = action.payload;
    },
    applyFilters(state) {
      let filtered = [...state.all];

      if (state.selectedCategories.length > 0) {
        filtered = filtered.filter(p => state.selectedCategories.includes(p.category));
      }

      if (state.selectedBrands.length > 0) {
        filtered = filtered.filter(p => state.selectedBrands.includes(p.brand));
      }

      filtered = filtered.filter(p => p.price >= state.priceRange[0] && p.price <= state.priceRange[1]);

      filtered = filtered.filter(p => p.rating >= state.rating);

      if (state.sortBy) {
        if (state.sortBy === 'price-asc') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortBy === 'price-desc') {
          filtered.sort((a, b) => b.price - a.price);
        } else if (state.sortBy === 'rating-desc') {
          filtered.sort((a, b) => b.rating - a.rating);
        } else if (state.sortBy === 'discount-desc') {
          filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        } else if (state.sortBy === 'newest') {
          filtered.sort((a, b) => b.id - a.id);
        }
      }

      state.filtered = filtered;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.all = action.payload;
        state.filtered = action.payload;

        const uniqueCategories = [...new Set(action.payload.map(p => p.category))];
        const uniqueBrands = [...new Set(action.payload.map(p => p.brand).filter(Boolean))];
        state.categories = uniqueCategories;
        state.brands = uniqueBrands;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  toggleCategory,
  toggleBrand,
  setPriceRange,
  setRating,
  setSortBy,
  setCategorySearch,
  applyFilters
} = productsSlice.actions;

export default productsSlice.reducer;
