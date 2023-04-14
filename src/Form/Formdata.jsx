import React from "react";
import { useState } from "react";
import "./myFormtable.css";

function Formdata() {
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputs", inputs);
    if (editClick) {
      const tempTableData = tableData;
      console.log(tempTableData[editIndex]);
      Object.assign(tempTableData[editIndex], inputs);
      setTableData([...tempTableData]);
      setEditClick(false);
      setInputs({
        name: "",
        age: "",
        email: "",
      });
    } else {
      setTableData([...tableData, inputs]);
      setInputs({
        name: "",
        age: "",
        email: "",
      });
    }
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    console.log(filterData);
    setTableData(filterData);
  };
  const handleEdit = (index) => {
    console.log(index);
    const tempData = tableData[index];

    setInputs({
      name: tempData.name,
      age: tempData.age,
      email: tempData.email,
    });
    setEditClick(true);
    setEditIndex(index);
  };
  return (
    <>
      <div className="row mt-3 ">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="container">
              <label htmlFor="text">
                <b>Username</b>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                autoComplete="off"
                id="usernameSignUp"
                className="form-control"
                required
              />

              <label htmlFor="psw">
                <b>Age</b>
              </label>
              <input
                type="text"
                placeholder="Enter Age"
                name="age"
                value={inputs.age}
                onChange={handleChange}
                id="ageSignUp"
                autoComplete="off"
                className="form-control"
                required
              />

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="off"
                id="emailSignUp"
                className="form-control"
                required
              />
              <div className="clearfix">
                <button
                  type="submit"
                  className="signupbtn btn btn-success mt-3 my-3 w-100"
                >
                  {editClick ? "update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {tableData.length > 0 ? (
        <div style={{ marginTop: "30px" }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, i) => (
                <tr id="table">
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(i)}
                      className="btn  btn-warning"
                    >
                      Edit &nbsp;<i class="bi bi-pencil-square"></i>
                    </button>
                    &nbsp;
                    <button
                      onClick={() => handleDelete(i)}
                      className="btn btn-danger"
                    >
                      Delete &nbsp;
                      <i class="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "40px" }}>Add data</h1>
      )}
    </>
  );
}

export default Formdata;
