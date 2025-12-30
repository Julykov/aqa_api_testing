const axios = require('axios');

describe('Functional Tests - POST', () => {
    describe('POST /posts', () => {
        test('should create new user with all fields', async () => {
            const newUser = {
                'userId': 99,
                'id': 100,
                'title': 'Some title for record User',
            }
            
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts/',
                newUser,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            
            expect(response.status).toEqual(201);
            expect(response.data.userId).toEqual(newUser.userId);
            console.log(response.data);
        })
    });


    describe('POST /comments', () => {
        test('should create new comments with all fields', async () => {
            const newComment = {
                'postId': 120,
                'id': 130,
                'name': 'Some name',
                'email': 'some_email@gmail.com',
                'body': 'Some text for body',
            }
            
            const response = await axios.post('https://jsonplaceholder.typicode.com/comments/',
                newComment,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            
            expect(response.status).toEqual(201);
            expect(response.data.name).toEqual(newComment.name);
            expect(response.data).toHaveProperty('email')
            console.log(response.data);
        })
    });
})
