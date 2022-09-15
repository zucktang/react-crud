import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../constant/Api";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Create() {
  const moment = require("moment-timezone");
  const { id } = useParams();
  const [data, setData] = useState([]);
  const statusChoice = ["pending", "accepted", "resolved", "rejected"];
  const HandleOnChange = (event, name) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(event.target.name);
  };
  // const HandleSubmit = (value) => {console.log(value)}
  const HandleSubmit = () => {
    let config = {
      method: "post",
      url: `${url}`,
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

  const dateformat = (date) => {
    return moment(date).tz("Asia/Bangkok").format("DD/MM/yyyy HH:mm");
  };
  if (!data) return <p>loading</p>;

  return (
    <div>
      <h1>Ticket Detail</h1>
      <form>
        <div className="row-content">
          <span>Title:</span>
          <input
            className="form-control"
            type="text"
            name="title"
            value={data.title}
            placeholder = "Please Enter Title"
            onChange={(e) => HandleOnChange(e)}
          />
        </div>

        <div className="row-content">
          <span>Description:</span>
          <textarea
            className="form-control"
            type="text"
            name="description"
            value={data.description}
            placeholder = "Please Enter Description"
            onChange={(e) => HandleOnChange(e)}
          />
        </div>

        <div className="row-content">
          <span>Contact Information:</span>
          <textarea
            className="form-control"
            type="text"
            name="contact_information"
            value={data.contact_information}
            placeholder = "Please Enter Contact Information"
            onChange={(e) => HandleOnChange(e)}
          />
        </div>


        <div>
          <button type="submit" onClick={() => HandleSubmit()}>
            submit
          </button>
        </div>

        <div>
          <button type="button" onClick={() => (window.location.href = "/")}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
