import { useAppDispatch, useAppSelector } from "src/redux/storeHooks";
import "./DocumentsTable.style.scss";
import { useEffect, useState } from "react";
import { rowType } from "src/redux/store.types";
import DocumentRow from "./components/DocumentRow/DocumentRow";
import { createRow } from "src/redux/rowsSlice";

export interface tableRowProps extends rowType {
  level: number;
  childsBefore: number;
}

export default function DocumentsTable() {
  const rows = useAppSelector((state) => state.rowsSlice.rows);
  const [rowsElements, setRowsElements] = useState<JSX.Element[]>([]);
  const dispatch = useAppDispatch();

  const toFlatArray = (dataRows: rowType[]) => {
    const resultArray: tableRowProps[] = [];

    const foreachFn = (rows: rowType[], level: number) => {
      rows.forEach((row, i) => {
        const childsBefore = resultArray.reverse().reduce(
          (acc, row) => {
            if (row.level < level) acc.skip = true;
            if (!acc.skip) acc.total += +!!(row.level >= level);
            return acc;
          },
          { skip: false, total: 0 }
        ).total;

        resultArray.reverse();

        resultArray.push({
          ...row,
          level: level,
          childsBefore: level === 0 ? -1 : childsBefore,
        });

        if (row.child.length) {
          foreachFn(row.child, level + 1);
        }
      });
    };

    foreachFn(dataRows, 0);
    return resultArray;
  };

  const createTableRows: (rows: tableRowProps[]) => JSX.Element[] = (rows: tableRowProps[]) => {
    return rows.map((row, i) => (
      <DocumentRow
        key={`${row.id}${i}${row.level}${row.rowName}${row.salary}${row.equipmentCosts}${row.overheads}${row.estimatedProfit}`}
        row={row}
      />
    ));
  };
  console.log(rows);
  useEffect(() => {
    if (!rows.length) dispatch(createRow(2));
    else if (rows[rows.length - 1].id !== 2) dispatch(createRow(2));
    else setRowsElements(createTableRows(toFlatArray(rows)));
  }, [rows]);

  return (
    <div className="doc_table_wrapper">
      <div className="table_info_panel">
        <span className="project_label">Строительно-монтажные работы</span>
      </div>
      <div className="table_container">
        <table className="documents_table">
          <tr>
            <th className="th_level">Уровень</th>
            <th className="th_name">Наименование работ</th>
            <th className="th_salary">Основная з/п</th>
            <th className="th_equipment">Оборудование</th>
            <th className="th_overheads">Накладные расходы</th>
            <th className="th_profit">Сметная прибыль</th>
          </tr>
          {rowsElements}
        </table>
      </div>
    </div>
  );
}
