import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import { getCoreRowModel, useReactTable, flexRender,  SortingState,} from '@tanstack/react-table';
import type { PaginationState,} from '@tanstack/react-table';
import classNames from 'classnames';
import { ReactTableProps } from './type';
import Pagination from './pagination';
import styles from './table.module.css';
import classnames from 'classnames';
export const Table = <T extends object>({
  data,
  columns,
  renderSubComponent,
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
  showPagination =  false,
  className,
  containerClassName
}: ReactTableProps<T>) => {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 7,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, onPaginationChange]);
  const classes = classnames(styles['table'], containerClassName);
  return (
    <div className={styles['tableWrapper']}>
          <div className={classes}>
            <table className={className} style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}  style={{
                        width:
                          header.getSize() !== 150 ? header.getSize() : undefined,
                      }}>
                        {header.isPlaceholder
                          ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      className={classNames({
                        'bg-gray-50 transition-colors dark:bg-black-300':
                          row.getIsExpanded(),
                      })}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          style={{
                            width: cell.column.getSize(),
                          }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>

                    {renderSubComponent ? (
                      <tr key={row.id + '-expanded'}>
                        <td colSpan={columns.length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
        </div>
        {showPagination && <Pagination table={table} />}
        </div>
  );
};
