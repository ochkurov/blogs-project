import request from 'supertest';
import {initApp} from "../../src/app";
import {runDb} from "../../src/db/mongoDb";
import {SETTINGS} from "../../src/settings";


const app = initApp()
const basicAdminCreds = Buffer.from('admin:qwerty').toString('base64');
const basicAdminHeader: [string, string] = ['Authorization', `Basic ${basicAdminCreds}`]
const bearerUserHeader = (accessToken: string): [string, string] => ['Authorization', `Bearer ${accessToken}`]

describe('create user', () => {
    beforeEach(async () => {
        await runDb(SETTINGS.MONGO_URL)
        await request(app)
            .delete('/testing/all-data')
            .set(...basicAdminHeader)
            .expect(204)
    })
    it('should create user', async  () => {
        console.log(basicAdminCreds)
        const createUserDto = {
            login: 'somelog',
            email: 'someemail@gmail.com',
            password: 'somessword'
        }

        const allUsersBeforeCreate = await request(app)
            .get('/users')
            .set(...basicAdminHeader)
            .expect(200)k

        expect(allUsersBeforeCreate.body.items.length).toBe(0)

        const createResponse = await request(app)
            .post('/users')
            .set(...basicAdminHeader)
            .send(createUserDto)
            .expect(201)
        console.log(createResponse.body, 'createResponse')


        const allUsersAfterCreate = await request(app)
            .get('/users')
            .set(...basicAdminHeader)
            .expect(200)

        expect(allUsersAfterCreate.body.items.length).toBe(1)
        expect(allUsersAfterCreate.body.items[0]).toStrictEqual(createResponse.body)
    })
    it('should login created user', async  () => {
        console.log(basicAdminCreds)
        const createUserDto = {
            login: 'somelog',
            email: 'someemail@gmail.com',
            password: 'somessword'
        }

        const loginDTo = {
            loginOrEmail: createUserDto.login,
            password: createUserDto.password
        }

        const createResponse = await request(app)
            .post('/users')
            .set(...basicAdminHeader)
            .send(createUserDto)
            .expect(201)
        console.log(createResponse.body, 'createResponse')

         await request(app)
            .post('/auth/login')
            .send({
                loginOrEmail: 'golova',
                password: 'golovs'
            })
            .expect(401)

        const loginResponse = await request(app)
            .post('/auth/login')
            .send(loginDTo)
            .expect(200)

        const userAccessToken = loginResponse.body.accessToken
        expect(userAccessToken).not.toBeUndefined()
        expect(userAccessToken).toEqual(expect.stringContaining('.'))

        const userRefreshToken = loginResponse.headers['set-cookie'][0]
        console.log(userRefreshToken)
        expect(userRefreshToken).not.toBeUndefined()
        expect(userRefreshToken).toEqual(expect.stringContaining('.'))
    })
})
