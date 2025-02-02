import React from 'react'
import { connect, mapReadPretty, mapProps } from '@formily/react'
import { Cascader as AntdCascader, CascaderProps } from 'antd'
import { PreviewText } from '../preview-text'
import { LoadingOutlined } from '@ant-design/icons'

// interface CascaderRef {
//   focus: () => void
//   blur: () => void
// }

// type FixAntdCascaderType = React.ForwardRefExoticComponent<
//   CascaderProps &
//   React.RefAttributes<CascaderRef> & {
//     suffixIcon?: React.ReactNode
//   }
// >

export const Cascader = connect(
  AntdCascader,
  mapProps(
    {
      dataSource: 'options',
    },
    (props, field) => {
      return {
        ...props,
				changeOnSelect: true,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
        getPopupContainer: trigger => trigger.parentNode
      }
    }
  ),
  mapReadPretty(PreviewText.Cascader)
)

export default Cascader
