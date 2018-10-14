// extracting reusable input inside login field
import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control"
        // for auto focus without using componentDidMount use autoFocus
        //autoFocus

        //ref={this.username}
      />
      {/* displaying error validation */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
