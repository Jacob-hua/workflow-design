import React, { useState } from 'react'
import { Card } from 'antd'
import { CardProps } from 'antd/lib/card'
import { ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import cls from 'classnames'
import { ISchema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../ArrayBase'
import './style.less'

interface CardExtendProps extends CardProps {
  foldable?: boolean
  addable?: boolean
}

type ComposedArrayCards = React.FC<CardExtendProps> & ArrayBaseMixins

const isAdditionComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const isIndexComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Index') > -1
}

const isRemoveComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('Remove') > -1
}

const isMoveUpComponent = (schema: ISchema) => {
  return schema['x-component']?.indexOf('MoveUp') > -1
}

const isMoveDownComponent = (schema: ISchema, foldable?: boolean) => {
  return schema['x-component']?.indexOf('MoveDown') > -1 && foldable
}

const isOperationComponent = (schema: ISchema, foldable = true) => {
  return (
    isAdditionComponent(schema) ||
    isRemoveComponent(schema) ||
    isMoveDownComponent(schema, foldable) ||
    isMoveUpComponent(schema)
  )
}

export const ArrayCards: ComposedArrayCards = observer((props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []
  const prefixCls = usePrefixCls('formily-array-cards', props)
  if (!schema) throw new Error('can not found schema object')
  const [folded, setFolded] = useState<Array<boolean>>([true])
  const dataSt = [...folded]

  const setFoleded = (status, index) => {
    dataSt[index] = status
    setFolded(dataSt)
  }

  const addFoleded = () => {
    dataSt.push(true)
    setFolded(dataSt)
  }

  const deleteFoleded = (index) => {
    if(dataSt.length === 1) return;
    dataSt.splice(index, 1)
    setFolded(dataSt)
  }

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items
      const title = (
        <span>
          <RecursionField
            schema={items}
            name={index}
            filterProperties={(schema) => {
              if (!isIndexComponent(schema)) return false
              return true
            }}
            onlyRenderProperties
          />
          {props.title || field.title}
        </span>
      )
      const extra = (
        <span>
          <RecursionField
            schema={items}
            name={index}
            filterProperties={(schema) => {
              if (!isOperationComponent(schema, props.foldable)) return false
              return true
            }}
            onlyRenderProperties
          />
          {props.extra}
        </span>
      )
      const content = (
        <RecursionField
          schema={items}
          name={index}
          filterProperties={(schema) => {
            if (isIndexComponent(schema)) return false
            if (isOperationComponent(schema)) return false
            return true
          }}
        />
      )
      const propKeys = Object.keys(props)
      let properties = JSON.parse(JSON.stringify(props))
      propKeys.forEach((item) => {
        if (item === 'addable' || item === 'foldable') {
          delete properties[item]
        }
      })
      return (
        <ArrayBase.Item
          key={index}
          index={index}
          record={item}
          foldedArr={folded}
          setFoleded={setFoleded}
          addFoleded={addFoleded}
          deleteFoleded={deleteFoleded}
        >
          <Card
            {...properties}
            onChange={() => { }}
            className={cls(`${prefixCls}-item`, props.className)}
            title={title}
            extra={extra}
          >
            {folded[index] ? content : ''}
          </Card>
        </ArrayBase.Item>
      )
    })
  }

  const renderAddition = () => {
    return schema.reduceProperties((addition, schema, key) => {
      if (isAdditionComponent(schema) && props.addable) {
        return <RecursionField schema={schema} name={key} />
      }
      return addition
    }, null)
  }

  const renderEmpty = () => {
    if (dataSource?.length) return
    const items = Array.isArray(schema.items) ? schema.items[0] : schema.items
    const title = (
      <span>
        <RecursionField
          schema={items}
          name={0}
          filterProperties={(schema) => {
            if (!isIndexComponent(schema)) return false
            return true
          }}
          onlyRenderProperties
        />
        {props.title || field.title}
      </span>
    )
    const extra = (
      <span>
        <RecursionField
          schema={items}
          name={0}
          filterProperties={(schema) => {
            if (!isOperationComponent(schema)) return false
            return true
          }}
          onlyRenderProperties
        />
        {props.extra}
      </span>
    )
    const content = (
      <RecursionField
        schema={items}
        name={0}
        filterProperties={(schema) => {
          if (isIndexComponent(schema)) return false
          if (isOperationComponent(schema)) return false
          return true
        }}
      />
    )
    const propKeys = Object.keys(props)
    let properties = JSON.parse(JSON.stringify(props))
    // properties.setfoleded = setFoleded
    propKeys.forEach((item) => {
      if (item === 'addable' || item === 'foldable') {
        delete properties[item]
      }
    })
    return (
      <ArrayBase.Item key={0} index={0} record={items} foldedArr={folded}
        setFoleded={setFoleded}
        addFoleded={addFoleded}
        deleteFoleded={deleteFoleded}>
        <Card
          {...properties}
          onChange={() => { }}
          className={cls(`${prefixCls}-item`, props.className)}
          title={title}
          extra={extra}
        >
          {/* {
            folded ? content : ''
          }  */}
          {content}
        </Card>
      </ArrayBase.Item>
    )
  }

  return (
    <ArrayBase>
      {renderEmpty()}
      {renderItems()}
      {renderAddition()}
    </ArrayBase>
  )
})

ArrayCards.displayName = 'ArrayCards'

ArrayBase.mixin(ArrayCards)

export default ArrayCards
