import axios from 'axios';

const API_URL = 'http://localhost:3000/api/retailer_banking';

// Get all banking details
export const getAllBankingDetails = async () => {
    try {
        const response = await axios.get(API_URL); // Directly fetching all banking details
        return response.data; // Return the data part
    } catch (error) {
        console.error('Error fetching all banking details:', error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

// Get banking details by retid
export const getBankingDetails = async (retid) => {
    try {
        const response = await axios.get(`${API_URL}/${retid}`); // Fetching details by retid
        return response.data; // Return the data part
    } catch (error) {
        console.error(`Error fetching banking details for retid ${retid}:`, error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

// Add new banking details
export const addBankingDetails = async (data) => {
    try {
        const response = await axios.post(API_URL, data); // Adding new banking details
        return response.data; // Return the data part
    } catch (error) {
        console.error('Error adding banking details:', error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

// Update banking details
export const updateBankingDetails = async (retid, data) => {
    try {
        const response = await axios.patch(`${API_URL}/${retid}`, data); // Updating banking details
        return response.data; // Return the data part
    } catch (error) {
        console.error(`Error updating banking details for retid ${retid}:`, error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

// Replace banking details
export const replaceBankingDetails = async (retid, data) => {
    try {
        const response = await axios.put(`${API_URL}/${retid}`, data); // Replacing banking details
        return response.data; // Return the data part
    } catch (error) {
        console.error(`Error replacing banking details for retid ${retid}:`, error);
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};
