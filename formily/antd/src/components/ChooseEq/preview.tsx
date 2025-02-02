import React, { useState } from 'react'
import { DnFC } from '@designable/react'
import {
  Card as AntdCard,
  Select as AntdSelect,
  Button as AntdButton,
} from 'antd'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

export const ChooseEq: DnFC<any> = (props) => {
  const [eqList, setEqList] = useState<Array<string>>([''])
  const equipmentList = []
  const handlerChangeEq = (val: string, index: number) => {
    const newData = [...eqList]
    newData[index] = val
    setEqList([...newData])
  }
  const handlerToAddDataItem = () => {
    setEqList([...eqList, ''])
  }
  return (
    <AntdCard
      className="eq-wrapper"
      {...props}
      title={
        <span data-content-editable="x-component-props.title">设备选择</span>
      }
    >
      {eqList.map((item, index) => {
        return (
          <div className="eq-list-item" key={index}>
            <label>设备{index + 1}:</label>
            <AntdSelect
              className="select-wrapper"
              defaultValue={item}
              onChange={(val) => handlerChangeEq(val, index)}
            >
              {equipmentList.map((itm) => {
                return (
                  <AntdSelect.Option value={itm.value} key={itm.value}>
                    {itm.key}
                  </AntdSelect.Option>
                )
              })}
            </AntdSelect>
          </div>
        )
      })}
      <AntdButton
        className="antd-button"
        shape="round"
        type="primary"
        onClick={handlerToAddDataItem}
      >
        ＋ 增加设备
      </AntdButton>
    </AntdCard>
  )
}

ChooseEq.Behavior = createBehavior({
  name: 'ChooseEq',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ChooseEq',
  designerProps: {
    propsSchema: createVoidFieldSchema(),
  },
  designerLocales: AllLocales.ChooseEq,
})

ChooseEq.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<{[key: string]: string}>',
        // 'x-decorator': 'FormItem',
        'x-component': 'ChooseEq',
      },
    },
  ],
})
