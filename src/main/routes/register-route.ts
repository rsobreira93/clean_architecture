import { Router } from 'express'
import { makeRegisterUserController } from '../factories/'
import { adaptRout } from '../config/adapters/'

export default (router: Router): void => {
  router.post('/register', adaptRout(makeRegisterUserController()))
}
