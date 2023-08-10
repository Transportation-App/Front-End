import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { zhCN, enUS } from "@mui/material/locale";
import { Switch } from "@mui/material";

export default function App(props: { handler: () => void }) {
  const [locale, setLocale] = React.useState(enUS);
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();
  const themeWithLocale = React.useMemo(
    () => createTheme(theme, locale),
    [theme, locale]
  );
  React.useEffect(() => {
    if (checked) {
      setLocale(zhCN);
    } else {
      setLocale(enUS);
    }
  }, [checked]);

  function temp() {
    props.handler()
    setChecked(!checked);
  }
  return (
    <ThemeProvider theme={themeWithLocale}>
      <div
        className="head"
        style={{
          width: "fit-content",
          margin: "auto",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Switch
          checked={checked} 
          onChange= {temp}
        />
        <p>{locale === enUS ? "Ελληνικά" : "English"}</p>
      </div>
    </ThemeProvider>
  );
}
