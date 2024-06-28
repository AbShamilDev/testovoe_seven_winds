import { useAppDispatch, useAppSelector } from "src/redux/storeHooks";
import "./DocumentActions.style.scss";
import { createRow, deleteRow, deleteRowRequest } from "src/redux/rowsSlice";
import { clearFields, setEditId } from "src/redux/editSlice";
import { tableRowProps } from "../../DocumentsTable";

export default function DocumentActions({ row }: { row: tableRowProps }) {
  const dispatch = useAppDispatch();
  const editId = useAppSelector((state) => state.editSlice.editId);

  const onClickCreate = () => {
    editId === 1 && dispatch(deleteRow(1));
    dispatch(clearFields());
    editId !== 1 && dispatch(setEditId({ editId: 1, parentId: row.id }));
    dispatch(createRow(row.id));
  };

  const onClickDelete = () => {
    if (confirm("Вы действительно хотите удалить документ?") && row.id)
      dispatch(deleteRowRequest(row.id));
  };

  return (
    <>
      {row.childsBefore !== -1 && (
        <div
          className="level_line"
          style={{
            height: `${row.childsBefore * 60 + 52}px`,
            left: `${row.level * 20 + 5}px`,
          }}
        ></div>
      )}
      <div className="actions_wrapper" style={{ marginLeft: `${row.level * 20}px` }}>
        <div className={`actions_container ${!(editId === row.id) && "active"}`}>
          <button onClick={onClickCreate}>
            <img src="/icons/document.svg" alt="" />
          </button>
          <button onClick={onClickDelete}>
            <img src="/icons/trash.svg" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
