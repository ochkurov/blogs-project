import {initApp} from './app'
import {SETTINGS} from './settings'
import {runDb} from "./db/mongoDb";


const app = initApp()


app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})

const startApp = async () => {

    const res = await runDb(SETTINGS.MONGO_URL)
    if (!res) process.exit(1)


    app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port !!' + SETTINGS.PORT)
    })
}

startApp()
