// memoization ~ caching with reselect (not run something again that you already did once before)
import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// memoized selector: createSelector creates the memoized selector
export const selectCategories = createSelector(
  [selectCategoryReducer], // if different then second parameter func. runs, otherwise it's memoized
  // from the function "selectCategoryReducer" ;)
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories], // if different then second parameter func. runs, otherwise it's memoized
  // and doesn't even bother running like above
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
