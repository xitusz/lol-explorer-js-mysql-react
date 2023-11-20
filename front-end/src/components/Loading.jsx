import React from "react";

const Loading = () => {
  return (
    <div className="p-5 text-center">
      <div className="spinner-border text-white" role="status">
        <span className="visually-hidden">Carregando</span>
      </div>
    </div>
  );
};

export default Loading;
