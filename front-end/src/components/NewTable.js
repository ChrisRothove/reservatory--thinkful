import { useState } from "react";
import { useHistory } from "react-router";

export default function NewTable() {
  const history = useHistory();
  const defaultFormData = {
    table_name: "",
    table_capacity: 1,
  };

  const [formData, setFormData] = useState({ ...defaultFormData });

  function handleChange(e) {
    e.preventDefault();
    const event = e.target;
    setFormData({ ...formData, [event.name]: event.value });
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData({ ...defaultFormData });
    history.goBack();
  }

  return (
    <form className="resList form">
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
          id="tableCapacity"
          name="table_capacity"
          value={formData.table_capacity}
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
  );
}
