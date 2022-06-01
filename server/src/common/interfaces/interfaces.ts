export interface CRUD {
    create?: (resource: any, collection: string) => Promise<any>,
    createOrder?: (resource: any) => Promise<any>,
    updateById?: (id: string, collection: string, resource: any) => Promise<string>;
    getById?: (id: string, collection: string) => Promise<any>;
    get?: (collection: string) => Promise<any>;
    updateCollectionStore?: (resource: any) => Promise<string>;
    authentication?: (resource: any) => Promise<any>;
};