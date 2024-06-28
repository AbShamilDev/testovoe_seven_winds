export interface rowType {
  child: rowType[];
  equipmentCosts: number | null;
  estimatedProfit: number | null;
  id: number | null;
  machineOperatorSalary: number | null;
  mainCosts: number | null;
  materials: number | null;
  mimExploitation: number | null;
  overheads: number | null;
  rowName: string | null;
  salary: number | null;
  supportCosts: number | null;
  total: number | null;
}

export interface rowForRequestType {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  rowName: string;
  salary: number;
  supportCosts: number;
  parentId?: number | null;
}

export interface rowsType {
  rows: rowType[];
  loading: boolean;
  error: unknown | null;
}
