import { transaction } from "./transaction";

const db: any = {};

db.transaction = transaction;

export { db };
