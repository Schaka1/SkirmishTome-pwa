import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Transform } from "@fortawesome/fontawesome-svg-core";

import Select from "react-select";
import { useEffect } from "react";

interface $Props {
  value: string;
  options: string[];
  label: string;
  icon?: IconDefinition;
  transform?: string | Transform;
  onChange: (value: string) => void;
}

const SelectField = ({ value, options, label, icon, transform, onChange }: $Props) => {
  const [opts, setOptions] = useState<{ value: string; label: string }[]>([]);
  const handleChange = (option: { value: string; label: string } | null) => {
    if (option !== null && option !== undefined) {
      onChange(option.value);
    }
  };

  useEffect(() => {
    let newOptions: { value: string; label: string }[] = [];
    options.forEach((option: string) => newOptions.push({ value: option, label: option }));
    setOptions(newOptions);
  }, [options]);

  return (
    <Field>
      <LabelText>
        {icon ? <Icon icon={icon} transform={transform} /> : ""} {label}
      </LabelText>
      {opts.length > 0 && (
        <StyledSelect
          isMulti={false}
          isClearable={true}
          defaultValue={{ value: value, label: value }}
          classNamePrefix="react-select"
          options={opts}
          onChange={(options: { value: string; label: string }) => handleChange(options)}
        />
      )}
    </Field>
  );
};

export default SelectField;

const Field = styled.label`
  color: ${({ theme }) => theme.tile.color};
  background-color: ${({ theme }) => theme.tile.backgroundColor};
  font-size: 16px;
  flex: 1 1 auto;
  padding: 5px;
  margin: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  width: 20px;
  height: auto;
  border-radius: 150px;
  transition: color 0.2s;
  color: ${({ theme }) => theme.main.highlight};
`;

const LabelText = styled.div`
  flex: 1 1 auto;
`;

const StyledSelect = styled(Select)`
  flex: 3 2 auto;
  box-sizing: border-box;
  border: none;
  min-width: 120px;

  background-color: ${({ theme }) => theme.input.backgroundColor};
  color: ${({ theme }) => theme.input.color};
  margin-left: 5px;

  .react-select__single-value {
    color: ${({ theme }) => theme.input.color};
  }
  .react-select__control {
    background-color: ${({ theme }) => theme.input.backgroundColor};
    border: none;
    border-radius: 5px;
  }
  .react-select__menu {
    background-color: ${({ theme }) => theme.input.backgroundColor};

    .react-select__option:hover {
      background-color: ${({ theme }) => theme.buttons.backgroundColor};
      color: ${({ theme }) => theme.buttons.color};
    }
    .react-select__option--is-focused {
      background-color: ${({ theme }) => theme.buttons.backgroundColor};
      color: ${({ theme }) => theme.buttons.color};
    }
  }
`;
