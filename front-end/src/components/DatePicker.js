import { next, previous } from "../utils/date-time";

export default function DatePicker({ inquiryDate, setInquiryDate }) {
  return (
    <div id="date-picker">
      <button onClick={() => setInquiryDate(previous(inquiryDate))}>
        {`<< Last`}
      </button>
      <input
        type="date"
        onChange={(e) => setInquiryDate(e.target.value)}
      ></input>
      <button onClick={() => setInquiryDate(next(inquiryDate))}>
        {`Next >>`}
      </button>
    </div>
  );
}
