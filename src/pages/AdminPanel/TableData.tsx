import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import gr from "../../locales/gr/common.json";
import en from "../../locales/en/common.json";
import { GridColTypeDef } from "@mui/x-data-grid";
import GloballyCustomizedOptions from "./AutoComplete";
import ChangeLang from "./LanguageChange";
import { Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomId,
  randomCity,
  randomPrice,
} from "@mui/x-data-grid-generator";

let count = 0;
const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: count++,
    city: randomCity(),
    joinDate: randomCity(),
    role: randomCreatedDate(),
    arrival: randomCreatedDate(),
    price: randomPrice(),
  },
  {
    id: randomId(),
    name: count++,
    city: randomCity(),
    joinDate: randomCity(),
    role: randomCreatedDate(),
    arrival: randomCreatedDate(),
    price: randomPrice(),
  },
  {
    id: randomId(),
    name: count++,
    city: randomCity(),
    joinDate: randomCity(),
    role: randomCreatedDate(),
    arrival: randomCreatedDate(),
    price: randomPrice(),
  },
  {
    id: randomId(),
    name: count++,
    city: randomCity(),
    joinDate: randomCity(),
    role: randomCreatedDate(),
    arrival: randomCreatedDate(),
    price: randomPrice(),
  },
  {
    id: randomId(),
    name: count++,
    city: randomCity(),
    joinDate: randomCity(),
    role: randomCreatedDate(),
    arrival: randomCreatedDate(),
    price: randomPrice(),
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  handleLanguageSwitch: () => void;
  locale: string;
}

const dataCreate = gr.blog_posts?.titles?.create;

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, handleLanguageSwitch, locale } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: `${count}`, city: "", isNew: true },
    ]);
    count++;
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        {dataCreate}
      </Button>
      <ChangeLang handler={handleLanguageSwitch} />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleLanguageSwitch = () => {
    setLocale((currentLocale) => (currentLocale === "en" ? "gr" : "en"));
  };

  const [locale, setLocale] = React.useState("en");
  const dataName =
    locale === "en" ? en.blog_posts?.fields?.id : gr.blog_posts?.fields?.id;
  const dataStart =
    locale === "en"
      ? en.blog_posts?.fields?.start
      : gr.blog_posts?.fields?.start;
  const dataDest =
    locale === "en" ? en.blog_posts?.fields?.dest : gr.blog_posts?.fields?.dest;
  const dataDepart =
    locale === "en"
      ? en.blog_posts?.fields?.depart
      : gr.blog_posts?.fields?.depart;
  const dataPrice =
    locale === "en"
      ? en.blog_posts?.fields?.price
      : gr.blog_posts?.fields?.price;
  const dataArr =
    locale === "en"
      ? en.blog_posts?.fields?.arrival
      : gr.blog_posts?.fields?.arrival;
  const dataActions =
    locale === "en"
      ? en.blog_posts?.fields?.actions
      : gr.blog_posts?.fields?.actions;

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const usdPrice: GridColTypeDef = {
    type: "number",
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: "font-tabular-nums",
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: dataName, width: 260, editable: true },
    {
      field: "city",
      headerName: dataStart,
      width: 260,
      align: "left",
      headerAlign: "left",
      renderCell: (params) => <GloballyCustomizedOptions />,
    },
    {
      field: "joinDate",
      headerName: dataDest,
      type: "singleSelect",
      width: 260,
      renderCell: (params) => <GloballyCustomizedOptions />,
    },
    {
      field: "role",
      headerName: dataDepart,
      width: 260,
      editable: true,
      type: "date",
    },
    {
      field: "arrival",
      headerName: dataArr,
      width: 100,
      editable: true,
      type: "date",
    },
    {
      field: "price",
      ...usdPrice,
      headerName: dataPrice,
      width: 260,
      editable: true,
      type: "number",
    },

    {
      field: "actions",
      type: "actions",
      headerName: dataActions,
      width: 300,
      align: "right",
      headerAlign: "right",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Paper style={{ maxHeight: 800, overflow: "auto" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, handleLanguageSwitch, locale },
        }}
      />
      <Button style={{width:'100%'}}  endIcon={<SendIcon />}>
        Send
      </Button>
    </Paper>
  );
}
