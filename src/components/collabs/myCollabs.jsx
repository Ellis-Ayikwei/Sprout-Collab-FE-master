import DotLoader from "components/DotLoader";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import Handshake from "../../images/collabb.png";
import GenericCard from "../task/genericCard";

const MyCollabs = () => {
	const [collabs, setCollabs] = useState([]);

	const userId = localStorage.getItem("userid");

	const { data, error, isLoading } = useSWR(
		`/collaborations/mycollaborations/${userId}`,
		fetcher
	);
	// Check if the data is still loading
	useEffect(() => {
		if (data) {
			setCollabs(data);
		}
	}, [data]);

	return (
		<div className="h-full">
			<div className="mt-6 flex flex-col items-center justify-center h-full w-full p-2 gap-2">
				{isLoading && <DotLoader />}
				{collabs &&
					collabs.slice(0, 3).map((collab) => (
						<GenericCard
							key={collab.collaboration_member.id}
							title={collab.collaboration.name}
							icon={Handshake}
						/>
					))}
			</div>
		</div>
	);
};

export default MyCollabs;
