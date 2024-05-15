import React, { Fragment } from 'react'
import { Button, Card, CardProps } from 'antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
  useNodeIdProps,
  DnFC,
} from '@designable/react'
import { observer } from '@formily/react'
import { useDropTemplate } from '../../hooks'
import {
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  createNodeId,
} from '../../shared'
import cls from 'classnames'
import './styles.less'

import { createFieldSchema } from '../Field'
import { AllLocales } from '../../locales'
import { AllSchemas } from '../../schemas'
import { DeleteOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons'

interface CardExtendProps extends CardProps {
  foldable?: boolean,
  addable?: boolean,
}

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

export const ArrayCards: DnFC<CardExtendProps> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('ArrayCards', (source) => {

    const objectNode = new TreeNode({
      componentName: node.componentName,
      props: {
        type: 'object',
      },
      children: [...source],
    })
    return [objectNode]
  })
  const renderCard = () => {
    if (node.children.length === 0) return <DroppableWidget />
    const children = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      (name) => name.indexOf('ArrayCards.') === -1,
    ])
    return (
      <>
        <Card
          {...props}
          title={
            <Fragment>
              <span data-content-editable="x-component-props.title">
                {props.title}
              </span>
            </Fragment>
          }
          className={cls('ant-formily-array-cards-item', props.className)}
          extra={
            <Fragment>
              <DeleteOutlined
                className={cls('ant-formily-array-card-remove', props.className)}
              ></DeleteOutlined>
              {props.foldable ? (
                <DownOutlined
                  className={cls('ant-formily-array-card-fold', props.className)}></DownOutlined>
              ) : null}
            </Fragment>
          }
        >
          <div {...createNodeId(designer, ensureObjectItemsNode(node).id)}>
            {children.length ? (
              children.map((node) => (
                <TreeNodeWidget key={node.id} node={node} />
              ))
            ) : (
              <DroppableWidget hasChildren={false} />
            )}
          </div>
        </Card>
        {props.addable ? (<Button
          type="dashed"
          block
          className={cls('ant-formily-array-card-addition', props.className)}
          disabled
          icon={<PlusOutlined />}
        >
          复制
        </Button>) : null}

      </>
    )
  }

  return (
    <div {...nodeId} className="dn-array-cards">
      {renderCard()}
    </div>
  )
})

// ArrayBase.mixin(ArrayCards)

// ArrayCards.Behavior = createArrayBehavior('ArrayCards')
ArrayCards.Behavior = createBehavior({
  name: 'ArrayCards',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'ArrayCards',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(AllSchemas.ArrayCards, 'ArrayCards'),
  },
  designerLocales: AllLocales.ArrayCards,
},)

ArrayCards.Resource = createResource({
  icon: 'ArrayCardsSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-decorator': 'FormItem',
        'x-component': 'ArrayCards',
        'x-component-props': {
          title: `标题`,
          addable: false,
          foldable: false
        },
      },
    },
  ],
})
