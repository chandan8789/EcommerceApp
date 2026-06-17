import { createSlice, createSelector } from '@reduxjs/toolkit';
import { formatPrice } from '../../utils/price';

const initialFilters = {
  gender: [],
  priceRange: [],
  newArrivals: false,
  discounts: [],
};

const initialState = {
  products: [],
  loading: true,
  searchQuery: '',
  selectedSort: '',
  selectedFilters: initialFilters,
};

const sortData = (data, type) => {
  const sorted = [...data];

  switch (type) {
    case 'newest':
      sorted.sort((a, b) => b.id - a.id);
      break;
    case 'low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      break;
    case 'bestseller':
      sorted.sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
      break;
    default:
      break;
  }

  return sorted;
};

const matchesGender = (category, gender) => {
  const normalizedCategory = category.toLowerCase().trim();

  if (gender === 'Men') {
    return normalizedCategory === "men's clothing";
  }

  if (gender === 'Women') {
    return normalizedCategory === "women's clothing";
  }

  if (gender === 'Unisex') {
    return (
      normalizedCategory === 'electronics' || normalizedCategory === 'jewelery'
    );
  }

  return false;
};

const matchesPriceRange = (price, range) => {
  const amount = formatPrice(price);

  if (range === 'Under 700') {
    return amount < 700;
  }

  if (range === '700-1500') {
    return amount >= 700 && amount <= 1500;
  }

  if (range === 'Above 1500') {
    return amount > 1500;
  }

  return false;
};

const matchesDiscount = (item, discount) => {
  const price = formatPrice(item.price);

  if (discount === '50% off') {
    return price <= 50;
  }

  if (discount === 'Buy 1 Get 1') {
    return (item.rating?.count || 0) >= 100;
  }

  if (discount === 'Under ₹700') {
    return price < 700;
  }

  return false;
};

export const filterProducts = ({
  products,
  selectedFilters,
  selectedSort,
  searchQuery,
}) => {
  let result = [...products];

  if (selectedFilters.gender.length > 0) {
    result = result.filter(item =>
      selectedFilters.gender.some(gender =>
        matchesGender(item.category, gender),
      ),
    );
  }

  if (selectedFilters.priceRange.length > 0) {
    result = result.filter(item =>
      selectedFilters.priceRange.some(range =>
        matchesPriceRange(item.price, range),
      ),
    );
  }

  if (selectedFilters.newArrivals) {
    result = result.filter(item => item.id >= 17);
  }

  if (selectedFilters.discounts.length > 0) {
    result = result.filter(item =>
      selectedFilters.discounts.some(discount =>
        matchesDiscount(item, discount),
      ),
    );
  }

  if (searchQuery.trim()) {
    const query = searchQuery.trim().toLowerCase();
    result = result.filter(item =>
      item.title.toLowerCase().includes(query),
    );
  }

  if (selectedSort) {
    result = sortData(result, selectedSort);
  }

  return result;
};

const selectProductsState = state => state.products;

export const selectFilteredProducts = createSelector(
  [selectProductsState],
  productsState =>
    filterProducts({
      products: productsState.products,
      selectedFilters: productsState.selectedFilters,
      selectedSort: productsState.selectedSort,
      searchQuery: productsState.searchQuery,
    }),
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    toggleFilter: (state, action) => {
      const { category, value } = action.payload;
      const current = state.selectedFilters[category] || [];

      if (current.includes(value)) {
        state.selectedFilters[category] = current.filter(item => item !== value);
      } else {
        state.selectedFilters[category] = [...current, value];
      }
    },
    toggleNewArrivals: state => {
      state.selectedFilters.newArrivals = !state.selectedFilters.newArrivals;
    },
    clearAllFilters: state => {
      state.selectedFilters = { ...initialFilters };
      state.selectedSort = '';
      state.searchQuery = '';
    },
  },
});

export const {
  setProducts,
  setLoading,
  setSearchQuery,
  setSelectedSort,
  toggleFilter,
  toggleNewArrivals,
  clearAllFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
