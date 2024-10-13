import {
	faClockFour,
	faHandshake,
	faUser,
	faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "@ramonak/react-progress-bar";
import PropTypes from "prop-types";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { GetColor1BasedOnProgress } from "../../utils/getColorBasedOnProgress";

const GenericCard = ({
	onClick,
	title,
	description,
	duration,
	progress,
	progressType = "circular",
	memberCount,
	collaborationCount,
	visibility,
	dateCreated,
	status,
	icon,
}) => {
	const color = GetColor1BasedOnProgress(progress);

	return (
		<div
			className="generic-card"
			onClick={() => onClick()}
		>
			<div className="generic--details1">
				{icon && (
					<img
						src={icon}
						alt="Handshake"
						className="growth--icon"
					/>
				)}
				<div className="generic-info">
					<div className="generic-info1">
						<h5 className="generic-info__name">{title}</h5>
						{description && (
							<p className="generic-info__description">{description}</p>
						)}
					</div>
					<ul className="generic-info2">
						{dateCreated && (
							<li className="generic-info__created_at">
								{/* {dataType?.created_at.split("T")[0] || '0'} */}
								{dateCreated}
							</li>
						)}
						{visibility && <li className="generic-info__visibility">{visibility}</li>}
						{memberCount && (
							<li>
								<FontAwesomeIcon icon={faUserGroup} />
								{"  "} {memberCount}
							</li>
						)}
						{collaborationCount > 0 && (
							<li>
								<FontAwesomeIcon icon={faHandshake} /> {"  "}
								{collaborationCount}
							</li>
						)}
						{duration && (
							<li>
								<FontAwesomeIcon icon={faClockFour} /> {"  "}
								{duration} days
							</li>
						)}
						{status && <li>{status}</li>}

						{/* <li className='generic-info__member-count'>{members.genericMembers.length} Members</li> */}
					</ul>

					{progress != null && progressType === "bar" && (
						<div className="generic--details2 generic-progress-bar">
							<ProgressBar
								completed={progress}
								maxCompleted={100}
								width="200px"
								height="10px"
								baseBgColor={color.tintColor}
								bgColor={color.mainColor}
								labelSize="10px"
							/>
						</div>
					)}
				</div>
				{progress != null && progressType === "circular" && (
					<div className="generic-progress-circular">
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
	);
};

// Define expected prop types for validation
GenericCard.propTypes = {
	dataProp: PropTypes.object,
	progressProp: PropTypes.number,
	colorFunc: PropTypes.func,
	onClickHandler: PropTypes.func,
	showMiniCircle: PropTypes.bool,
	showValue: PropTypes.bool,
	title: PropTypes.string,
	description: PropTypes.string,
	additionalInfo: PropTypes.arrayOf(PropTypes.string),
	progressType: PropTypes.oneOf(["circular", "bar"]), // Type of progress indicator
};

export default GenericCard;
