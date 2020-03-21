import "reflect-metadata";
import {createConnection} from "typeorm";

export default class ConnectionManager {

    private _config: any;
    private _defaultConnection: string;
    private _connectionsCollection: any;

    public constructor(ormConfig: any) {
        this._config = ormConfig;
        this._defaultConnection = ormConfig.default_connection;
        this._connectionsCollection = {};
        this.initializeConnections();
    }

    public async initializeConnections() {
        for (const connection in this._config.connections) {
            const connectionConfig = this._config.connections[connection];
            const dbConnection = await createConnection(connectionConfig);
            this._connectionsCollection[connection] = dbConnection;
        }
    }

    public getConnection(connectionName?: string) {
        if (!connectionName) {
            return this._connectionsCollection[this._defaultConnection];
        }
        if (!this._connectionsCollection[connectionName]) {
            return null;
        }
        return this._connectionsCollection[connectionName];
    }
}