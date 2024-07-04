import React, { useState } from 'react'
import { DnFC } from '@designable/react'
import {
  Card as AntdCard,
  Button as AntdButton,
  Select as AntdSelect,
  Input as AntdInput,
  DatePicker as AntdDatePicker,
} from 'antd'
import moment, { Moment } from 'moment'
import { createBehavior, createResource } from '@designable/core'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import './styles.less'

declare interface AbnormalItemObj {
  id: string
  equipment: string
  type: string
  time: string
  desc: string
  remark: string
  handlerChangeDataByType?: <T, D, S>(id: T, type: D, value?: S) => void
}

// const { Option } = AntdSelect;

const setId = () => {
  return Math.random().toString(16).substring(3, 30)
}

const AbnormalItem: DnFC<AbnormalItemObj> = (props) => {
  let timer = null
  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 4 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // }
  const equipmentList = []
  const abnormalTypeList = []
  const handlerChangeEq = (val: string) => {
    props.handlerChangeDataByType(props.id, 'equipment', val)
  }
  const handlerChangeType = (val: string) => {
    props.handlerChangeDataByType(props.id, 'type', val)
  }
  const handlerChangeTime = (val: Moment) => {
    props.handlerChangeDataByType(
      props.id,
      'time',
      val.format('YYYY-MM-DD HH:mm')
    )
  }
  const handlerChangeDesc = (val) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      props.handlerChangeDataByType(props.id, 'desc', val.target.value)
    }, 100)
  }
  const handlerChangeMark = (val) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      props.handlerChangeDataByType(props.id, 'remark', val.target.value)
    }, 100)
  }
  return (
    <div className="abnormal-wrapper-item">
      <div style={{ marginBottom: '20px' }}>
        <label style={{ width: '100px', textAlign: 'right' }}>异常设备:</label>
        <AntdSelect
          onChange={handlerChangeEq}
          style={{ width: 'calc(100% - 160px)', marginLeft: '20px' }}
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
      <div style={{ marginBottom: '20px' }}>
        <label style={{ width: '100px', textAlign: 'right' }}>异常类型:</label>
        <AntdSelect
          onChange={handlerChangeType}
          style={{ width: 'calc(100% - 160px)', marginLeft: '20px' }}
        >
          {abnormalTypeList.map((itm) => {
            return (
              <AntdSelect.Option value={itm.value} key={itm.value}>
                {itm.key}
              </AntdSelect.Option>
            )
          })}
        </AntdSelect>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ width: '100px', textAlign: 'right' }}>异常时间:</label>
        <AntdDatePicker
          onChange={handlerChangeTime}
          format="YYYY-MM-DD HH:mm"
          showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
          style={{ width: 'calc(100% - 160px)', marginLeft: '20px' }}
        ></AntdDatePicker>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ width: '100px', textAlign: 'right' }}>异常描述:</label>
        <AntdInput.TextArea
          onChange={handlerChangeDesc}
          style={{ width: 'calc(100% - 160px)', marginLeft: '20px' }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ width: '100px', textAlign: 'right' }}>备注:</label>
        <AntdInput.TextArea
          onChange={handlerChangeMark}
          style={{ width: 'calc(100% - 160px)', marginLeft: '20px' }}
        />
      </div>
    </div>
  )
}

export const Abnormal: DnFC<any> = (props) => {
  const [dataList, setDataList] = useState<Array<AbnormalItemObj>>([
    {
      id: setId(),
      equipment: '',
      type: '',
      time: '',
      desc: '',
      remark: '',
    },
  ])

  const handlerToAddDataItem = () => {
    setDataList([
      ...dataList,
      { equipment: '', type: '', time: '', desc: '', remark: '', id: setId() },
    ])
  }
  const handlerChangeDataByType = (id, type, value) => {
    const newData = [...dataList]
    newData.forEach((item) => {
      if (item.id === id) {
        item[type] = value
      }
    })
    setDataList([...newData])
  }
  return (
    <AntdCard
      className="abnormal-wrapper"
      {...props}
      title={
        <span data-content-editable="x-component-props.title">异常报修</span>
      }
    >
      {dataList.map((itm) => (
        <AbnormalItem
          {...itm}
          handlerChangeDataByType={handlerChangeDataByType}
          key={itm.id}
        />
      ))}
      <AntdButton
        className="antd-button"
        shape="round"
        type="primary"
        onClick={handlerToAddDataItem}
      >
        ＋ 增加异常设备
      </AntdButton>
    </AntdCard>
  )
}

Abnormal.Behavior = createBehavior({
  name: 'Abnormal',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Abnormal',
  designerProps: {
    propsSchema: createVoidFieldSchema(),
  },
  designerLocales: AllLocales.Abnormal,
})

Abnormal.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<any>',
        // 'x-decorator': 'FormItem',
        'x-component': 'Abnormal',
      },
    },
  ],
})
