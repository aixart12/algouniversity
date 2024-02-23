import React, { FC } from "react";

interface OutputWindowProps {
  outputDetails: {
    input_data: string;
    result: string;
  }[];
}

const OutputWindow: FC<OutputWindowProps> = ({ outputDetails }) => {
  const getOutput = () => {
    console.log("reached the outputDetails", outputDetails);
    return outputDetails.map((data) => {
      return (
        <>
          <p className="ml-4">
            Input : {data.input_data}{" "}
            <span className="ml-4">Resut : {data.result} </span>
            <br />
          </p>
        </>
      );
    });
  };

  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;
