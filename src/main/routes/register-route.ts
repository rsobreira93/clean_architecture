import { Router } from 'express'
import { makeRegisterUserController } from '../factories/'
import { adaptRoute } from '../config/adapters/'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
}
