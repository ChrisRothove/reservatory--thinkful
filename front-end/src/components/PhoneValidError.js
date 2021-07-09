export default function PhoneValidError({ phoneValid }) {
  if (phoneValid) {
    return <div></div>;
  } else {
    return <div>Phone must be ###-###-#### format</div>;
  }
}
