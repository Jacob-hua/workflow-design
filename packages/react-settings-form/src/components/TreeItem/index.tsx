import React, { useState } from 'react'
import { Tree, Select } from 'antd'
import './styles.less'

export const TreeItem: React.FC<any> = (props) => {
  const loop = (data) =>
    data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Tree.TreeNode key={item.dataCode} title={item.name}>
            {loop(item.children)}
          </Tree.TreeNode>
        )
      }
      return <Tree.TreeNode key={item.dataCode} title={item.name} />
    })
  const [treeData] = useState<Array<any>>([
    {
      id: '1644597570006728705',
      name: '工业综合能源',
      type: 'project',
      children: [
        {
          id: '1644597648800923649',
          name: '制冷系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SZL01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1655756865398190081',
          name: '供暖系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SGN01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1655757372401463298',
          name: '配电系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SPD01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1661649373947281409',
          name: '充电系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SCD01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1661650497991393282',
          name: '光伏系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SGFXT_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1661672747025088514',
          name: '新风系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SXF01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1662699228866068482',
          name: '储能系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SCN01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1684023765117222914',
          name: '制氢系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SZQ01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1686977041627906050',
          name: 'zlxt',
          type: 'system',
          children: [],
          dataCode: 'PGY02_Sfdfd_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1690931005359177729',
          name: '风电系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SFDXT_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1715172468221591554',
          name: '供水系统',
          type: 'system',
          children: [],
          dataCode: 'PGY02_SSS01_ST00000_U00000_EQ000000000_MP0000',
        },
        {
          id: '1703696946931294210',
          name: '冷负荷',
          type: 'load',
          children: [],
          dataCode: 'PGY02_S0000_ST00000_U00000_FH0000LFH01_MP0000',
        },
        {
          id: '1710901346750746625',
          name: '热负荷',
          type: 'load',
          children: [],
          dataCode: 'PGY02_S0000_ST00000_U00000_FH0000RFH01_MP0000',
        },
        {
          id: '1710901405332590594',
          name: '电负荷',
          type: 'load',
          children: [],
          dataCode: 'PGY02_S0000_ST00000_U00000_FH0000DFH01_MP0000',
        },
      ],
      dataCode: 'PGY02_S0000_ST00000_U00000_EQ000000000_MP0000',
    },
  ])
  let equipmentList = [
    { key: '设备1', value: 'eq1' },
    { key: '设备2', value: 'eq2' },
    { key: '设备3', value: 'eq3' },
    { key: '设备4', value: 'eq4' },
    { key: '设备5', value: 'eq5' },
    { key: '设备6', value: 'eq6' },
    { key: '设备7', value: 'eq7' },
    { key: '设备8', value: 'eq8' },
    { key: '设备9', value: 'eq9' },
    { key: '设备10', value: 'eq10' },
    { key: '设备11', value: 'eq12' },
    { key: '设备12', value: 'eq13' },
    { key: '设备14', value: 'eq14' },
    { key: '设备15', value: 'eq15' },
    { key: '设备16', value: 'eq16' },
    { key: '设备17', value: 'eq17' },
    { key: '设备18', value: 'eq18' },
    { key: '设备19', value: 'eq19' },
  ]

  const [selectData, setSelectData] = useState<Array<any>>(
    props.value?.propertiesList ?? []
  )
  let treeDataItem = props.value ?? { key: '', title: '', propertiesList: [] }
  const handlerChooseTreeItem = (_, e) => {
    treeDataItem = { key: e.node.key, title: e.node.title, propertiesList: [] }
    props.onChange(treeDataItem)
    setSelectData([])
  }
  const handlerChangeProperties = (_: any, option: any[]) => {
    treeDataItem.propertiesList = option
    setSelectData(option)
    props.onChange(treeDataItem)
  }
  return (
    <div className="model-properties-wrapper">
      <Tree
        className="tree-data"
        defaultExpandAll
        selectedKeys={[props.value?.key]}
        onSelect={handlerChooseTreeItem}
      >
        {loop(treeData)}
      </Tree>
      <div className="properties-item">
        <label>属性</label>
        <Select
          className="select-wrapper"
          mode="multiple"
          maxTagCount={1}
          value={selectData}
          onChange={handlerChangeProperties}
        >
          {equipmentList.map((itm) => {
            return (
              <Select.Option value={itm.value} key={itm.value}>
                {itm.key}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}
