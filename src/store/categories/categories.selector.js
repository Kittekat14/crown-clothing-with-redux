// creates a memoized selector:
import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  // "input selector"
  [selectCategoryReducer],
  // "output selector": gives back / returns a slice of the state
  (categoriesSlice) => categoriesSlice.categories // => memoized selector, this function get's only run when input selector changes
  // what's returned from "input selector" is taken as "output selector"
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
