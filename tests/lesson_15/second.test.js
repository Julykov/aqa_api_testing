const { getPostsWithHeadersAndParams } = require('../../src/apiService');


const axios = require('axios');

describe('GET /posts', () => {
    test('should check custom header was added', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue( { status: 200, data: {} } )
        const postId = 1
        await getPostsWithHeadersAndParams(postId)

        expect(axiosSpy).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts',
            expect.objectContaining({
                params: { id: postId },
                headers: expect.objectContaining({
                    'X-Custom-Header': 'Some custom text value'
                })
            })
        )

        axiosSpy.mockRestore()
        
    });
});
