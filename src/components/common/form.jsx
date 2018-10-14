import React, { Component } from "react";
//npm i joi-browser@13.4
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };
  validate = () => {
    // const errors = {};

    // const { data } = this.state;
    // if (data.username.trim() === "")
    //   errors.username = "Username is required";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required";

    // this.setState({
    //   errors
    // });

    // return Object.keys(errors).length === 0 ? null : errors;

    //=====using Joi library for validation
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    //errors[item.path[0]] first etirate username
    //errors[item.path[0]] second etirate password
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }

    //if we use name:value //name:anything
    //if we use [name]:value//username:anything in the focused text input
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    //basic validation
    const errors = this.validate();
    //set errors to erros obj or an {} should not set to null
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  //rather than using e as prop for handleChange we can get arrgument as obj
  handleChange = ({ currentTarget: input }) => {
    //validation on change (any change in text appear in error warning)
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    //handling Multiple Inputs by using e.currentTarget.name
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleSearcOnChange = ({ currentTarget: input }) => {
    console.log(this.validateProperty(input));
  };
  renderButton = value => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {value}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
