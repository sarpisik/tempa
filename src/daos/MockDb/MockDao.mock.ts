import jsonfile from 'jsonfile';

export class MockDaoMock {
    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected openDb(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected saveDb(db: unknown): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}
