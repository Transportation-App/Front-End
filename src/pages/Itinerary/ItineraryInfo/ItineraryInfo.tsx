import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
interface PropsType {
	className?: string;
	departureHour: string;
	arriveHour: string;
	cityFrom: string;
	cityTo: string;
	duration: number;
	numberOfPassengers: number;
	id: number;
}

const ItineraryInfo = (props: PropsType) => {
	let hour: number = Math.floor(props.duration / 3600);
	let minutes: number = Math.round((props.duration / 3600 - hour) * 60);

	const navigate = useNavigate();

	const handleClickEvent = () => {
		navigate("/bus", {
			state: { itinID: props.id },
		});
	};

	return (
		<div className={props.className}>
			<p className="w-max flex flex-col">
				<span>
					<span className="departureHour">{props.departureHour}</span>
					<span className="hyphen">-</span>
					<span className="arriveHour">{props.arriveHour}</span>
				</span>
				<span className="duration">
					<span className="hours">
						{hour === 0 ? "" : hour + (hour > 1 ? " hours " : "hour ")}
					</span>
					<span className="minutes">
						{minutes === 0
							? ""
							: minutes + (minutes > 1 ? " minutes" : " minute")}
					</span>
				</span>
			</p>
			<p className="w-max">
				<span className="cityFrom">{props.cityFrom}</span>
				<span className="hyphen">-</span>
				<span className="cityTo">{props.cityTo}</span>
			</p>
			<p className="w-max">{props.numberOfPassengers}</p>
			<Button
				variant="contained"
				color="primary"
				className="w-28 h-12"
				onClick={handleClickEvent}
			>
				Book
			</Button>
		</div>
	);
};

export default ItineraryInfo;
