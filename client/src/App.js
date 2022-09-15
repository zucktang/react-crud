import MUIDataTable from "mui-datatables";
import "./App.css";
import axios from "axios";
import { url } from "../src/constant/Api";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../src/page/Home/Home";
import Create from "./page/Create/Create";
import Edit from "./page/Edit/Edit";

function App() {
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={ <Create/>}/>
        <Route path="/edit/:id" element={ <Edit/>}/>


        {/* <Route path="edit" element={ edit}/> */}
      </Routes>
    </div>
  );
}

export default App;
