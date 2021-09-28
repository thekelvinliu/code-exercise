import React from 'react';
import { Spinner } from 'reactstrap';

/**
 * a loading spinner
 *
 * @returns {React.Component} loading spinner
 */
const LoadingSpinner = () => (
  <div className="mx-auto my-4">
    <Spinner size="sm" type="grow" />
    <Spinner className="mx-1" size="sm" type="grow" />
    <Spinner size="sm" type="grow" />
  </div>
);

export default LoadingSpinner;
