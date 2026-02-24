const axios = require('axios');


async function getPostsWithHeadersAndParams(postId) {
    try  {
        const res = await axios.get(
            'https://jsonplaceholder.typicode.com/posts', 
            {
                params: { 'id': postId },
                headers: {
                    'Content-Type': 'application/json',
                    'X-Custom-Header': 'Some custom text value'
                }
            }
            )
        return res.data

    } catch (error) {
        if (error.response && error.response.status == 404) {
            throw new Error('Not found');
        }
        throw new Error('Network');
    }

}


async function getPostWrongUrl(postId) {
    try  {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`, 
                                    {
                                        headers: { 'Content-Type': 'application/json' }
                                    })
        return res.data

    } catch (error) {
        if (error.response && error.response.status == 404) {
            throw new Error('Not found');
        }
        throw new Error('Network');
    }
}


module.exports = { getPostWrongUrl, getPostsWithHeadersAndParams };
