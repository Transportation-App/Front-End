import { Modal, Box, Typography } from "@mui/material";

interface PropsType {
	open: boolean;
	handleClose: () => void;
  title: string;
  description: string;
}

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	borderRadius: "0.575rem",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const CustomModal: React.FC<PropsType> = ({
	open,
	handleClose,
	title,
	description,
}) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2" className="text-center">
					{title}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{description}
				</Typography>
			</Box>
		</Modal>
	);
};

export default CustomModal;
