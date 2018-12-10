import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "country-table"
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    if (result) {
      // Return the retrieved item
      return success(result);
    } else {
      return failure({ status: false, error: "No items found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
