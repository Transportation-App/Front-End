import React, { useEffect, useState } from 'react';
import { ItineraryType } from "../../../types/ItineraryType";
import ListItem from "./ListItem/ListItem";

interface PropsType  {
  className?: string;
  // itineraries: ItineraryType[];
};

const ItineraryList = (props: PropsType) => {
  const [fetchedData, setFetchedData] = useState<ItineraryType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/Itinerary/retrieve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data: ItineraryType[] = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (fetchedData.length === 0) {
    return <div>No data found</div>;
  }
  console.log(fetchedData)
  return (
    <ul className={props.className}>
      {Object.entries(fetchedData).map(([key, itinerary], index) => (
        <ListItem
          key={key} // Using the key from the object as the React key
          className="flex flex-col justify-center items-center"
          itinerary={itinerary as ItineraryType} // Casting itinerary to ItineraryType
        />
      ))}
    </ul>
  );
  
}

export default ItineraryList;
