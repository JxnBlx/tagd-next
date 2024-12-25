const api_config = require('../config.js');

const API_URL = api_config.API_URL;


/*
    Get all posts
    return: response object
*/
export const getPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts/all`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        return response;

    } catch (error) {
        console.error('Post data fetch error:', error);
        throw error('Post data fetch error');
    }
}

/*
    Get post by ID
    param: id - post ID
    return: response object
*/
export const getPostById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        return response;

    } catch (error) {
        console.error('Post data fetch error:', error);
        throw error('Post data fetch error');
    }
}

/*
    Create a post
    param: image_url - post image url
    param: description - post description
    return: response object
*/
export const createPost = async (image_url, description, tags) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ "image_url": image_url, "description": description, "tags": tags }),
        });

        return response;

    } catch (error) {
        console.error('Post creation error:', error);
        throw error('Post creation error');
    }
}

/*
    Edit a post
    param: id - post ID
    param: description - post description
    return: response object
*/
export const editPost = async (id, description, tags) => {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            credentials: 'include', // Include cookies in the request
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "id":id, "description": description, "tags":tags }),
        });

        return response;

    } catch (error) {
        console.error('Post edit error:', error);
        throw error('Post edit error');
    }
}
