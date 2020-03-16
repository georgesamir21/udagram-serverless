import * as AWS from 'aws-sdk'
import * as AWSXray from 'aws-xray-sdk'

const XAWS = AWSXray.captureAWS(AWS)

export const docClient = new XAWS.DynamoDB.DocumentClient()

export const s3 = new AWS.S3({
  signatureVersion: 'v4'
})
