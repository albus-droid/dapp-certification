import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function PreLoader1() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  return (

    <>
       
        <ReactLoading className="reactloading"
         
          type={"bars"}
          color={"#03fc4e"}
          height={100}
          width= {100}
          
        />
       
    </>
  );
}

export default PreLoader1;