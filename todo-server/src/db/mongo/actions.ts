import { Model, Document } from "mongoose";
import { User } from "./schema";

export class MongoActions<T> {
  private _schema: Model<SchemaType<T>, {}>;

  constructor(schema: Model<SchemaType<T>, {}>) {
    this._schema = schema;
  }

  public create = (newValue: object) => {
    return this._schema.create(newValue);
  };

  public select = (fields: string, filter?: object) => {
    return this._schema.find(filter).select(fields);
  };

  public update = (filter: object, update: object) =>
    this._schema.update(filter, update);
}

export type SchemaType<T> = T & Document;
