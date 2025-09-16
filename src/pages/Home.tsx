import ServerTable from "../components/ServerTable"
import { useDataContext } from "../contexts/data";
import Controls from "../components/Controls";

const Home = () => {
  const { data } = useDataContext();

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-800">Server Table</h1>
      </header>

      <Controls />

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
