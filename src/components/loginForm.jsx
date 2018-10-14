import React from "react";
//npm i joi-browser@13.4
import Joi from "joi-browser";
import Form from "./common/form";
class LoginForm extends Form {
  // create referance object if we need tp access to the dome
  //username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const username = this.username.current.value;
  //   console.log("submited");
  // };

  //controlled Element
  state = {
    //   we should initialize the prop of state input to impty elemen
    //like username:""
    data: { username: "", password: "" },
    //error validation
    errors: {}
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  doSubmit() {
    console.log("Submitted");
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        {/* form>(div.form-group>label+input.form-control)*4 */}
        {/* handling the submition using onSubmit */}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "UserName")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
