import moment from 'moment'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import {
  DatePickerProps as AntdDatePickerProps,
  RangePickerProps,
} from 'antd/lib/date-picker'
import { PreviewText } from '../preview-text'
import { formatMomentValue, momentable } from '../__builtins__'

// type DatePickerProps<PickerProps> = Exclude<
//   PickerProps,
//   'value' | 'onChange'
// > & {
//   value: string
//   onChange: (value: string | string[]) => void
// }

type ComposedDatePicker = React.FC<AntdDatePickerProps> & {
  RangePicker?: React.FC<RangePickerProps>
}

const mapDateFormat = function () {
  const getDefaultFormat = (props) => {
    const picker = props?.picker;
    const precision = props?.precision;
    if(picker === 'date_time'){
      return 'YYYY-MM-DD HH:mm'
    }
    if(picker === 'time'){
      return precision
    }
    return 'YYYY-MM-DD'
  }

  const getShowTime = props => {
    const picker = props?.picker;
    const precision = props?.precision;
    if (picker === 'time') {
      return { format: precision };
    }
    if (picker === 'date_time') {
      return { format: 'HH:mm' };
    }
    return false;
  }
  return (props: any) => {
    const format = getDefaultFormat(props)
    const onChange = props.onChange
    const picker = props.picker === 'time' ? 'time' : 'date'
    const showTime = getShowTime(props)
    return {
      ...props,
      picker,
      showTime,
      format: format,
      value: momentable(props.value, format),
      onChange: (value: moment.Moment | moment.Moment[]) => {
        if (onChange) {
          onChange(formatMomentValue(value, format))
        }
      },
      getPopupContainer: trigger => trigger.parentNode
    }
  }
}

export const DatePicker: ComposedDatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
