import {
	faClockFour,
	faEye,
	faHandshake,
	faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
import joinCollab from "components/collabs/joinCollab";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetColor1BasedOnProgress } from "../../utils/getColorBasedOnProgress";

const GenericCard = ({
	onClick,
	title,
	description = "",
	duration,
	progress,
	progressType = "circular",
	memberCount = 0,
	collaborationCount = 0,
	visibility,
	dateCreated,
	status,
	icon,
	isCollaboration = false,
	isMember = false,
	data,
	goalId,
	className = "",
}) => {
	const dispatch = useDispatch();
	const myData = useSelector((state) => state.login.myData);
	const color = GetColor1BasedOnProgress(progress || 0);
	const [isLoading, setIsLoading] = useState(false);

	// Memoize the onClick handler
	const handleClick = useCallback(() => {
		if (onClick) onClick();
	}, [onClick]);

	// Memoized function to join the collaboration
	const handleJoinCollab = useCallback(() => {
		if (data && myData) {
			setIsLoading(true);
			joinCollab(myData, data?.id).then((res) => {
				console.log("res", res);
				if (res?.status === 201) {
					toast.success("Successfully joined collaboration");
					// dispatch(fetchCollaborations(data?.goal_id));
					setIsLoading(false);
					isMember = true;
				}
			});
		}
	}, [dispatch, myData, data]);

	return (
		<div
			className={`w-full flex flex-col rounded-lg shadow-lg p-2 bg-white ${className}`}
			onClick={handleClick}
		>
			<div className="flex flex-row justify-between items-center">
				<div className="flex items-center">
					{icon ? (
						<img
							src={icon}
							alt="Icon"
							className="w-6 h-6 mr-4"
						/>
					) : (
						<FontAwesomeIcon
							icon={faUserGroup}
							className="w-6 h-6 mr-4"
						/>
					)}
					<div className="flex-1">
						<h5 className="text-sm font-semibold">{title}</h5>
						{description && (
							<p className="text-xs text-gray-600 text-gray-600">
								{description}
							</p>
						)}
					</div>
				</div>
				<div className=" justify-center">
					{progress != null && progressType === "circular" && (
						<div className="flex items-center justify-center w-14">
							<CircularProgressbar
								value={progress}
								maxValue={100}
								text={`${progress}%`}
								styles={buildStyles({
									strokeLinecap: "round",
									textSize: "30px",
									pathTransitionDuration: 0.5,
									pathColor: `${color.mainColor}`,
									textColor: `${color.mainColor}`,
									trailColor: `${color.tintColor}`,
								})}
							/>
						</div>
					)}
				</div>
			</div>
			{/* Progress Bar or Circular Progress */}
			{progress != null && progressType === "bar" && (
				<div className="w-full mt-2">
					<ProgressBar
						completed={progress}
						maxCompleted={100}
						height="7px"
						baseBgColor={color.tintColor}
						bgColor={color.mainColor}
						labelSize="10px"
						className="w-full"
					/>
				</div>
			)}
			<ul className="list-none  flex flex-row flex-nowrap">
				{dateCreated && (
					<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
						<FontAwesomeIcon
							icon={faClockFour}
							className="mr-2"
						/>
						{dayjs(dateCreated).format("DD MMM YYYY")}
					</li>
				)}
				{visibility && (
					<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
						<FontAwesomeIcon
							icon={faEye}
							className="mr-2"
						/>
						{visibility}
					</li>
				)}
				<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
					<FontAwesomeIcon
						icon={faUserGroup}
						className="mr-2"
					/>
					{memberCount}
				</li>
				{collaborationCount > 0 && (
					<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
						<FontAwesomeIcon
							icon={faHandshake}
							className="mr-2"
						/>
						{collaborationCount}
					</li>
				)}
				{duration && (
					<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
						<FontAwesomeIcon
							icon={faClockFour}
							className="mr-2"
						/>
						{duration} days
					</li>
				)}
				{status && (
					<li className="p-2 flex-nowrap text-xs text-gray-600 items-center">
						<span className="text-xs text-gray-600">{status}</span>
					</li>
				)}
				{isCollaboration && !isMember && (
					<li className="w-full xl:w-1/3 p-2">
						<button
							onClick={handleJoinCollab}
							className="bg-main rounded-full text-sm text-white px-4 py-2 w-full"
						>
							{isLoading ? "Joining...." : "Join"}
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default GenericCard;
