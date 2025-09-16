import FakeServerData from '../assets/fake.json' assert { type: "json" };
import type { Server } from '../types/server';
import { IndexedDb } from '../services/indexeddb';

const db = new IndexedDb('dotsec-db', 'servers');

const takeFirst = (count: number): Server[] =>
  (FakeServerData as Server[]).slice(0, count);

export const loadFirstNIntoDb = async (count: number): Promise<Server[]> => {
  const toLoad = takeFirst(count);
  await db.clear();
  await Promise.all(toLoad.map((s) => db.add(s)));
  return (await db.getAll()) as Server[];
}

export const loadAllIntoDb = async (): Promise<Server[]> => {
  const toLoad = FakeServerData as Server[];
  await db.clear();
  // Chunk to avoid creating too many concurrent IDB requests at once
  const chunkSize = 1000;
  for (let i = 0; i < toLoad.length; i += chunkSize) {
    const chunk = toLoad.slice(i, i + chunkSize);
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(chunk.map((s) => db.add(s)));
  }
  return (await db.getAll()) as Server[];
}

export const getAllFromDb = async (): Promise<Server[]> => {
  return (await db.getAll()) as Server[];
}

export const clearDb = async (): Promise<void> => {
  await db.clear();
}
