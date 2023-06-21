import { Router } from 'express'
import { makeRegisterAndSendEmailController } from '../factories/'
import { adaptRoute } from '../adapters/'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterAndSendEmailController()))
}
