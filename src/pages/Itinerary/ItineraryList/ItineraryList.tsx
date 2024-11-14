import React, { useEffect, useState } from "react";
import ListItem from "./ListItem/ListItem";
import useFetch from "../../../hooks/useFetch";
import { ItineraryDBType } from "../../../types/ItineraryType/ItineraryType";
import CircularProgress from "@mui/material/CircularProgress";
import CustomModal from "../../../UI/CustomModal";

interface PropsType {
	className?: string;
	// itineraries: ItineraryType[];
}

const ItineraryList = (props: PropsType) => {
	const { data, loading, error } = useFetch<ItineraryDBType[]>(
		"http://localhost:3000/api/itineraries/full",
		"GET"
	);
	const [displayError, setDisplayError] = useState<boolean>(false);
	const closeErrorModal = () => {
		setDisplayError(false);
	};
	const openErrorModal = () => {
		setDisplayError(true);
	};
	useEffect(() => {
		if (error) openErrorModal();
	}, [error]);

	if (loading) return <CircularProgress />;
	if (error)
		return (
			<CustomModal
				open={displayError}
				handleClose={closeErrorModal}
				title={error?.message as string}
				description={error?.cause as string}
			/>
		);

	return (
		<ul className={props.className}>
			{data &&
				data.map((itinerary) => (
					<ListItem
						key={itinerary.Id} // Using the key from the object as the React key
						className="flex flex-col justify-center items-center"
						itinerary={itinerary} // Casting itinerary to ItineraryType
					/>
				))}
		</ul>
	);
};

export default ItineraryList;
