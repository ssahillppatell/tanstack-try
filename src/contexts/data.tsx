import React, { createContext, useContext, useState } from "react";
import type { Server } from '../types/server';

export interface IDataContext {
  data: Server[];
  setData: React.Dispatch<React.SetStateAction<Server[]>>
}

export const DataContext = createContext<IDataContext>({
  data: [],
  setData: () => {}
});

export const DataContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [data, setData] = useState<Server[]>([])

  return (
    <DataContext.Provider value={{ data, setData }}>
      { children }
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  if (!DataContext) {
    throw new Error('DataContext is not defined')
  }

  return useContext(DataContext)
}
