import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";
import "./DocumentRow.style.scss";
import { shallowEqual } from "react-redux";
import { setEditId, setFields } from "src/redux/editSlice";
import { useAppDispatch, useAppSelector } from "src/redux/storeHooks";
import DocumentActions from "../DocumentActions/DocumentActions";
import { tableRowProps } from "../../DocumentsTable";
import { createRowRequest, deleteRow, updateRowRequest } from "src/redux/rowsSlice";
import { rowForRequestType } from "src/redux/store.types";

export default function DocumentRow({ row }: { row: tableRowProps }) {
  const [element, setElement] = useState<JSX.Element>();
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { editId, fields } = useAppSelector((state) => state.editSlice, shallowEqual);

  const onInputHandle = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFields({ ...fields, [event.target.name]: event.target.value }));
  };

  const onKeyDownHandle = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const resultRowObject: rowForRequestType = {
        equipmentCosts: fields.equipmentCosts === undefined ? 0 : +fields.equipmentCosts,
        estimatedProfit: fields.estimatedProfit === undefined ? 0 : +fields.estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: fields.overheads === undefined ? 0 : +fields.overheads,
        rowName: fields.rowName,
        salary: fields.salary === undefined ? 0 : +fields.salary,
        supportCosts: 0,
      };

      if (row.id === 1 || row.id === 2) {
        resultRowObject.parentId = fields.parentId;
        dispatch(createRowRequest(resultRowObject));
      } else
        row.id &&
          dispatch(
            updateRowRequest({
              rowId: row.id,
              row: resultRowObject,
            })
          );

      dispatch(setEditId({ editId: 0 }));
    }
  };

  const onDoubleClickHandle = () => {
    row.level === -1 ? dispatch(deleteRow(2)) : dispatch(deleteRow(1));
    dispatch(setEditId({ editId: editId === row.id ? 0 : row.id, parentId: null }));
    dispatch(
      setFields({
        rowName: row.rowName,
        salary: row.salary,
        equipmentCosts: row.equipmentCosts,
        overheads: row.overheads,
        estimatedProfit: row.estimatedProfit,
      })
    );
  };

  useEffect(() => {
    setElement(
      <tr
        key={row.id}
        className={`tr_document ${(row.id === 2 && editId !== 2) || "draw_border"} `}
        onDoubleClick={onDoubleClickHandle}
      >
        <td style={{ position: "relative" }}>{row.id !== 2 && <DocumentActions row={row} />}</td>
        {editId === row.id ? (
          <>
            <td>
              <input
                type="text"
                ref={nameInputRef}
                value={fields.rowName}
                name="rowName"
                onChange={onInputHandle}
                onKeyDown={onKeyDownHandle}
                onDoubleClick={(e) => e.stopPropagation()}
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={fields.salary}
                name="salary"
                onChange={onInputHandle}
                onKeyDown={onKeyDownHandle}
                onDoubleClick={(e) => e.stopPropagation()}
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={fields.equipmentCosts}
                name="equipmentCosts"
                onChange={onInputHandle}
                onKeyDown={onKeyDownHandle}
                onDoubleClick={(e) => e.stopPropagation()}
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={fields.overheads}
                name="overheads"
                onChange={onInputHandle}
                onKeyDown={onKeyDownHandle}
                onDoubleClick={(e) => e.stopPropagation()}
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={fields.estimatedProfit}
                name="estimatedProfit"
                onChange={onInputHandle}
                onKeyDown={onKeyDownHandle}
                onDoubleClick={(e) => e.stopPropagation()}
                required
              />
            </td>
          </>
        ) : (
          <>
            <td>{row.rowName}</td>
            <td>{row.salary}</td>
            <td>{row.equipmentCosts}</td>
            <td>{row.overheads}</td>
            <td>{row.estimatedProfit}</td>
          </>
        )}
      </tr>
    );
  }, [editId, fields]);

  return element;
}
