import { Oval } from "react-loader-spinner";

export default function Loader({ size = 48, small = false }) {
  return (
    <div className={`loader${small ? " loader--small" : ""}`}>
      <Oval
        height={small ? 24 : size}
        width={small ? 24 : size}
        color="#f5a623"
        secondaryColor="#e8e8e8"
        strokeWidth={4}
        ariaLabel="loading"
      />
    </div>
  );
}
