import React, { useRef } from "react";
import Select from "react-select";
import styles from "./leaderboard.module.css";

const groupedOptions = [
  {
    label: "Episode 2",
    options: [
      { value: "e2a1", label: "Episode 2: Act 1" },
      { value: "e2a2", label: "Episode 2: Act 2" },
      { value: "e2a3", label: "Episode 2: Act 3" },
    ],
  },
  {
    label: "Episode 3",
    options: [
      { value: "e3a1", label: "Episode 3: Act 1" },
      { value: "e3a2", label: "Episode 3: Act 2" },
      { value: "e3a3", label: "Episode 3: Act 3" },
    ],
  },
  {
    label: "Episode 4",
    options: [
      { value: "e4a1", label: "Episode 4: Act 1" },
      { value: "e4a2", label: "Episode 4: Act 2" },
      { value: "e4a3", label: "Episode 4: Act 3" },
    ],
  },
  {
    label: "Episode 5",
    options: [
      { value: "e5a1", label: "Episode 5: Act 1" },
      { value: "e5a2", label: "Episode 5: Act 2" },
      { value: "e5a3", label: "Episode 5: Act 3" },
    ],
  },
  {
    label: "Episode 6",
    options: [
      { value: "e6a1", label: "Episode 6: Act 1" },
      { value: "e6a2", label: "Episode 6: Act 2" },
      { value: "e6a3", label: "Episode 6: Act 3" },
    ],
  },
  {
    label: "Episode 7",
    options: [
      { value: "e7a1", label: "Episode 7: Act 1" },
      { value: "e7a2", label: "Episode 7: Act 2" },
      { value: "e7a3", label: "Episode 7: Act 3" },
    ],
  },
  {
    label: "Episode 8",
    options: [
      { value: "e8a1", label: "Episode 8: Act 1" },
      { value: "e8a2", label: "Episode 8: Act 2" },
      { value: "e8a3", label: "Episode 8: Act 3" },
    ],
  },
  {
    label: "Episode 9",
    options: [
      { value: "e9a1", label: "Episode 9: Act 1" },
      { value: "e9a2", label: "Episode 9: Act 2" },
      { value: "e9a3", label: "Episode 9: Act 3" },
    ],
  },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#222f45",
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#222f45",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#5d687b" : "#222f45",
    color: "white",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  groupHeading: (provided) => ({
    ...provided,
    backgroundColor: "#222f45",
    color: "white",
  }),
};

const GroupedSelect = ({option}) => {
  const optionRef = useRef(null);
  const handleSelectChange = (selectedOption) => {
    optionRef.current = selectedOption.value;
    option(selectedOption.value);
  };

  return (
    <Select
      ref={optionRef}
      styles={customStyles}
      options={groupedOptions}
      placeholder="Episode 9 : Act 2"
      onChange={handleSelectChange}
    />
  );
};

export default GroupedSelect;
