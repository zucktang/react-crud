import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../constant/Api";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const moment = require("moment-timezone");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const statusChoice = ["pending", "accepted", "resolved", "rejected"];
  const HandleOnChange = (event, name) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };
  const HandleSubmit = () => {
    let config = {
      method: "put",
      url: `${url}/${id}`,
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(data);
  const getApi = () => {
    let config = {
      method: "get",
      url: `${url}/${id}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setData(response.data.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  const dateformat = (date) => {
    console.log(date);
    console.log(moment(date).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm"));
  };
  if (!data) return <p>loading</p>;

  return (
    <div>
      <div className="card-edit">
        <h3 style={{ marginBottom: "20px", fontWeight: "bold" }}>
          {" "}
          Update Ticket{" "}
        </h3>
        <div className="column-content">
          <span className="span-g">Title:</span>
          <input
            className="title"
            type="text"
            name="title"
            value={data.title}
            onChange={(e) => HandleOnChange(e)}
          />
        </div>

        <div className="column-content">
          <span className="span-g">Description:</span>
          <textarea
            className="description"
            type="text"
            name="description"
            value={data.description}
            onChange={(e) => HandleOnChange(e)}
          />
        </div>

        <div className="column-content">
          <span className="span-g">Contact Information:</span>
          <textarea
            className="contact-information"
            type="text"
            name="contact_information"
            value={data.contact_information}
            onChange={(e) => HandleOnChange(e)}
          />
        </div>

        <div className="row-content">
          <span className="span-g">Status:</span>
          <select
            className="status"
            value={data.status}
            name="status"
            onChange={(e) => HandleOnChange(e)}
          >
            {statusChoice.map((value) => (
              <option value={value}> {value}</option>
            ))}
          </select>
        </div>

        <div className="column-content">
          <span className="span-g">Created_at:</span>
          <input
            className="created-at"
            type="datetime"
            name="created_at"
            disabled
            value={dateformat(data.created_at)}
          />

          <span className="span-g">Updated_at:</span>
          <input
            className="updated-at"
            type="datetime"
            name="updated_at"
            value={dateformat(data.updated_at)}
            disabled
          />
        </div>

        <div className="content-btn">
          <button
            className="cancel"
            type="button"
            onClick={() => (window.location.href = "/")}
          >
            Cancel
          </button>

          <button
            className="submit"
            type="submit"
            onClick={() => HandleSubmit()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
