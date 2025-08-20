import {Router} from 'express'
import userAuth from '../middlware/userAuth.middlware.js'
import { getUserData } from '../controllers/user.controller.js'
const userRouter = Router()

userRouter.route('/data').get(userAuth ,getUserData)


export default userRouter