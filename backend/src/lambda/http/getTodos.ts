import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from 'aws-lambda'
import 'source-map-support/register'
import { parseUserId } from '../../auth/utils'
import { getAllTodos } from '../../business/todo'

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('EVENT:', event)

  const authHeader = event.headers.Authorization
  const authSplit = authHeader.split(' ')
  const userId = parseUserId(authSplit[1])

  const items = await getAllTodos(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}
