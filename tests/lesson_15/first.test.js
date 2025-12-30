const axios = require('axios');


describe('GET /posts', () => {
    test('should return 404 code due to unexistent id', async () => {
        const postId = 101
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
                }
            )
            console.log(response.data)
        } catch(error) {
            expect(error.response.status).toEqual(404);
        }
        
    });
});
