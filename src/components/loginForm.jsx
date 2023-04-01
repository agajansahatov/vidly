import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
	constructor() {
		super();
		this.state.data = { username: "", password: "" };
	}

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = () => {
		//Call the server
		console.log("Submitted");
	};

	render() {
		return (
			<div style={{ maxWidth: "600px", minWidth: "400px" }}>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
