import React from 'react';

// Define the interface for the component's props
interface LoaderProps {
  show: boolean;
}

// Use the interface as a generic parameter for the functional component
const Loader: React.FunctionComponent<LoaderProps> = ({ show }) => {
  return show ? <div className="loader"></div> : null;
};

export default Loader;