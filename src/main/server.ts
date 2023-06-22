import 'module-alias/register'
import { mongoHelper } from '@/external/repositories/mongodb/helper'

mongoHelper.connect('mongodb://localhost:27017')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(3000, () => console.log('Server is running on http://localhost:3000'))
  })
  .catch(console.error)
