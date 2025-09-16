import ServerTable from "../components/ServerTable"
import { useDataContext } from "../contexts/data";

const Home = () => {
  const { data } = useDataContext();
  return (
    <div>
      <ServerTable data={data} />
    </div>
  )
}

export default Home
