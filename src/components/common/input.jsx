import React from "react";

const Input = (props) => {
	const { name, label, value, type, error, onChange } = props;
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				id={name}
				name={name}
				type={type}
				className="form-control"
				value={value}
				onChange={onChange}
			/>
			{error && (
				<div className="alert alert-danger">{error}</div>
			)}
		</div>
	);
};

export default Input;
