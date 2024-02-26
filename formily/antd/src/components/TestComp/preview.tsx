import React, { useState } from 'react'
import { Col, Row, Button, Input } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Select as AntdSelect } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../Field'
import { AllLocales } from '../../locales'
import cls from 'classnames'
import './styles.less'

export interface IDesignableTestCompProps {
  value?: string
  style?: React.CSSProperties
  className?: string
}
export interface SparePart {
  label: string
  value: string
  sparenum?: number
}

export const TestComp: DnFC<IDesignableTestCompProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<SparePart[]>([])
  const handleChange = (item) => {
    // eslint-disable-next-line no-console
    console.log(item)
    const flag = selectedItems.some(({ value }) => item.value === value)
    if (flag) {
      return
    }
    let sparePart = item
    sparePart.sparenum = 1
    let spareParts = [...selectedItems]
    spareParts.push(sparePart)
    setSelectedItems(spareParts)
  }
  const SelectItemRows = selectedItems.map((row) => {
    const deleteSpare = (itemnum: string) => {
      // let spareParts = [...selectedItems];
      // const index = spareParts.findIndex(({value}) => value === itemnum);
      // if(index != -1) {
      //   spareParts.splice(index, 1);
      // }
      // setSelectedItems(spareParts);
    }
    const subtract = (row: SparePart) => {
      // if(row.sparenum <= 1) return;
      // row.sparenum -= 1;
      // let spareParts = [...selectedItems];
      // const index = spareParts.findIndex(({value}) => value === row.value);
      // spareParts.splice(index,1,row);
      // setSelectedItems(spareParts);
    }
    const addition = (row: SparePart) => {
      // row.sparenum += 1;
      // let spareParts = [...selectedItems];
      // const index = spareParts.findIndex(({value}) => value === row.value);
      // spareParts.splice(index,1,row);
      // setSelectedItems(spareParts);
    }
    return (
      <>
        <Row>
          <Col span={20}>{row.label}</Col>
          <Col span={4}>
            <span onClick={() => deleteSpare(row.value)}>
              <DeleteOutlined />
            </span>
          </Col>
        </Row>
        <Row>
          <div>
            <Button onClick={() => subtract(row)}>-</Button>
          </div>
          <div>
            <Input disabled value={row.sparenum}></Input>
          </div>
          <div>
            <Button onClick={() => addition(row)}>+</Button>
          </div>
        </Row>
      </>
    )
  })
  return (
    <div className={cls(props.className)}>
      <AntdSelect
        showSearch
        labelInValue
        style={{ width: '100%' }}
        onChange={handleChange}
        options={[
          {
            label: 'aaa',
            value: '001',
          },
          {
            label: 'bbb',
            value: '002',
          },
          {
            label: 'ccc',
            value: '003',
          },
          {
            label: 'ddd',
            value: '004',
          },
        ]}
      ></AntdSelect>
      {SelectItemRows}
    </div>
  )
}

TestComp.Behavior = createBehavior({
  name: 'TestComp',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'TestComp',
  designerProps: {
    propsSchema: createFieldSchema(),
  },
  designerLocales: AllLocales.TestComp,
})

TestComp.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: '备品',
        'x-decorator': 'FormItem',
        'x-component': 'TestComp',
      },
    },
  ],
})
