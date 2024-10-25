import axios from 'axios';
import { fetchCategoriesAction, fetchSubcategoriesAction } from '../Slice/slice';

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3000/api/categories');
    dispatch(fetchCategoriesAction(response.data)); // Dispatch categories
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchSubcategories = (categoryId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/subcategories/category/${categoryId}`);
    dispatch(fetchSubcategoriesAction({ categoryId, subcategories: response.data })); // Dispatch subcategories with categoryId
  } catch (error) {
    console.error('Error fetching subcategories:', error);
  }
};
