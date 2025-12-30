const axios = require('axios')
const { faker } = require('@faker-js/faker');
const MockAdapter = require('axios-mock-adapter');



let userId = Number(faker.random.numeric({length: {max: 2}}))
let postId = Number(faker.random.numeric({length: {max: 3}}))
let postTitle = faker.internet.lorem
let postBody = faker.lorem.sentence(30)


describe('Testing of API with real endpoint and mocked data', () => {
    test('should create new post with all fields', async () => {
        const newPost = {
            'userId': userId,
            'id': postId,
            'title': postTitle,
            'body': postBody
        }
        
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts/',
            newPost,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        
        console.log(response.data);
        expect(response.status).toEqual(201);
        expect(typeof response.data.userId).toBe('number')
    })


    test('get post by id and compare values', async() => {
        const getPost = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        
        console.log(getPost.data);
        expect(postId).toEqual(getPost.data.id)
        expect(userId).toEqual(getPost.data.userId)
        expect(postTitle).toEqual(getPost.data.title)
        expect(postBody).toEqual(getPost.data.body)
        }
    )

})


const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

describe('Api testing with mocked endpoints and data', () => {
    
    // Clear mocks after each test
    afterEach(() => {
        mock.reset();
    });

    test('Succesfull request: getting user data', async () => {
        const mockData = {
            id: 1,
            name: faker.internet.userName(),
            email: faker.internet.email()
        };

        mock.onGet('https://api.example.com/user/1').reply(200, mockData);
        const response = await axios.get('https://api.example.com/user/1');

        expect(response.status).toBe(200);
        expect(response.data.name).toEqual(mockData.name);
        console.log('Mock worked successfully:', response.data);
    });

    test('Request error source not found', async () => {
        mock.onGet('https://api.example.com/user/999').reply(404, {
            message: 'User not found'
        });

        try {
            await axios.get('https://api.example.com/user/999');
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe('User not found');
            console.log('Test of error is successful');
        }
    });

    test('Internal server error)', async () => {
        mock.onPost('https://api.example.com/posts').reply(500);

        try {
            await axios.post('https://api.example.com/posts', { title: 'Test' });
        } catch (error) {
            expect(error.response.status).toBe(500);
            console.log('Server fail happened');
        }
    });
});