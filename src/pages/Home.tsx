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
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-800">Server Table</h1>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "ten" ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-400 hover:bg-blue-900"
            }`}
            onClick={handleLoad10}
            disabled={loading !== null}
          >
            {loading === "ten" ? "Loading…" : "Load 10 records"}
          </button>
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "all" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-700 hover:bg-slate-800"
            }`}
            onClick={handleLoadAll}
            disabled={loading !== null}
          >
            {loading === "all" ? "Loading…" : "Load all records"}
          </button>
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "clear" ? "bg-rose-600 hover:bg-rose-700" : "bg-red-300 hover:bg-red-700"
            }`}
            onClick={handleClear}
            disabled={loading !== null}
          >
            {loading === "clear" ? "Clearing…" : "Clear"}
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          <p className="text-sm">No data loaded. Use the buttons above to load sample records.</p>
        </div>
      ) : (
        <ServerTable data={data} />
      )}
    </div>
  )
}

export default Home
