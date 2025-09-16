import type { Server } from "../types/server"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import HealthChip from "./HealthChip"

const columnHelper = createColumnHelper<Server>()

const columns = [
  columnHelper.accessor("id", {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("name", {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("location", {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("health", {
    cell: info => <HealthChip type={info.getValue()} />,
  }),
  columnHelper.accessor("ip", {
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("volume", {
    cell: info => info.getValue(),
  })
]

const ServerTable = ({
  data,
}: {
    data: Server[]
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-slate-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-left text-sm font-semibold text-slate-700 px-4 py-3 border-b border-slate-200">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-white even:bg-slate-50/40">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-sm text-slate-800 border-b border-slate-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ServerTable
