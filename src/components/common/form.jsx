import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const result = Joi.validate(this.state.data, this.schema, {
			abortEarly: false,
		});

		const { error } = result;

		if (!error) return null;

		const errors = {};
		for (let item of error.details)
			errors[item.path[0]] = item.message;

		return errors;
	};

	validateProperty = (input) => {
		const { name, value } = input;

		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
	};

	handleChange = (e) => {
		const { currentTarget: input } = e;

		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button
				className="btn btn-primary"
				disabled={this.validate()}
			>
				{label}
			</button>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				value={data[name]}
				label={label}
				type={type}
				error={errors[name]}
				onChange={this.handleChange}
			/>
		);
	}
}

export default Form;
