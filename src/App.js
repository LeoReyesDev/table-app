import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import DataTable from "./components/DataTable";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { AUTH, HTTPS, CORS } from "./components/InputOptions";
import { Levels } from "react-activity";
import "react-activity/dist/Levels.css";

function App() {
  //Init Vars
  const [data, setData] = useState([]);
  //save selector options
  const authPath = "Auth=";
  const httpsPath = "HTTPS=";
  const corsPath = "CORS=";

  const [authApi, setAuthApi] = useState("");
  const [httpsApi, setHttpsApi] = useState("");
  const [corsApi, setCorsApi] = useState("");
  //save EndPoint
  const [showTable, setShowTable] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  //PATH ENDPOINT
  const endPoint = `https://api.publicapis.org/entries?${authPath}${authApi}&${httpsPath}${httpsApi}&${corsPath}${corsApi}`;

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "API" },

      { Header: "Description", accessor: "Description" },
      { Header: "Category", accessor: "Category" },
      {
        Header: "Link",
        accessor: "Link",

        Cell: ({ cell: { value } }) => (
          <div className="dataLinks">
            <a
              style={{
                color: "#fff",
              }}
              href={value}
              width={60}
            >
              <FontAwesomeIcon className="eyeLinks" icon={faEye} />
            </a>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {}, []);

  const getEndPointData = () => {
    (async () => {
      const result = await axios(endPoint);
      setData(result.data.entries);
      setTimeout(setShowLoader(false), 2500);
    })();
  };

  //Select dropdowns
  const handleChanged = (e) => {
    setAuthApi(e.target.value);
  };

  const handleChangedHttps = (e) => {
    setHttpsApi(e.target.value);
  };

  const handleChangedCors = (e) => {
    setCorsApi(e.target.value);
  };

  //Submit button update

  const UpdateBtn = () => {
    getEndPointData();
    setShowLoader(true);
    setTimeout(2500, setShowTable(true));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="flex-grid">
          <div className="col">
            <div>
              <label>AUTH</label>
            </div>
            <select
              className="dropdown"
              id="framework"
              onChange={handleChanged}
            >
              <option value="" disabled selected>
                Select AUTH option
              </option>

              {AUTH.map((item) => {
                return (
                  <option
                    className="dropdown-content"
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <div>
              <label>HTTPS</label>
            </div>
            <select
              className="dropdown"
              id="framework"
              onChange={handleChangedHttps}
            >
              <option value="" disabled selected>
                Select your HTTPS option
              </option>
              {HTTPS.map((item) => {
                return (
                  <option
                    className="dropdown-content"
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col">
            <div>
              <label>CORS</label>
            </div>
            <select
              className="dropdown"
              id="framework"
              onChange={handleChangedCors}
            >
              <option value="" disabled selected>
                Select your CORS option
              </option>
              {CORS.map((item) => {
                return (
                  <option
                    className="dropdown-content"
                    key={item.value}
                    value={item.value}
                  >
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col">
            <button onClick={UpdateBtn} className="updateBtn">
              Update
            </button>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", textAlign: "center" }}>
        {showLoader ? (
          <h5>
            Loading...
            <Levels size="20" />
          </h5>
        ) : null}
      </div>
      {data !== null && showTable ? (
        <DataTable columns={columns} data={data} />
      ) : null}
      {data === null ? <h3>No data Found! please try again!</h3> : null}
    </div>
  );
}

export default App;
