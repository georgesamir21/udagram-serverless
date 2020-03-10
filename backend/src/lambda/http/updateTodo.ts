import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import 'source-map-support/register'
//import { parseUserId } from '../../auth/utils'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'


const docClient = new AWS.DynamoDB.DocumentClient()

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const todosTable = process.env.TODOS_TABLE

  const updateTodoParams = {
    TableName: todosTable,
    Key: { "todoId": todoId },
    UpdateExpression: "set #n = :a, dueDate = :b, done = :c",
    ExpressionAttributeValues:{
      ":a": updatedTodo['name'],
      ":b": updatedTodo.dueDate,
      ":c": updatedTodo.done
    },
    ExpressionAttributeNames:{
      "#n": "name"
    },
    ReturnValues:"UPDATED_NEW"
  }

const runthis = await docClient.update(updateTodoParams).promise()

return {
    statusCode: 201,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      runthis
    })
}
}