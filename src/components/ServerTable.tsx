import type { Server } from "../types/server"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

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
    cell: info => info.getValue(),
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
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
