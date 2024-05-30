import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Checkbox as AntdCheckbox } from 'antd'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import { PreviewText } from '../preview-text'

type ComposedCheckbox = React.FC<CheckboxGroupProps> & {
  __ANT_CHECKBOX?: boolean
}

const AntdCheckboxGroup = AntdCheckbox.Group

export const Checkbox: ComposedCheckbox = connect(
  AntdCheckboxGroup,
  mapProps({
    dataSource: 'options',
  }),
  mapReadPretty(PreviewText.Select, {
    mode: 'tags',
  })
)

Checkbox.__ANT_CHECKBOX = true

// Checkbox.Group = connect(
//   AntdCheckbox.Group,
//   mapProps({
//     dataSource: 'options',
//   }),
//   mapReadPretty(PreviewText.Select, {
//     mode: 'tags',
//   })
// )

export default Checkbox
