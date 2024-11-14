import { useState } from "react";
import { ItineraryType } from "../../../../types/ItineraryType";
import { HourType } from "../../../../types/HourType";
import { StationType } from "../../../../types/StationType";
import ItineraryInfo from "../../ItineraryInfo/ItineraryInfo";
import ItineraryDescription from "../../ItineraryDescription/ItineraryDescription";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ItineraryDBType } from "../../../../types/ItineraryType/ItineraryType";

interface PropsType {
	className?: string;
	itinerary: ItineraryDBType;
}

const ListItem = (props: PropsType) => {
	const [reveal, setReveal] = useState(false);

	const handleRotate = () => {
		setReveal(!reveal);
	};

	const durationCalculator = (h1: string, h2: string): number => {
		type time = {
			hour: number;
			minutes: number;
		};
		const timeConverter = (h: string): time => {
			const split = h.split(":");
			return {
				hour: Number.parseInt(split[0]),
				minutes: Number.parseInt(split[1]),
			};
		};
		const t1: time = timeConverter(h1);
		const t2: time = timeConverter(h2);
		return (
			((t2.hour - t1.hour) % 24) * 3600 + ((t2.minutes - t1.minutes) % 60) * 60
		);
	};

	const { itinerary } = props;
	const duration: number = durationCalculator(
		itinerary.DepartureTime,
		itinerary.ArrivalTime
	);
	return (
		<li className={props.className}>
			<div className="w-full h-24 mt-10 mb-2 flex justify-center items-center bg-white border-transparent rounded-lg shadow-md">
				<ArrowRightIcon
					onClick={handleRotate}
					className={`pointer ${
						reveal
							? "rotate-90 duration-100 ease-in-out"
							: "duration-100 ease-in-out"
					}`}
				/>
				<ItineraryInfo
					className="w-[90%] flex justify-evenly items-center text-center"
					departureHour={itinerary.DepartureTime}
					arriveHour={itinerary.ArrivalTime}
					duration={duration}
					cityFrom={itinerary.DepartureCityObj?.Name as string}
					cityTo={itinerary.ArrivalCityObj?.Name as string}
					numberOfPassengers={0}
					id={itinerary.Id}
				/>
			</div>
			<ItineraryDescription
				className={`w-[90%] p-5 flex flex-col justify-center items-center bg-white border-transparent rounded-lg shadow-md ${
					reveal ? " " : " hidden"
				}`}
				itinerary={itinerary}
			/>
		</li>
	);
};

export default ListItem;
