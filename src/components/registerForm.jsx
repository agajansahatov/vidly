import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
	constructor() {
		super();
		this.state.data = { username: "", password: "", name: "" };
	}

	schema = {
		username: Joi.string().required().email().label("Username"),
		password: Joi.string().required().min(5).label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = () => {
		//Call the server
		console.log("Submitted!");
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.doSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
