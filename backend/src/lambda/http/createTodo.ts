import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import 'source-map-support/register'
import * as uuid from 'uuid'
import { parseUserId } from '../../auth/utils'
import { createTodo } from '../../business/todo'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('EVENT:', event)

  const todoId = uuid.v4()

  const parsedBody = JSON.parse(event.body)

  const authHeader = event.headers.Authorization
  const authSplit = authHeader.split(' ')
  const token = authSplit[1]

  console.log('test', token)

  const toDo = {
    todoId: todoId,
    userId: parseUserId(token),
    ...parsedBody
  }

  const item = await createTodo(toDo)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item
    })
  }
}
