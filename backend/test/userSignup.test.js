const request = require('supertest');
const app = require('../app');
const db = require('../config/db');
const { userSignup } = require('../controllers/user')
const { loginuser } = require('../controllers/auth')
const { resetPassword } = require('../controllers/resetPassword');
const Server = require('../server')

// Pass supertest agent for each test
// const agent = request.agent(Server);

console.log(db)
// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

// unit testing 
// user signup

it('it should create a new user', async () => {
    let bodyData = {
        body: {
            "name": "Rani Solanki",
            "email": "rani19@navgurukul.org",
            "password": "7234582651",
            "isAdmin": true
        }
    }
    try {
        const responce = await userSignup(bodyData)
        expect(responce.statusCode).toBe(200)
    } catch (err) {
        console.log(err)
    }
})

// usersign 
it('it should be user signin', async () => {
    let bodyData = {
        body: {
            "email": "rani19@navgurukul.org",
            "password": "7234582651"
        }
    }
    try {
        const res = await loginuser(bodyData)
        expect(res.statusCode).toBe(200)
    } catch (err) {
        console.log("failed user",err)
    }
})

// // resetpassword
it('it should be user signin', async () => {
    let bodyData = {
        body: {
            "email": "rani19@navgurukul.org"
        }
    }
    try {
        const res = await resetPassword(bodyData)
        expect(res.statusCode).toBe(200)
    } catch (err) {
        console.log("res useet password failed", err)
    }
})

// api testing 
it("user should be create new user", async () => {
    const res = await request(Server).post('/api/users/signup').send({
            name: "Gyandeep",
            email: "gyandeep5364@gmail.com",
            password: "12345677346",
            isAdmin: false
        })
    expect(res.statusCode).toBe(200)
    console.log(err.statusCode)
})

// user login 
it("user should be able to login", async () => {
    const res = await request(Server).post('/api/auth/login').send({
        name: "Gyandeep",
        email: "gyandeep5364@gmail.com",
        password: "12345677346",
        isAdmin: false
    })
    expect(res.statusCode).toBe(200)
    console.log(err.statusCode)
})


