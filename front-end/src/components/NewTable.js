import { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { addTable } from "../utils/api";

export default function NewTable() {
  const history = useHistory();
  const defaultFormData = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState({ ...defaultFormData });
  const [tableError, setTableError] = useState(null);

  function handleChange(e) {
    e.preventDefault();
    const event = e.target;
    let value = event.value;
    if (event.name === "capacity") {
      value = Number(event.value);
      console.log(typeof value);
    }
    setFormData({ ...formData, [event.name]: value });
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData({ ...defaultFormData });
    history.goBack();
  }

  function createTable() {
    const abortController = new AbortController();
    setTableError(null);
    addTable(formData, abortController.signal)
      .catch(setTableError)
      .then(history.push("/"));
    return () => abortController.abort();
  }

  function submitHandler(e) {
    e.preventDefault();
    createTable();
  }

  return (
    <div>
      <ErrorAlert error={tableError} />
      <form className="resList form" onSubmit={submitHandler}>
        <label>
          Table Name:
          <input
            type="text"
            id="tableName"
            name="table_name"
            value={formData.table_name}
            minlength="2"
            required
            onChange={handleChange}
          ></input>
          <div className="insight">min: 2 characters</div>
        </label>
        <label>
          Capacity:
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            min="1"
            required
            onChange={handleChange}
          ></input>
        </label>
        <div className="buttons">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
