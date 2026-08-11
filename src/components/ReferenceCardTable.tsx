import type { RefCardRow } from "../lib/reference-card";

const PAGE_SIZE = 20;

type Props = {
  rows: RefCardRow[];
  page: number;
  totalRows: number;
  basePath: string;
};

export function ReferenceCardTable({ rows, page, totalRows, basePath }: Props) {
  const totalPages = Math.ceil(totalRows / PAGE_SIZE);
  const start = totalRows === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, totalRows);

  return (
    <div>
      <p>Showing {start}–{end} of {totalRows}</p>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Badge Name</th>
            <th>Training Unit</th>
            <th>Instrument</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.badgeCode}-${row.trainingUnitId}-${row.instrumentId}`}>
              <td>{row.badgeCode}</td>
              <td>{row.badgeName}</td>
              <td>{row.trainingUnitName}</td>
              <td>{row.instrumentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div>
          <a href={`${basePath}&page=${page - 1}`} aria-disabled={page === 1}>Previous</a>
          <a href={`${basePath}&page=${page + 1}`} aria-disabled={page === totalPages}>Next</a>
        </div>
      )}
    </div>
  );
}
