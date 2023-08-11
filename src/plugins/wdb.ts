import { version } from "../../package.json";

export default class web_sql {
  private db: any;
  private db_name: string;
  private tables: any[] = [
    {
      name: "resume",
      params: { keyPath: "id", autoIncrement: true },
      indexes: [
        {
          indexName: "id",
          keyPath: "id",
          objectParameters: { unique: true, multiEntry: true },
        },
      ],
    },
  ];
  private db_version: any = 1;
  private db_store_name: string = "publications";
  // prettier-ignore
  //@ts-ignore
  private indexedDB: any =  window.indexedDB || window?.mozIndexedDB || window?.webkitIndexedDB || window?.msIndexedDB;

  constructor(db_name: string, db_store_name: string) {
    this.db_name = db_name;
    this.db_store_name = db_store_name;
    this.db_version = +version.split(".").join("");
  }

  async insert(data: any) {
    const db: any = await this.#connect();
    return new Promise(
      (resolve: CallableFunction, reject: CallableFunction) => {
        const txn = db.transaction(this.db_store_name, "readwrite");
        const store = txn.objectStore(this.db_store_name);
        const req = store.add(data);

        req.onsuccess = (event: any) => {
          resolve(event.target.result);
        };
        req.onerror = (event: any) => {
          reject(event.target);
        };
        txn.oncomplete = () => {
          db.close();
        };
      }
    );
  }

  async update(id: number, data: any) {
    const db: any = await this.#connect();
    return new Promise(
      async (resolve: CallableFunction, reject: CallableFunction) => {
        const txn: IDBTransaction = db.transaction(
          this.db_store_name,
          "readwrite"
        );
        const store: IDBObjectStore = txn.objectStore(this.db_store_name);
        const index: IDBIndex = store.index("id");

        const req = index.get(id);

        req.onsuccess = () => {
          let Obj = { ...req.result, ...data };
          const updateRequest = store.put(Obj);

          updateRequest.onsuccess = () => {
            resolve(this.find("id", id));
          };
          updateRequest.onerror = () => {
            console.log(updateRequest.error);
          };
        };
        req.onerror = () => {
          reject(req.error);
        };

        txn.oncomplete = () => {
          db.close();
        };
      }
    );
  }

  async getAll(indexName?: any, indexValues?: any[]) {
    const db: any = await this.#connect();
    return new Promise(
      (resolve: CallableFunction, reject: CallableFunction) => {
        const txn: IDBTransaction = db.transaction(
          this.db_store_name,
          "readonly"
        );
        const store: IDBObjectStore = txn.objectStore(this.db_store_name);

        if (typeof indexName !== "undefined") {
          const arr: any = [];
          const index: IDBIndex = store.index(indexName);
          indexValues?.forEach((el: any) => {
            const req = index.getAll(el);
            req.onsuccess = (event: any) => arr.push(...event.target.result);
            req.onerror = (event: any) => reject(event.target.error);
          });
        } else {
          const req = store.getAll();
          req.onsuccess = (event: any) => resolve(event.target.result);
          req.onerror = (event: any) => reject(event.target.error);
        }

        txn.oncomplete = () => {
          db.close();
        };
      }
    );
  }

  async find(indexName: any, indexValue: any) {
    const db: any = await this.#connect();
    return new Promise(
      async (resolve: CallableFunction, reject: CallableFunction) => {
        const txn = db.transaction([this.db_store_name], "readonly");
        const store: IDBObjectStore = txn.objectStore(this.db_store_name);
        const index: IDBIndex = store.index(indexName);

        const req = index.get(indexValue);

        req.onsuccess = (event: any) => {
          resolve(req.result);
        };
        req.onerror = (event: any) => {
          reject(req.error);
        };

        txn.oncomplete = () => {
          db.close();
        };
      }
    );
  }

  #connect() {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(this.db_name, this.db_version);
      request.onerror = (event: any) =>
        console.error("Database error: " + event.target.errorCode);
      request.onsuccess = (event: any) => resolve(event.target.result);
      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result;
        this.#addIndex();
      };
    });
  }
  #addIndex() {
    this.tables.forEach((el: any) => {
      if (!Object.values(this.db?.objectStoreNames).includes(el.name)) {
        const table = this.db.createObjectStore(el.name, el.params);
        el.indexes.forEach((idx: any) => {
          table.createIndex(idx.indexName, idx.keyPath, idx.objectParameters);
        });
      }
    });
  }
}
