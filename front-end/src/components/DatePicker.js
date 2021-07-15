import { next, previous } from "../utils/date-time";

export default function DatePicker({ date, setDate }) {
  return (
    <div id="date-picker">
      <button onClick={() => setDate(previous(date))}>{`<< Last`}</button>
      <input type="date" onChange={(e) => setDate(e.target.value)}></input>
      <button onClick={() => setDate(next(date))}>{`Next >>`}</button>
    </div>
  );
}
