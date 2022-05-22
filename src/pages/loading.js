import React from "react";
import ReactLoading from "react-loading";

function PreLoader1() {
  return (
    <>
      <ReactLoading
        className="reactloading"
        type={"bars"}
        color={"#03fc4e"}
        height={100}
        width={100}
      />
    </>
  );
}

export default PreLoader1;
