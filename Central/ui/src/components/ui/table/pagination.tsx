
import type {
    Table as ReactTable,
  } from '@tanstack/react-table';
import Button from '../button';
import { CaretIcon, SkipIcon } from '../icons';
import styles from './table.module.css';
export default function Pagination<T>({
    table,
  }: React.PropsWithChildren<{
    table: ReactTable<T>;
  }>) {
    return (
      <div className={styles['paginationWrapper']}>
        <Button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
        <span className={styles['prev']}>
            <SkipIcon width='18' height='18' fill={'var(--color-monochrome-base)'}/>
            </span>
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className={styles['left']}><CaretIcon width='18' height='18' fill={'var(--color-monochrome-base)'} /></span>
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
         <span className={styles['right']}><CaretIcon width='18' height='18' fill={'var(--color-monochrome-base)'} /></span> 
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className={styles['next']}>            <SkipIcon width='18' height='18' fill={'var(--color-monochrome-base)'}/>
</span>
        </Button>
        <span className={styles['paginationFooter']}>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
      </div>
    );
  };