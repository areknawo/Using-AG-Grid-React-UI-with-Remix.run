import { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AgGridStyles from "ag-grid-community/dist/styles/ag-grid.css";
import AgThemeAlpineStyles from "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useFetcher } from "remix";

const dateFormatter = (params) => {
  if (params.value) {
    return new Date(params.value).toLocaleString();
  }

  return " ";
};
const columnDefs = [
  { field: "id" },
  { field: "title", flex: 1, minWidth: 400 },
  { field: "author.email", minWidth: 250 },
  { field: "author.name" },
  {
    field: "updatedAt",
    valueFormatter: dateFormatter,
  },
];

export default function Index() {
  const [isFetching, setIsFetching] = useState(false);
  const [getRowParams, setGetRowParams] = useState(null);
  const posts = useFetcher();
  const onGridReady = useCallback((params) => {
    const datasource = {
      getRows(params) {
        if (!isFetching) {
          posts.load(`/posts?from=${params.startRow}&to=${params.endRow}`);

          setGetRowParams(params);
          setIsFetching(true);
        }
      },
    };

    params.api.setDatasource(datasource);
  }, []);

  useEffect(() => {
    if (getRowParams) {
      const data = posts.data || [];

      getRowParams.successCallback(
        data,
        data.length < getRowParams.endRow - getRowParams.startRow
          ? rowParams.startRow + indexOfLastRow
          : -1
      );
    }

    setIsFetching(false);
    setGetRowParams(null);
  }, [posts.data]);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType="infinite"
        onGridReady={onGridReady}
      ></AgGridReact>
    </div>
  );
}
export function links() {
  return [
    { rel: "stylesheet", href: AgGridStyles },
    { rel: "stylesheet", href: AgThemeAlpineStyles },
  ];
}
