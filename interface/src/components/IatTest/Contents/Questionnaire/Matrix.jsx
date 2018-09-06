import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { MatrixRow, MatrixRadioCell, MatrixLabelCell } from './styles';

class Matrix extends Component {
  state = {
  }

  allAnswered = value => (
    value && Object.keys(value).every(key => (
      typeof value[key] !== 'undefined'
    ))
  )

  handleChange = (row, col, val) => {
    let value;
    if (typeof this.props.value === 'undefined') {
      value = {};
      this.props.data.rows.forEach((c) => {
        value[c] = undefined;
      });
      value[row] = val ? col : undefined;
    } else {
      value = { ...this.props.value };
      value[row] = val ? col : undefined;
    }
    const ready = this.props.data.mustAnswerAll ? this.allAnswered(value) : undefined;
    this.props.onChange(value, ready);
  }


  render() {
    const { data, value } = this.props;

    return (
      <div>
        <MatrixRow key="matr_header">
          <MatrixLabelCell />
          {data.cols.map(col => (
            <MatrixRadioCell key={`matr_header_${data.id}_${col}`}>
              {col}
            </MatrixRadioCell>
          ))}
        </MatrixRow>

        {data.rows.map(row => (
          <MatrixRow key={`mat_row_${row}_${data.id}`}>
            <MatrixLabelCell key={`mat_lab_${row}_${data.id}`}>{row}</MatrixLabelCell>
            {data.cols.map(col => (
              <MatrixRadioCell key={`cell_${col}_${row}_${data.id}`}>
                <div>
                  <Checkbox
                    checked={value && value[row] === col}
                    onCheck={(_, val) => this.handleChange(row, col, val)}
                  />
                </div>
              </MatrixRadioCell>
            ))}
          </MatrixRow>
        ))}
      </div>
    );
  }
}

Matrix.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    cols: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
    onePerCol: PropTypes.bool,
    mustAnswerAll: PropTypes.bool,
  }).isRequired,
};

Matrix.defaultProps = {
  value: undefined,
};

export default Matrix;
