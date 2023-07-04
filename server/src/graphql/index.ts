import { mergeSchemas } from "@graphql-tools/schema";

import userSchema from "./user";

const mergedSchema = mergeSchemas({
  schemas: [userSchema]
});

export default mergedSchema;
