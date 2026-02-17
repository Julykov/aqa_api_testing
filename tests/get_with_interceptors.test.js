const api = require('./apiClient');


describe('Functional Tests - GET', () => {
    describe('GET /posts', () => {
        test('should return post by id', async () => {
            const postId = 1;
            const response = await api.get(`posts/${postId}`)
            
            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('title')
            expect(response.data.id).toBe(postId)
            expect(typeof response.data.id).toBe('number')
            expect(typeof response.data.title).toBe('string')
            expect(typeof response.data.body).toBe('string')
        });
    });


    describe('GET /albums', () => {
        test('should return all albums', async () => {
            const response = await api.get('albums/')

            expect(response.status).toEqual(200);
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data[0]).toHaveProperty('userId')
            expect(response.data[0]).toHaveProperty('id')
            expect(response.data[0]).toHaveProperty('title')
            expect(typeof response.data[0].id).toBe('number')
            expect(typeof response.data[0].userId).toBe('number')
            expect(typeof response.data[0].title).toBe('string')
        });
    });


    describe('GET /photos', () => {
        test('should return photo by id', async () => {
            const photoId = 1;
            const title = 'accusamus beatae ad facilis cum similique qui sunt'
            const response = await api.get(`photos/${photoId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
                })
            
            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('url')
            expect(response.data).toHaveProperty('thumbnailUrl')
            expect(response.data.title).toEqual(title);
            expect(response.data.id).toBe(photoId)
            expect(typeof response.data.albumId).toBe('number')
            expect(typeof response.data.url).toBe('string')
        });
    });
})
