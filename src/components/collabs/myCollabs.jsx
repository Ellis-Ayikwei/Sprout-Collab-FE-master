import DotLoader from "components/DotLoader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../../helpers/fetcher";
import HandShake from "../../images/handshake.png";
import { fetchMyCollaborations } from "../../redux/collabSlice";
import GenericCard from "../task/genericCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

const MyCollabs = () => {
	const dispatch = useDispatch();
	const { data, error, isLoading } = useSWR(
		`/collaborations/mycollaborations/${localStorage.getItem("userid")}`,
		fetcher
		// {
		// 	revalidateOnMount: false,
		// 	revalidateOnFocus: false,
		// 	revalidateOnReconnect: false,
		// }
	);

	const { mycollabStatus, mycollabError, mycollabs } = useSelector(
		(state) => state.collaborations
	);

	console.log("MYCOLLABS: ", mycollabs);

	useEffect(() => {
		if (mycollabStatus === "idle" || mycollabStatus === "failed") {
			dispatch(fetchMyCollaborations());
		}
	}, [dispatch, mycollabStatus]);

	return (
		<div className="flex flex-col justify-start items-center h-auto p-2 !gap-2 text-black justify-center items-center">
			{isLoading && <DotLoader />}
			{mycollabs?.map((collab) => (
				<GenericCard
					icon={HandShake}
					key={collab.collaboration_member.id}
					title={collab.collaboration.name}
					// icon={Handshake}
					memberCount={50}
				/>
			))}
		</div>
	);
};

export default MyCollabs;
