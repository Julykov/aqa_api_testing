const axios = require('axios')
const { getPostWrongUrl, getPostsWithHeadersAndParams } = require('../../src/apiService');

jest.mock('axios');


describe('Mocking Axios in Jest', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    test('Success: should get data with headers and params through mock', async () => {
        const mockData = [{ id: 1, title: 'Mock Post' }]

        axios.get.mockResolvedValue({ status: 200, data: mockData })

        const result = await getPostsWithHeadersAndParams(1)

        expect(result).toEqual(mockData)

        expect(axios.get).toHaveBeenCalledWith(
            'https://jsonplaceholder.typicode.com/posts',
            expect.objectContaining({
                params: { id: 1 },
                headers: expect.objectContaining({ 'X-Custom-Header': 'Some custom text value'})
            })
        )
    });

    test('Error 404: should return "Not found" when URL is wrong', async () => {
        axios.get.mockRejectedValue({
            response: { status: 404 }
        })
        
        await expect(getPostWrongUrl(999)).rejects.toThrow('Not found')
    });

    test('Network Error: should handle generic network failure', async () => {
        axios.get.mockRejectedValue(new Error('Connection failed'))
        await expect(getPostWrongUrl(1)).rejects.toThrow('Network')
    });
});
