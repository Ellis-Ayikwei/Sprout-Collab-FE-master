import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imageUrl, link }) => {
	const navigate = useNavigate();

	const handleClick = (event) => {
		event.preventDefault();
		navigate(link);
	};

	return (
		<div
			className="card"
			onClick={handleClick}
			style={{ cursor: "pointer", zIndex: "auto", position: "relative" }}
		>
			<img
				className="card-image"
				src={require(`../assets/images/${imageUrl}.jpg?resize&size=300`)}
				alt={title}
				loading="eager"
			/>
			<div className="card-content">
				<h3 className="card-title text-xl font-semibold">{title}</h3>
				<p className="card-description">{description}</p>
			</div>
		</div>
	);
};

export default Card;

