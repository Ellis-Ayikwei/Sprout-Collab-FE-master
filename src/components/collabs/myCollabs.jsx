import DotLoader from "components/DotLoader";
import React from "react";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import Handshake from "../../images/collabb.png";
import GenericCard from "../task/genericCard";

const MyCollabs = () => {
	const { data, error, isLoading } = useSWR(
		`/collaborations/mycollaborations/${localStorage.getItem("userid")}`,
		fetcher
		// {
		// 	revalidateOnMount: false,
		// 	revalidateOnFocus: false,
		// 	revalidateOnReconnect: false,
		// }
	);

	return (
		<div className="h-auto py-2 gap-2 justify-center">
			{isLoading && <DotLoader />}
			{data?.slice(0, 3).map(
				(collab) => (
					(
						<GenericCard
							key={collab.collaboration_member.id}
							title={collab.collaboration.name}
							icon={Handshake}
							memberCount={50}
						/>
					)
				)
			)}
		</div>
	);
};

export default MyCollabs;
