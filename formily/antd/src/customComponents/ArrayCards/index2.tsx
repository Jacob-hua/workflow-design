import React, { useState } from 'react'
import { Card, Empty, Button } from 'antd'
import {
  DeleteOutlined,
  DownOutlined,
  PlusOutlined,
  RightOutlined
} from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { CardProps } from 'antd/lib/card'
import { ArrayField } from '@formily/core'
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
  Schema,
} from '@formily/react'
import cls from 'classnames'
import { ISchema } from '@formily/json-schema'
import { usePrefixCls } from '../__builtins__'
import { ArrayBase, ArrayBaseMixins } from '../ArrayBase'
import './style.less'
import { clone, isValid } from '@formily/shared'

interface CardExtendProps extends CardProps {
  foldable?: boolean,
  addable?: boolean,
  disabled?: boolean,
  onAdd?: (index: number) => void
  onRemove?: (index: number) => void
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

const getSchemaDefaultValue = (schema: Schema) => {
  if (schema?.type === 'array') return []
  if (schema?.type === 'object') return {}
  if (schema?.type === 'void') {
    for (let key in schema.properties) {
      const value = getSchemaDefaultValue(schema.properties[key])
      if (isValid(value)) return value
    }
  }
}

const getDefaultValue = (defaultValue: any, schema: Schema) => {
  if (isValid(defaultValue)) return clone(defaultValue)
  if (Array.isArray(schema?.items))
    return getSchemaDefaultValue(schema.items[0])
  return getSchemaDefaultValue(schema.items)
}

export const ArrayCards: ComposedArrayCards = observer((props) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []
  const prefixCls = usePrefixCls('formily-array-cards', props)

  if (!schema) throw new Error('can not found schema object')

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items
      const [folded, setFolded] = useState<Boolean>(false)
      const title = (
        <span>
          {props.title || field.title}
        </span>
      )
      const extra = (
        <span>
          <DeleteOutlined
            className={cls(`${prefixCls}-remove`, props.className)}
            onClick={(e) => {
              if (props?.disabled) return
              e.stopPropagation()
              field.remove(index)
              props?.onRemove?.(index)
            }}
          ></DeleteOutlined>
          {
            props.foldable && folded ? (
              <RightOutlined
                className={cls(`${prefixCls}-fold`, props.className)}
                onClick={(e) => {
                  if (props?.disabled) return
                  e.stopPropagation()
                  // array?.field?.moveUp(index)
                  // array?.props?.onMoveUp?.(index)
                  setFolded(false)
                }}
              />
            ) : (<></>)
          }
          {
            props.foldable && !folded ? (
              <DownOutlined
                className={cls(`${prefixCls}-fold`, props.className)}
                onClick={(e) => {
                  if (props?.disabled) return
                  e.stopPropagation()
                  // array?.field?.moveUp(index)
                  // array?.props?.onMoveUp?.(index)
                  setFolded(false)
                }}
              />
            ) : (<></>)
          }
          {/* <RecursionField
            schema={items}
            name={index}
            filterProperties={(schema) => {
              if (!isOperationComponent(schema, props.foldable)) return false
              return true
            }}
            onlyRenderProperties
          /> */}
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
      const propKeys = Object.keys(props);
      let properties = JSON.parse(JSON.stringify(props));
      propKeys.forEach(item => {
        if (item === 'addable' || item === 'foldable') {
          delete properties[item]
        }
      })
      return (
        <Card
          {...properties}
          key={index}
          onChange={() => { }}
          className={cls(`${prefixCls}-item`, props.className)}
          title={title}
          extra={extra}
        >
          {
            props.foldable && folded ? null : content
          }
        </Card>
      )
    })
  }

  const renderAddition = () => {
    if (props.addable) {
      return (
        <Button
          type="dashed"
          block
          disabled={props.disabled}
          className={cls(`${prefixCls}-fold`, props.className)}
          onClick={(e) => {
            if (props.disabled) return
            const defaultValue = getDefaultValue(props.defaultValue, schema)
            field?.push(defaultValue)
            props?.onAdd?.(field?.value?.length - 1)
          }}
          icon={<PlusOutlined />}
        >
          复制
        </Button>
      )
    }
    return null
  }

  const renderEmpty = () => {
    if (dataSource?.length) return
    const items = Array.isArray(schema.items)
      ? schema.items[0]
      : schema.items
    const [folded, setFolded] = useState<Boolean>(false)
    const title = (
      <span>
        {props.title || field.title}
      </span>
    )
    const extra = (
      <span>
        <DeleteOutlined
          className={cls(`${prefixCls}-remove`, props.className)}
          onClick={(e) => {
            if (props?.disabled) return
            e.stopPropagation()
            field.remove(0)
            props?.onRemove?.(0)
          }}
        ></DeleteOutlined>
        {
          props.foldable && folded ? (
            <RightOutlined
              className={cls(`${prefixCls}-fold`, props.className)}
              onClick={(e) => {
                if (props?.disabled) return
                e.stopPropagation()
                // array?.field?.moveUp(index)
                // array?.props?.onMoveUp?.(index)
                setFolded(false)
              }}
            />
          ) : (<></>)
        }
        {
          props.foldable && !folded ? (
            <DownOutlined
              className={cls(`${prefixCls}-fold`, props.className)}
              onClick={(e) => {
                if (props?.disabled) return
                e.stopPropagation()
                // array?.field?.moveUp(index)
                // array?.props?.onMoveUp?.(index)
                setFolded(false)
              }}
            />
          ) : (<></>)
        }
        {/* <RecursionField
          schema={items}
          name={index}
          filterProperties={(schema) => {
            if (!isOperationComponent(schema, props.foldable)) return false
            return true
          }}
          onlyRenderProperties
        /> */}
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
    const propKeys = Object.keys(props);
    let properties = JSON.parse(JSON.stringify(props));
    propKeys.forEach(item => {
      if (item === 'addable' || item === 'foldable') {
        delete properties[item]
      }
    })
    return (
      <Card
        {...properties}
        key={0}
        onChange={() => { }}
        className={cls(`${prefixCls}-item`, props.className)}
        title={title}
        extra={extra}
      >
        {
          props.foldable && folded ? (<></>) : content
        }
      </Card>
    )
  }

  return (
    <>
      {renderEmpty()}
      {renderItems()}
      {renderAddition()}
    </>
  )
})

ArrayCards.displayName = 'ArrayCards'

// ArrayBase.mixin(ArrayCards)

export default ArrayCards
