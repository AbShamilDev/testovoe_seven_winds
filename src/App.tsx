import { useEffect } from "react";
import "./App.style.scss";
import DocumentsTable from "./components/DocumentsTable/DocumentsTable";
import HeaderControl from "./components/HeaderControl/HeaderControl";
import ProjectSelector from "./components/ProjectSelector/ProjectSelector";
import { fetchRows } from "./redux/rowsSlice";
import { useAppDispatch } from "./redux/storeHooks";

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRows());
  }, []);
  return (
    <div className="app">
      <HeaderControl />
      <ProjectSelector />
      <DocumentsTable />
    </div>
  );
}
