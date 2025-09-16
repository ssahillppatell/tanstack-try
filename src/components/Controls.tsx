import { useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import { useDataContext } from "../contexts/data";
import { addRecordToDb, clearDb, loadAllIntoDb, loadFirstNIntoDb } from "../utils/data";

const Controls = () => {
  const { setData } = useDataContext();
  const [loading, setLoading] = useState<null | "ten" | "all" | "clear" | "add">(null);
  const [open, setOpen] = useState(false);

  const handleLoad10 = async () => {
    try {
      setLoading("ten");
      const result = await loadFirstNIntoDb(10);
      setData(result);
    } finally {
      setLoading(null);
    }
  };

  const handleLoadAll = async () => {
    try {
      setLoading("all");
      const result = await loadAllIntoDb();
      setData(result);
    } finally {
      setLoading(null);
    }
  };

  const handleClear = async () => {
    try {
      setLoading("clear");
      await clearDb();
      setData([]);
    } finally {
      setLoading(null);
    }
  };

  const handleAdd = async (values: Parameters<typeof addRecordToDb>[0]) => {
    try {
      setLoading("add");
      const result = await addRecordToDb(values);
      setData(result);
      setOpen(false);
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "ten" ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-400 hover:bg-blue-900"
            }`}
            onClick={handleLoad10}
            disabled={loading !== null}
          >
            {loading === "ten" ? "Loading…" : "Load 10 records"}
          </button>
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "all" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-700 hover:bg-slate-800"
            }`}
            onClick={handleLoadAll}
            disabled={loading !== null}
          >
            {loading === "all" ? "Loading…" : "Load all records"}
          </button>
          <button
            className={`px-3 py-2 rounded text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[.98] ${
              loading === "clear" ? "bg-rose-600 hover:bg-rose-700" : "bg-red-300 hover:bg-red-700"
            }`}
            onClick={handleClear}
            disabled={loading !== null}
          >
            {loading === "clear" ? "Clearing…" : "Clear"}
          </button>
          <button
            className="px-3 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 active:scale-[.98]"
            onClick={() => setOpen(true)}
            disabled={loading !== null}
          >
            Add Data
          </button>
        </div>
      </div>

      <Modal open={open} title="Add Server" onClose={() => setOpen(false)}>
        <Form onSubmit={handleAdd} onCancel={() => setOpen(false)} />
      </Modal>
    </>
  )
}

export default Controls

