import Select from "./Select";
import propTypes from "prop-types";
import { useUrl } from "../hooks/useUrl";

function SortBy({ options }) {
  const { url, setUrl } = useUrl();
  const sortBy = url("sortBy");

  function handleChange(e) {
    setUrl("sortBy", e.target.value);
  }

  return (
    <Select
      options={options}
      $type="white"
      onChange={handleChange}
      value={sortBy ? sortBy : ""}
    />
  );
}

export default SortBy;

SortBy.propTypes = {
  options: propTypes.array,
};
