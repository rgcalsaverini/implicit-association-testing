import React from 'react';
import constants from 'app_constants';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectOne = ({ data, onChange, value }) => {
  let body;

  if (data.options.length < constants.questions.selectWrapLimit) {
    body = (
      <RadioButtonGroup
        name="select_one="
        onChange={(_, opt) => onChange(opt)}
        value={value}
      >
        {data.options.map(opt => (
          <RadioButton key={opt} value={opt} label={opt} />
        ))}
      </RadioButtonGroup>
    );
  } else {
    body = (
      <SelectField
        floatingLabelText="Select one..."
        onChange={(_, key) => {
          onChange(data.options[key]);
        }}
        value={value}
      >
        {data.options.map(opt => (
          <MenuItem value={opt} key={opt} primaryText={opt} />
        ))}
      </SelectField>
    );
  }
  return (
    <div>
      {body}
    </div>
  );
};

SelectOne.propTypes = {
};

SelectOne.defaultProps = {
};

export default SelectOne;
