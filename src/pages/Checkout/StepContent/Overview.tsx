import { Box, Paper, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

type SeatFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketDiscount: number;
  ticketType: string;
  ticketPrice: number;
};

type propsType = {
  formData: Record<number, SeatFormData>;
};

const Overview: React.FC<propsType> = ({ formData }) => {
  const usersData: SeatFormData[] = Object.values(formData);
  const usersSeats: string[] = Object.keys(formData);

  const onSettingsClick = (seat: string) => {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: 2,
        padding: 2,
      }}
    >
      {usersData.map((user, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            padding: 2,
            width: "100%",
            borderRadius: "8px",
            position: "relative",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              bgcolor: "grey.300",
            },
            "&:hover .settings-icon": {
              opacity: 1,
            },
          }}
          onClick={() => onSettingsClick(usersSeats[index])}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {usersSeats[index]}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <Typography variant="body1">{user.ticketType}</Typography>
            <Typography variant="body1">Price: {user.ticketPrice}€</Typography>
          </Box>

          <DriveFileRenameOutlineIcon
            className="settings-icon"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0,
              transition: "opacity 0.3s ease",
              color: "gray",
            }}
            fontSize="large"
            aria-label="change settings"
          />
        </Paper>
      ))}
    </Box>
  );
};

export default Overview;
