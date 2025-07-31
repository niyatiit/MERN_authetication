import {Router} from 'express'
import { login , register , logout, sendVerifyOtp, verifyEmail, isAuthenticated } from "../controllers/auth.controller.js";
import userAuth from '../middlware/userAuth.middlware.js';

const router= Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/send-verify-otp').post(userAuth,sendVerifyOtp)
router.route('/verify-account').post(userAuth,verifyEmail)
router.route('/is-auth').post(userAuth , isAuthenticated)

export default router