// Simple test to verify login functionality
const fetch = require('node-fetch');

async function testLogin() {
    try {
        // Test with correct credentials
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'abc123@gmail.com',
                password: 'abcd@123'
            })
        });

        const data = await response.json();
        console.log('Login test result:', data);

        // Test with wrong credentials
        const response2 = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'wrong@email.com',
                password: 'wrongpass'
            })
        });

        const data2 = await response2.json();
        console.log('Wrong credentials test:', data2);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testLogin();