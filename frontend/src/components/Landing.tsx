import React, { FC, useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios, { AxiosResponse } from "axios";
import { classnames } from "../utils/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import Table from "./Table";
import { executeCode, getHistory, getOneHistory } from "../apis";

interface RapidAPIResponse {
  token: string;
  status: {
    id: number;
  };
}

let javascriptDefault = `
function simple_return(a) {\n  return a};
`;

const Landing: FC = () => {
  const [code, setCode] = useState<string>(javascriptDefault);
  const [history, setHistory] = useState<any[]>([]);
  const [outputDetails, setOutputDetails] = useState<any>(null);
  const [processing, setProcessing] = useState<boolean | null>(null);
  const [theme, setTheme] = useState<string>("cobalt");
  const [selectedId, setSelectedId] = useState<number>(0);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const handleRowClick = (id: number) => setSelectedId(id);

  useEffect(() => {
    if (selectedId > 0) {
      const fetchData = async () => {
        let oneData: any = await getOneHistory(selectedId);
        setCode(() => oneData.code);
        console.log("getting the oneData", code);
      };
      fetchData();
    }
  }, [selectedId]);

  useEffect(() => {
    const featchData = async () => {
      let historyRes: any = await getHistory();
      setHistory(() => historyRes as any[]);
    };
    featchData();
  }, [processing]);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = async () => {
    setProcessing(true);
    let test: any = await executeCode(code);
    console.log("getting the result", test);
    if (test) {
      setProcessing(false);
      setOutputDetails(test?.results);
      showSuccessToast(`Compiled Successfully!`);
      console.log("response.data", test?.results);
      return;
    } else {
      setTimeout(() => {
        setOutputDetails(false);
        showErrorToast();
      }, 100);
    }

    console.log("print the code exection", history);
  };

  const showSuccessToast = (msg?: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg?: string, timer?: number) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={"javascript"}
            theme={theme}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          <div className="flex flex-col mt-4 ">
            <Table rows={history} onRowClick={handleRowClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
