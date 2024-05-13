import React, { useState, useEffect } from 'react'
// import { createForm } from '@formily/core'
import { DnFC } from '@designable/react'
import { Card as AntdCard } from 'antd'
import { createBehavior, createResource } from '@designable/core'
// import { observer } from '@formily/reactive-react'
// import { DroppableWidget } from '@designable/react'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
// import { FormProvider, createSchemaField } from '@formily/react'

import './index.less'

export const Display: DnFC<any> = (props) => {
  const [schemaList] = useState<any>([])
  // const options: any = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     procinstId: '83200430-efaa-4783-94a6-40bcb1bd10f8_test'
  //   })
  // }

  // const getData = async () => {
  //   const result: Response | void = await fetch(props.httpUrl, options).catch(err => {
  //     console.log(err)
  //   });
  //   const list = []
  //   if (!result) return;
  //   const datas = await result.json()
  //   if (datas.code === '200') {
  //     datas.data.forEach(item => {
  //       list.push({
  //         contentId: item.contentId,
  //         nodeCode: item.nodeCode,
  //         content: item.content ? JSON.parse(item.content) : {}
  //       })
  //       console.log(JSON.parse(item.content))
  //     })
  //     useSchemaList(list)
  //     console.log(schemaList)
  //   }
  // }

  useEffect(() => {}, [props.httpUrl])
  useEffect(() => {}, [schemaList.httpUrl])
  return (
    <AntdCard
      {...props}
      title={
        <span data-content-editable="x-component-props.title">知识库组件</span>
      }
    >
      <div className="display-http">本组件将自动拉取工单关联的知识库细项</div>
    </AntdCard>
  )
}

Display.Behavior = createBehavior({
  name: 'Display',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Display',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.DisplayFormily, 'Display'),
  },
  designerLocales: AllLocales.DisplayFormily,
})

Display.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Display',
      },
    },
  ],
})
