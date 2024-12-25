const api_config = require('../config.js');

const API_URL = api_config.API_URL;

/*
    Get user profile
    return: response object
*/
export const getUserProfile = async (username) => {
    try {
        const response = await fetch(`${API_URL}/user/${username}`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        return response;

    } catch (error) {
        console.error('User profile fetch error:', error);
        throw error('User profile fetch error');
    }
}
