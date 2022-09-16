import MUIDataTable from "mui-datatables";
import "./Home.css";
import axios from "axios";
import { url } from "../../constant/Api";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const moment = require("moment-timezone");
const dateformat = (date) => {
  return moment(date).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm");
};

const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: "title",
    label: "TITLE",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "description",
    label: "DESCRIPTION",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "contact_information",
    label: "CONTACT INFORMATION",
    options: {
      filter: false,
      sort: false,
    },
  },

  {
    name: "created_at",
    label: "CREATED AT",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return dateformat(value);
      },
    },
  },

  {
    name: "updated_at",
    label: "UPDATED AT",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        return dateformat(value);
      },
    },
  },
  {
    name: "status",
    label: "STATUS",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        console.log("customBodyRender");
        if (value === "pending")
          return <p style={{ margin: "5px", color: "blue" }}> {value} </p>;
        else if (value === "accepted")
          return <p style={{ margin: "5px", color: "green" }}> {value} </p>;
        else if (value === "resolved")
          return <p style={{ margin: "5px", color: "orange" }}> {value} </p>;
        else if (value === "rejected")
          return <p style={{ margin: "5px", color: "red" }}> {value} </p>;
      },
    },
  },

  {
    name: "edit",
    label: "ACTION",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        console.log("customBodyRender");
        const path = `/edit/${tableMeta.rowData[0]}`;
        return (
          <a className="button-edit" type="button" href={path}>
            edit
          </a>
        );
      },
    },
  },
];

const options = {
  filterType: "checkbox",
  selectableRows: false,
  download: false,
  print: false,
  viewColumns: false,
};

function Home() {
  const [dataApi, setDataApi] = useState([]);
  const getApi = () => {
    var config = {
      method: "get",
      url: url,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setDataApi(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  console.log("dataAPI", dataApi);
  return (
    <div className="App container">
      <div className="header">
        <h4>Ticket Management</h4>
        <button
          type="button"
          className="create-ticket"
          onClick={() => (window.location.href = "/create")}
        >
          create ticket
        </button>
      </div>
      <div className="Ticket">
        <MUIDataTable data={dataApi} columns={columns} options={options} />
      </div>
      <footer style={{ marginTop: 20, textAlign: "right" }}>
        <a style={{ textAlign: "center", color: "gray" }}>
          Power by Nontaphat Noijai
        </a>
      </footer>
    </div>
  );
}

export default Home;
