export class DbQueries {
  private _mainDbQueries: DbAction;
  private _backupDbQueries: DbAction;

  constructor(mainDbQueries: DbAction, backupDbQueries: DbAction) {
    this._mainDbQueries = mainDbQueries;
    this._backupDbQueries = backupDbQueries;
  }

  public save = async (queryType: QueriesType, values: any[]) => {
    try {
      const result = await this._mainDbQueries.execute(queryType, values);

      return this._backupDbQueries.execute(queryType, result[0] || values);
    } catch (error) {
      console.log(error.message);

      throw error;
    }
  };

  public get = async (queryType: QueriesType, values?: any[]) => {
    try {
      return await this._backupDbQueries.execute(queryType, values);
    } catch (error) {
      console.log("Main db faild", error.message);
    }
    try {
      return await this._backupDbQueries.execute(queryType, values);
    } catch (error) {
      console.log("Backup db faild", error.message);

      throw error;
    }
  };
}

export interface DbAction {
  execute: (queryType: QueriesType, values?: any) => Promise<any>;
}

export enum QueriesType {
  INSERT_USER,
  SELECE_USERS,
  DELETE_TASK,
  INSERT_TASK,
  UPDATE_TASK,
  SELECT_TASKS_BY_USER,
}
