import React from "react";
import App from "./App";
import ContextWrapper from "./context/ContextWrapper";

const index = () => {
  return (
    <div>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </div>
  );
};

export default index;
