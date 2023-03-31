import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";

class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	validate = () => {
		const result = Joi.validate(
			this.state.account,
			this.schema,
			{ abortEarly: false }
		);

		const { error } = result;

		if (!error) return null;

		const errors = {};
		for (let item of error.details)
			errors[item.path[0]] = item.message;

		return errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		//Call the server
		console.log("Submitted");
	};

	validateProperty = (input) => {
		const { name, value } = input;

		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	handleChange = (e) => {
		const { currentTarget: input } = e;

		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account, errors });
	};

	render() {
		const { account, errors } = this.state;
		return (
			<div style={{ maxWidth: "600px", minWidth: "400px" }}>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<Input
						name="username"
						value={account.username}
						label="Username"
						type="text"
						error={errors.username}
						onChange={this.handleChange}
					/>
					<Input
						name="password"
						value={account.password}
						label="Password"
						type="password"
						error={errors.password}
						onChange={this.handleChange}
					/>

					<button
						className="btn btn-primary"
						disabled={this.validate()}
					>
						Login
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
