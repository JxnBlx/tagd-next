const api_config = require('../config.js');

const API_URL = api_config.API_URL;


/*
    Get all items
    return: response object
*/
export const getItems = async () => {
    try {
        const response = await fetch(`${API_URL}/items/all`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        return response;

    } catch (error) {
        console.error('Item data fetch error:', error);
        throw error('Item data fetch error');
    }
}

/*
    Get item by ID
    param: id - item ID
    return: response object
*/
export const getItemById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        return response;

    } catch (error) {
        console.error('Item data fetch error:', error);
        throw error('Item data fetch error');
    }
}

/*
    Create an item
    param: name - item name
    param: description - item description
    param: purchase_link - item purchase link
    param: image_link - item image link
    param: brand_id - brand ID
    return: response object
*/
export const createItem = async (name, description, purchase_link, image_link, brand_id) => {
    try {
        const response = await fetch(`${API_URL}/items`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name":name, "description":description, "purchase_link":purchase_link, "image_link":image_link, "brand_id":brand_id }),
        });

        return response;

    } catch (error) {
        console.error('Item creation error:', error);
        throw error('Item creation error');
    }
}

/*
    Edit an item
    param: id - item ID
    param: name - item name
    param: description - item description
    param: purchase_link - item purchase link
    param: image_link - item image link
    param: brand_id - brand ID
    return: response object
*/
export const editItem = async (id, name, description, purchase_link, image_link, brand_id) => {
    try {
        const response = await fetch(`${API_URL}/items/${id}`, {
            method: 'PUT',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name":name, "description":description, "purchase_link":purchase_link, "image_link":image_link, "brand_id":brand_id }),
        });

        return response;

    } catch (error) {
        console.error('Item edit error:', error);
        throw error('Item edit error');
    }
}