import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { OtherField } from './styles';

const otherOptVal = 'Other (fill bellow)';

class SelectOne extends Component {
  state = {
    otherSelected: false,
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && !newProps.data.options.includes(newProps.value)) {
      this.setState({ otherSelected: true });
      return;
    }
    if (this.props.data.id !== newProps.data.id) {
      this.setState({ otherSelected: false });
    }
  }

  handleChange = (option, onTextField = false) => {
    if (!option) {
      this.props.onChange(undefined);
      return;
    }
    if (option === otherOptVal) {
      this.setState({ otherSelected: true });
      this.props.onChange(undefined);
    } else {
      if (this.state.otherSelected && !onTextField) {
        this.setState({ otherSelected: false });
        this.props.onChange(undefined);
      }
      this.props.onChange(option);
    }
  }


  render() {
    let body;
    const { data, value } = this.props;

    if (data.options.length < constants.questions.selectWrapLimit) {
      body = (
        <RadioButtonGroup
          name={`select_one${data.id}`}
          onChange={(_, opt) => this.handleChange(opt)}
          valueSelected={this.state.otherSelected ? otherOptVal : value}
        >
          {data.options.map(opt => (
            <RadioButton key={`${opt}_${data.id}`} value={opt} label={opt} />
          ))}
          {data.acceptCustom ? (
            <RadioButton
              key={`*other_${data.id}`}
              value={otherOptVal}
              label={`${data.otherLabel ? data.otherLabel : 'Other (fill bellow)'}`}
            />
          ) : (
            []
          )}
        </RadioButtonGroup>
      );
    } else {
      body = (
        <SelectField
          floatingLabelText="Select one..."
          onChange={(_1, _2, opt) => this.handleChange(opt)}
          value={this.state.otherSelected ? otherOptVal : value}
        >
          {data.acceptCustom ? (
            <MenuItem
              value={otherOptVal}
              key={`*other_${data.id}`}
              primaryText={`${data.otherLabel ? data.otherLabel : otherOptVal}`}
            />
          ) : (
            []
          )}
          {data.options.map(opt => (
            <MenuItem value={opt} key={opt} primaryText={opt} />
          ))}
        </SelectField>
      );
    }
    return (
      <div>
        <div> {body} </div>
        <OtherField visible={this.state.otherSelected}>
          <TextField
            key={`other_so_${data.id}`}
            hintText={`${data.otherLabel ? data.otherLabel : 'Other'}`}
            onChange={(_, val) => this.handleChange(val, true)}
            value={value || ''}
          />
        </OtherField>
      </div>
    );
  }
}

SelectOne.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    otherLabel: PropTypes.string,
    acceptCustom: PropTypes.bool,
  }).isRequired,
};

SelectOne.defaultProps = {
  value: undefined,
};

export default SelectOne;
