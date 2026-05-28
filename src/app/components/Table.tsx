import { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

export function Table<T>({ columns, data, emptyMessage = 'No data available', className }: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[#5E6072]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b border-[#DFDFE3] bg-[#F7F7F8]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-3 lg:px-4 py-3 text-left text-xs lg:text-sm font-medium text-[#33363F]',
                  column.width
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#DFDFE3] last:border-b-0 hover:bg-[#F7F7F8] transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-3 lg:px-4 py-3 text-xs lg:text-sm text-[#000000]">
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
