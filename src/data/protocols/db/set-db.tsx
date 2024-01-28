export namespace SetDb {
  export type Params<Key extends string = string, Value = any> = { [key in Key]: Value }
  export type Result<Result = any> = { result: Result }
}

export interface SetDb<Key extends string = string, Value = any, Result = any> {
  request: (data: SetDb.Params<Key, Value>) => Promise<SetDb.Result<Result>>
}
