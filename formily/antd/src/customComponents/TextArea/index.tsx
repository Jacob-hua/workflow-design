import React from 'react'
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input as AntdInput } from 'antd'
import { InputProps, TextAreaProps } from 'antd/lib/input'
import { PreviewText } from '../preview-text'
import './style.less'

type ComposedTextArea = React.FC<TextAreaProps>

const AntdTextArea = AntdInput.TextArea

export const TextArea: ComposedTextArea = connect(
  AntdTextArea,
  mapProps((props) => {
    return{
      ...props
    }
  }),
  mapReadPretty(PreviewText.Input)
)

// export const TextArea = connect(AntdInput.TextArea, mapReadPretty(PreviewText.Input))

export default TextArea
