﻿const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { 
        id: 1, 
        username: 'test', 
        password: 'test', 
        firstName: 'Test', 
        lastName: 'User' 
    }, 
    { 
        id: 2, 
        username: 'test2', 
        password: 'test2', 
        firstName: 'Test2', 
        lastName: 'User2' 
    }, 
    { 
        id: 3, 
        username: 'test3', 
        password: 'test3', 
        firstName: 'Test3', 
        lastName: 'User3' 
    }, 
];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
