import * as AWS from 'aws-sdk'
import * as AWSXray from 'aws-xray-sdk'
import { TodoItem } from '../models/TodoItem'

const XAWS = AWSXray.captureAWS(AWS)

export class ToDoAccess {
  constructor(
    private docClient = new XAWS.DynamoDB.DocumentClient(),
    private todosTable = process.env.TODOS_TABLE
  ) {}

  async createToDo(toDoItem: TodoItem) {
    await this.docClient
      .put({
        TableName: this.todosTable,
        Item: toDoItem
      })
      .promise()
  }

  async getAllToDos(userId) {
    const result = await this.docClient
      .query({
        TableName: this.todosTable,
        IndexName: 'UserIdIndex',
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        },

        ScanIndexForward: false
      })
      .promise()

    const items = result.Items
    return items
  }

  async deleteToDoItem(toDoId) {
    await this.docClient
      .delete({
        TableName: this.todosTable,
        Key: {
          todoId: toDoId
        }
      })
      .promise()
  }
}
