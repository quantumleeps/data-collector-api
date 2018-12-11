import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.locationTableName,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            countryId: event.pathParameters.countryId,
            locationId: event.pathParameters.locationId
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET locationName = :locationName, description = :description, modifiedAt = :modifiedAt",
        ExpressionAttributeValues: {
            ":locationName": data.locationName || null,
            ":description": data.description || null,
            ":modifiedAt": Date.now()
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        return success({ status: true });
    } catch (e) {
        console.log(e)
        return failure({ status: false });
    }
}