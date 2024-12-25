const api_config = require('../config.js');

const API_URL = api_config.API_URL;

/*
    Get signed URL for image upload
    return: response object
*/
export const getSignedURL = async () => {
    try{
        const response = await fetch(`${API_URL}/image/signed-url`, {
        method: 'GET',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        },
    });
        return response;
    } catch (error) {
        console.error('Image fetch error:', error);
        throw error('Image fetch error');
    }
}

/*
    Upload image to url
    param: signedURL - signed URL for image upload
    param: file - image file
    return: response object
*/
export const uploadImage = async (signedURL, file) => {
    const response = await fetch(signedURL, {
        method: 'PUT',
        body: file,
    });

    return response;
}

/*
    Make image source url from path
    param: path - image path
    return: string = image source url
*/
export const makeImageUrl = (path) => {
    return `https://sjqzyhiksxfkrccmzyyx.supabase.co/storage/v1/object/public/post-images/${path}`;
}