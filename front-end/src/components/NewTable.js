import { formatAsDate } from "../../../back-end/src/utils/date-time";

export default function NewTable() {
  return (
    <form className="resList form">
      <label>
        Table Name:
        <input
          type="text"
          id="tableName"
          name="table_name"
          minlength="2"
          required
        ></input>
      </label>
      <div className="insight">min: 2 characters</div>
      <label>
        Capacity:
        <input
          type="number"
          id="tableCapacity"
          name="table_capacity"
          min="1"
        ></input>
      </label>
      <div className="buttons">
        <button className="btn btn-success" type="submit">
          Submit
        </button>
        <button className="btn btn-danger">Cancel</button>
      </div>
    </form>
  );
}
