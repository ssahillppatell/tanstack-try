import type { Server } from "../types/server"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { Column, ColumnFiltersState, SortingState, Table } from "@tanstack/react-table"
import { useState } from "react"
import HealthChip from "./HealthChip"

const columnHelper = createColumnHelper<Server>()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: info => info.getValue(),
    filterFn: "includesString"
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
    filterFn: 'inNumberRange',
  }),
  // Include createdAt as a hidden column so we can sort by it by default
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: info => info.getValue(),
  }),
]

const ServerTable = ({
  data,
}: {
    data: Server[]
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnFilters: true,
    initialState: {
      columnVisibility: {
        createdAt: false,
      },
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
                    <th key={header.id} className="text-left text-sm font-semibold text-slate-700 px-4 py-2 border-b border-slate-200 select-none align-bottom">
                      {header.isPlaceholder ? null : (
                        <div className="flex flex-col gap-1">
                          <button
                            className="inline-flex items-center gap-1 hover:text-slate-900 focus-visible:outline-none"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <span className="text-xs text-slate-500">
                              {sorted === 'asc' ? '▲' : sorted === 'desc' ? '▼' : ''}
                            </span>
                          </button>
                          {header.column.getCanFilter() && header.column.getIsVisible() ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </div>
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

function Filter({ column, table }: { column: Column<Server, unknown>, table: Table<Server> }) {
  const id = column.id

  if (id === 'health') {
    const value = (column.getFilterValue() as string | undefined) ?? ''
    return (
      <select
        className="mt-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
        value={value}
        onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      >
        <option value="">All</option>
        <option value="healthy">Healthy</option>
        <option value="disabled">Disabled</option>
        <option value="error">Error</option>
      </select>
    )
  }

  if (id === 'volume') {
    const val = (column.getFilterValue() as [number | undefined, number | undefined] | undefined) ?? [undefined, undefined]
    const [min, max] = val
    return (
      <div className="mt-1 flex items-center gap-1">
        <input
          type="number"
          placeholder="Min"
          className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
          value={min ?? ''}
          onChange={(e) => {
            const v = e.target.value
            column.setFilterValue([v === '' ? undefined : Number(v), max])
          }}
        />
        <span className="text-slate-400 text-xs">–</span>
        <input
          type="number"
          placeholder="Max"
          className="w-20 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
          value={max ?? ''}
          onChange={(e) => {
            const v = e.target.value
            column.setFilterValue([min, v === '' ? undefined : Number(v)])
          }}
        />
      </div>
    )
  }

  if (id === 'createdAt') {
    return null
  }

  const value = (column.getFilterValue() as string | undefined) ?? ''
  return (
    <input
      type="text"
      placeholder="Filter..."
      className="mt-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
      value={value}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
    />
  )
}

export default ServerTable
