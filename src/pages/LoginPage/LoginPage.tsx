import { useState } from "react";
import "../../styles/LoginPage.css";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Logging in:", username);

      await new Promise((resolve) => setTimeout(resolve, 100));

      navigate("/Admin");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <b>Hello Admin!</b>
      <hr />
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        onChange={(e: any) => {
          setUsername(e.target.value);
        }}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button sx={{ p: 1.2 }} variant="contained" onClick={handleLogin}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
};

export default LoginPage;
