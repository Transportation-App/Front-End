import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface SeatFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ticketDiscount: number;
  ticketType: string;
  ticketPrice: number;
}

interface SeatDetailsProps {
  selectedSeats: number[];
  formData: Record<number, SeatFormData>;
  handleInputChange: (
    seat: number,
    field: keyof SeatFormData,
    value: string
  ) => void;
  handleSelectChange: (seat: number, value: number, e: any) => void;
}

const SeatsDetails: React.FC<SeatDetailsProps> = ({
  selectedSeats,
  formData,
  handleInputChange,
  handleSelectChange,
}) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(
    selectedSeats.length > 0 ? selectedSeats[0] : null
  );

  const totalPages = Math.ceil(selectedSeats.length / itemsPerPage);

  const currentSeats = selectedSeats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAccordionChange =
    (seat: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? seat : null);
    };

  return (
    <>
      <article className="flex flex-col gap-1 w-full">
        {currentSeats.map((seat) => (
          <Accordion
            key={seat}
            expanded={expandedAccordion === seat}
            onChange={handleAccordionChange(seat)}
            className="w-full border border-black rounded-[0.575rem] p-1"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${seat}-content`}
              id={`panel-${seat}-header`}
            >
              <Typography>Θέση: {seat}</Typography>
              {formData[seat]?.ticketDiscount !== 100 && (
                <Typography
                  color="orange"
                  sx={{ marginLeft: "10px", fontWeight: "bold" }}
                >
                  Απαιτείται η επίδειξη διαπιστευτηρίου στο εκδοτήριο
                </Typography>
              )}
              <Typography sx={{ marginLeft: "auto" }}>
                Τιμή: {formData[seat]?.ticketPrice.toFixed(2)} €
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <form className="space-y-4">
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData[seat]?.firstName || ""}
                  onChange={(e) =>
                    handleInputChange(seat, "firstName", e.target.value)
                  }
                />

                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData[seat]?.lastName || ""}
                  onChange={(e) =>
                    handleInputChange(seat, "lastName", e.target.value)
                  }
                />

                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData[seat]?.email || ""}
                  onChange={(e) =>
                    handleInputChange(seat, "email", e.target.value)
                  }
                />

                <TextField
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData[seat]?.phoneNumber || ""}
                  onChange={(e) =>
                    handleInputChange(seat, "phoneNumber", e.target.value)
                  }
                />

                <FormControl fullWidth variant="outlined" required>
                  <InputLabel>Choose Option</InputLabel>
                  <Select
                    value={formData[seat]?.ticketDiscount || 100}
                    onChange={(e) =>
                      handleSelectChange(seat, +e.target.value, e)
                    }
                    label="Τύπος εισιτηρίου"
                  >
                    <MenuItem id="Κανονικό" value={100}>
                      Κανονικό
                    </MenuItem>
                    <MenuItem id="Φοιτητικό 25% / Στρατιωτικό" value={75}>
                      Φοιτητικό 25% / Στρατιωτικό
                    </MenuItem>
                    <MenuItem id="Φοιτητικό 50% / Πολυτέκνων / Αμέα" value={50}>
                      Φοιτητικό 50% / Πολυτέκνων / Αμέα
                    </MenuItem>
                  </Select>
                </FormControl>
              </form>
            </AccordionDetails>
          </Accordion>
        ))}
      </article>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        variant="outlined"
        color="primary"
        sx={{ marginTop: 2 }}
      />
    </>
  );
};

export default SeatsDetails;
