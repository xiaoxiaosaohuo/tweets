"use client"
import {useState,Fragment} from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  ExpandedState
} from "@tanstack/react-table"
import Error_Loading from '@/components/error-loading';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "@/components/data-table-pagination"
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  renderExpandedRow?: (row: any,visibleColumnLength:number) => JSX.Element,
  setPageIndex?: (pageIndex: number) => void,
  pageIndex?:number,
  total?:number,
  isLoading:boolean,
  pagination?:boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  renderExpandedRow,
  setPageIndex,
  pageIndex,
  total,
  isLoading,
  pagination=true
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    state: {
      expanded,
    },
    manualPagination:true,
    onExpandedChange: setExpanded,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <>
    <div className="overflow-x-auto rounded-md border">
      <Table className=''>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) =>{

              const visibleColumnLength = table.getVisibleFlatColumns().length;
            return (
              <Fragment key={row.id}>
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {

                  return (
                    <TableCell key={cell.id}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  )}
                )}

              </TableRow>

              {(row.getIsExpanded() && renderExpandedRow) ? (
                 renderExpandedRow(row,visibleColumnLength)
                ) : null}
              </Fragment>
            )
            }
            )
          ) : isLoading? (
             <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
               <Error_Loading></Error_Loading>
              </TableCell>
            </TableRow>


          ):(
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-server-crash"><path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><path d="M6 6h.01"/><path d="M6 18h.01"/><path d="m13 6-4 6h6l-4 6"/></svg>
                </div>

                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
    {pagination && <DataTablePagination table={table} setPageIndex={setPageIndex} pageIndex={pageIndex} total={total}/>}
    </>
  )
}
