export class IndexedDb {
  private db: IDBDatabase | null = null;
  private ready: Promise<void>;
  private storeName: string;

  constructor(dbName: string, storeName: string) {
    this.storeName = storeName;
    this.ready = new Promise((resolve, reject) => {
      const req = window.indexedDB.open(dbName, 1);

      req.onerror = () => reject("Failed to open IndexedDb");

      req.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      req.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id" });
        }
      };
    });
  }

  private async getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
    await this.ready;
    if (!this.db) throw new Error("DB not initialized");
    const tx = this.db.transaction(this.storeName, mode);
    return tx.objectStore(this.storeName);
  }

  async add(value: any): Promise<IDBValidKey> {
    const store = await this.getStore("readwrite");
    return new Promise((resolve, reject) => {
      const req = store.add(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async get(id: IDBValidKey): Promise<any> {
    const store = await this.getStore("readonly");
    return new Promise((resolve, reject) => {
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async getAll(): Promise<any[]> {
    const store = await this.getStore("readonly");
    return new Promise((resolve, reject) => {
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async update(value: any): Promise<void> {
    const store = await this.getStore("readwrite");
    return new Promise((resolve, reject) => {
      const req = store.put(value);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async delete(id: IDBValidKey): Promise<void> {
    const store = await this.getStore("readwrite");
    return new Promise((resolve, reject) => {
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}
