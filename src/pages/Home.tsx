import ServerTable from "../components/ServerTable"
import { useDataContext } from "../contexts/data";
import { clearDb, loadAllIntoDb, loadFirstNIntoDb } from "../utils/data";
import { useState } from "react";

const Home = () => {
  const { data, setData } = useDataContext();
  const [loading, setLoading] = useState<null | "ten" | "all" | "clear">(null);

  const handleLoad10 = async () => {
    try {
      setLoading("ten");
      const result = await loadFirstNIntoDb(10);
      setData(result);
    } finally {
      setLoading(null);
    }
  }

  const handleLoadAll = async () => {
    try {
      setLoading("all");
      const result = await loadAllIntoDb();
      setData(result);
    } finally {
      setLoading(null);
    }
  }

  const handleClear = async () => {
    try {
      setLoading("clear");
      await clearDb();
      setData([]);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded bg-gray-800 text-white disabled:opacity-60"
          onClick={handleLoad10}
          disabled={loading !== null}
        >
          {loading === "ten" ? "Loading…" : "Load 10 records"}
        </button>
        <button
          className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
          onClick={handleLoadAll}
          disabled={loading !== null}
        >
          {loading === "all" ? "Loading…" : "Load all records"}
        </button>
        <button
          className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-60"
          onClick={handleClear}
          disabled={loading !== null}
        >
          {loading === "clear" ? "Clearing…" : "Clear"}
        </button>
      </div>
      <ServerTable data={data} />
    </div>
  )
}

export default Home
