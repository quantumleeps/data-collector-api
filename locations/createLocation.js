import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.locationTableName,
        Item: {
            locationName: data.locationName,
            id: uuid.v1(),
            creatorId: event.requestContext.identity.cognitoIdentityId,
            country: data.country,
            description: data.description,
            equipmentNodeTree: [null],
            createdAt: Date.now(),
            modifiedAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e)
        return failure({ status: false });
    }
}
