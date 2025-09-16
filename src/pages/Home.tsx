import ServerTable from "../components/ServerTable"
import { useDataContext } from "../contexts/data";
import Controls from "../components/Controls";

const Home = () => {
  const { data } = useDataContext();

  return (
    <div className="mx-auto max-w-6xl py-6 pt-4 space-y-4">
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
