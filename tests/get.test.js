const axios = require('axios');

describe('Functional Tests - GET', () => {
    describe('GET /posts', () => {
        test('should return post by id', async () => {
            const postId = 1;
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
                })
            
            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('title')
            console.log(response.data);
        });
    });


    describe('GET /albums', () => {
        test('should return all albums', async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            expect(response.status).toEqual(200);
            expect(Array.isArray(response.data)).toBe(true);
            console.log(response.data);
        });
    });


    describe('GET /photos', () => {
        test('should return photo by id', async () => {
            const photoId = 1;
            const title = 'accusamus beatae ad facilis cum similique qui sunt'
            const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
                })
            
            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('url')
            expect(response.data).toHaveProperty('thumbnailUrl')
            expect(response.data.title).toEqual(title);
            console.log(response.data);
        });
    });
})