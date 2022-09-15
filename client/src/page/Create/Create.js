import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../constant/Api";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Create.css";

function Create() {
  const { id } = useParams();
  const [data, setData] = useState([]);

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

  if (!data) return <p>loading</p>;

  return (
    <div>
      <div className="card-create">
        <h3 style={{marginBottom:"20px",fontWeight:"bold"}}> Create Ticket </h3>
        <div className="column-content">
          <span className="span-g">Title:</span>
          <input
            className="title"
            type="text"
            name="title"
            value={data.title}
            placeholder="Please Enter Title"
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
            placeholder="Please Enter Description"
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
            placeholder="Please Enter Contact Information"
            onChange={(e) => HandleOnChange(e)}
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
