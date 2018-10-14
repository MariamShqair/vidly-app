import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class CreateMovie extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {}
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.required(),
    numberInStock: Joi.number().required(),
    rate: Joi.number().required()
  };

  doSubmit() {
    console.log("Submitted");
  }

  render() {
    return (
      <div>
        <h1>Create Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", [
            "",
            "Action",
            "Comedy",
            "Thriller"
          ])}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CreateMovie;
