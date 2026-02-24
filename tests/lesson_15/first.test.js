
const { getPostWrongUrl } = require('../../src/apiService');


describe('Check request ', () => {
    test('should throw "Post not found" for non-existent id', async () => {
        await expect(getPostWrongUrl(101)).rejects.toThrow('Not found');       
    });
});
