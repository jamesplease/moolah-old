import _ from 'lodash';
import React, {Component} from 'react';
import Pikaday from 'react-pikaday';
import RequiredInput from './required-input';
import {
  getDateStringFromDate, createDateFromString
} from '../../transactions/utils/format-date';

export default class DatePicker extends Component {
  render() {
    const {date, disabled} = this.props;
    const {isLargeScreen} = this.state;

    if (!isLargeScreen) {
      return (
        <RequiredInput
          type="date"
          className="text-input datePicker_input"
          placeholder="MM/DD/YYYY"
          autoComplete="off"
          autoCorrect={true}
          disabled={disabled}
          spellCheck={true}
          inputMode="verbatim"
          maxLength={11}
          {...date}/>
      );
    }

    const dateObj = createDateFromString(date.value);

    return (
      <Pikaday
        value={dateObj}
        className="selectable datePicker_input datePicker_desktopInput"
        readOnly
        initialOptions={{
          theme: 'datePicker_pikaday'
        }}
        onBlur={() => date.onBlur(date.value)}
        onFocus={date.onFocus}
        onChange={this.onPikadayChange}/>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      isLargeScreen: this.isLargeScreen(),
    };

    this.onWindowResize = _.throttle(this.onWindowResize, 50);
  }

  componentDidMount() {
    addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    removeEventListener('resize', this.onWindowResize);
  }

  isLargeScreen() {
    return matchMedia('(min-width: 768px)').matches;
  }

  onWindowResize = () => {
    this.setState({isLargeScreen: this.isLargeScreen()});
  }

  onPikadayChange = (dateValue) => {
    const {date} = this.props;
    const {onChange} = date;

    const newDateString = getDateStringFromDate(dateValue);
    onChange(newDateString);
  }
}
