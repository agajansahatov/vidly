import React, { Component } from "react";

//Destructuring props
const Like = ({ liked, onClick }) => {
	let classes = "fa fa-heart";
	if (!liked) classes += "-o";

	return (
		<i
			onClick={onClick}
			style={{ cursor: "pointer" }}
			className={classes}
			aria-hidden="true"
		></i>
	);
};

export default Like;
