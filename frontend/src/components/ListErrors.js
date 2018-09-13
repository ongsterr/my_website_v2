import React from 'react';

const ListErrors = ({ errors }) =>
  errors ? (
    <ul className="error-messages">
      {Object.keys(errors).map(key => (
        <li key={key}>
          {key} {errors[key]}
        </li>
      ))}
    </ul>
  ) : null;

export default ListErrors;
