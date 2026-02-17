const axios = require('axios');


describe('GET /posts', () => {
    test('should check custom header was added', async () => {
        const postId = 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                'id': postId
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Custom-Header': 'Some custom text value'
            }
            }
        )
        
        console.log(response.headers)
        console.log(response.config)
        console.log(response.config.headers['X-Custom-Header'])
        expect(response.status).toEqual(200);
        expect(response.config.headers['X-Custom-Header']).toEqual('Some custom text value')
    
    });
});
