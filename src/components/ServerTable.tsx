import type { Server } from "../types/server"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { SortingState } from "@tanstack/react-table"
import { useState } from "react"
import HealthChip from "./HealthChip"

const columnHelper = createColumnHelper<Server>()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("health", {
    header: "Health",
    cell: info => <HealthChip type={info.getValue()} />,
  }),
  columnHelper.accessor("ip", {
    header: "IP Address",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("volume", {
    header: "Volume",
    cell: info => <span className="tabular-nums">{info.getValue()}</span>,
  })
]

const ServerTable = ({
  data,
}: {
    data: Server[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  })
  
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th key={header.id} className="text-left text-sm font-semibold text-slate-700 px-4 py-3 border-b border-slate-200 select-none">
                      {header.isPlaceholder ? null : (
                        <button
                          className="inline-flex items-center gap-1 hover:text-slate-900 focus-visible:outline-none cursor-pointer"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-xs text-slate-500">
                            {sorted === 'asc' ? '▲' : sorted === 'desc' ? '▼' : ''}
                          </span>
                        </button>
                      )}
                    </th>
                  )
                })}
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

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Rows per page</label>
          <select
            className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-800"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 text-sm rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              « First
            </button>
            <button
              className="px-2 py-1 text-sm rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              ‹ Prev
            </button>
            <button
              className="px-2 py-1 text-sm rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next ›
            </button>
            <button
              className="px-2 py-1 text-sm rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last »
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerTable
