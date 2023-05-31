import { HttpResponse } from '../interfaces'

export const created = (data: any):HttpResponse => ({
  statusCode: 201,
  body: data
})
