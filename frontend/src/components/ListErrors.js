import React from 'react';

const ListErrors = ({ errors }) =>
  errors ? (
    <div className="ui error message">
      {Object.keys(errors).map(key => (
        <div key={key}>
          {key} {errors[key]}
        </div>
      ))}
    </div>
  ) : null;

export default ListErrors;
