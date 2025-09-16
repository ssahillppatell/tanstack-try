import { useState } from "react"
import ServerTable from "../components/ServerTable"
import type { Server } from "../types/server";
import FakeServerData from '../assets/fake.json';

const initialData = FakeServerData.slice(0, 10) as Server[];

const Home = () => {
  const [data, setData] = useState<Server[]>(initialData);
  return (
    <div>
      <ServerTable data={data} />
    </div>
  )
}

export default Home
