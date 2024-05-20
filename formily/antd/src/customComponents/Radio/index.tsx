import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Radio as AntdRadio } from 'antd'
import { RadioProps, RadioGroupProps } from 'antd/lib/radio'
import { PreviewText } from '../preview-text'

type ComposedRadio = React.FC<RadioGroupProps> & {
  __ANT_RADIO?: boolean
}

const AntdRadioGroup = AntdRadio.Group

export const Radio: ComposedRadio = connect(
  AntdRadioGroup,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select)
)

Radio.__ANT_RADIO = true

// Radio.Group = connect(
//   AntdRadio.Group,
//   mapProps({
//     dataSource: 'options',
//   }),
//   mapReadPretty(PreviewText.Select)
// )

export default Radio
