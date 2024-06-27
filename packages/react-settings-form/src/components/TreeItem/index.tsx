import React, { useState, useEffect } from 'react'
import { Tree, Select } from 'antd'
import './styles.less'

export const TreeItem: React.FC<any> = (props) => {
  const headers = {
    'Content-Type': 'application/json',
    'Workflow-Platform-Authorization':
      'R7P+1X8OQrdDGO6B+G4ZkRHtp1DTIZdvq+aNXa9UR5hViubDu7zIgbThItXx9xQnxG2ZFmYPzr4W0BLZDHww17BVnErrU8etYZPMRdJCArvNYvgPbpDocH6xaOoq+XlGd4germfwf3CcovUg+WFs6wWB4vtSSJVvNZYihnHLbxyVRWtoCjljS8IZkb9GONCdh0FBHP2rzWLOIaY794mclbbUWQ1mW3YIIVLFiRrf6fstpCTSZVZ7N+0K7uo0IV/6s//PmFWwVe6ELiCpBfXjUM6Ri1NOb46WQZksIFX+kggR/V+mIbEE/+cM+RNQXcnKVEJDmpAnfByAzd34d8eZ6UtmujQOGL3Y5rAJRRKXD3WakSYBGMLrv2wC0Lz0ckmUepH09co4C/uHyddds+sE/8nmb2y4vXFIpnj9hLyyU7+Zvh2or/FBP4UsuIHK0uG5U/e0tC+siEphsXq2ZR9jwNrvIHF0UnshnG7D67duOEXSUNhCoLKJfnrhLEMKF+rulHtnljRURyAlqMgo929HoWQYnM3kDcrgfo9giyRp7pZyq87xjNch6ylIKOK0qYIGWmnG9KArJRLyIeo345j5YKeIls1OdfHyGBERZp7LvDbB44H4KiIb31U2dkHpDx9nwBuUYx6I3bWXVFaKdPKxRr4iRylWsMvZgegi5pLzW2Xvak6NCn4VbiK3Zqj3KepTl/6rsgQJY3GPDlzmfwNhsO9qTo0KfhVuIrdmqPcp6lOwr5qZbkyflBbFn+xEVgWVjkIf0y30TiwlyURiWCbLhX1jKxlfYpizH3Uzl4DImpvANJdxlXrXc+bak/TXcz+agQhCO4GgomuvxlRmyX/a34vKeCBu3EneCmX5jaQYH5+8OrQbnwedEMkQmbTSWGwrHaSvDd61//TcAHzpLIbGejczr6TBEA3mH8WYFH3BWtFY4td9P/0eebVPxyMFwySLcuZoxcPUDdYrA29cn4BRK08lvaqrUP0ZO4liG+XiYHr+2K/KmNDhwrlLc/Vp0lGqAYfWPJbwXtUFzUPc8Pn4prKREKq1bC/Mk3WdLWXjBbDkt2HbDtT1IP/WEFCnaYXM9kA9prw/ULjSoL1qmzx9xMN2eMyFI6Hvs4oYFzT1BudiJhwx+BKFRdpKndZiYf/VTYABLmiqEVVbEnvjbB+gjkkDDiKWrS3Io+Qu5ujH2eSXjOHeeyllIcVRET3Ls0uK+XdQqS2mHoZ6zdyUIVyYnN3mZxhIVUOTZ+f6SySSQJEHQQx07zV2TqJO0pI80FuHKH1pFFR6zgVoW06JKAA+K7lVoLTMxjQ8TaL/BXhh/NMemtva/huAqkBgiyF/d5JCtDdMThpBXCzwJMideh2482Tfp24hkx4ey8tqY/1VV8WqbRHKhPjhpr+bk56mNm5jnws03Jh4byV+uEcQY8tsmvg16yp1zC0QUOW0L0ZCT6z4JQT/oY/Uii+nXKW1MBBD5oCJvDhsT8QUQd+fEVjIIg==',
  }
  let url1 = ''
  let url2 = ''
  if (window.location.port === '10001') {
    url1 = '/workflow/design/form/sec/model/trees'
    url2 = '/workflow/design/form/sec/model/props'
  } else {
    url1 = '/workflow/workflow/design/form/sec/model/trees'
    url2 = '/workflow/workflow/design/form/sec/model/props'
  }
  const getTreeData = async () => {
    const result = await fetch(url1, {
      method: 'GET',
      headers,
    })
    result.json().then((res) => {
      setTreeData(res.data)
      if (props.value?.key) {
        getpropertiesData(props.value?.key)
      }
    })
  }
  const getpropertiesData = async (code) => {
    const result = await fetch(url2, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dataCode: code,
        propGroup: 'dynamic',
        page: 1,
        limit: 1000,
      }),
    })
    result.json().then((res) => {
      setEquipmentList(res.data.props ?? [])
    })
  }
  useEffect(() => {
    getTreeData()
  }, [])
  const loop = (data) =>
    data.map((item) => {
      if (item.children && item.children.length) {
        return (
          <Tree.TreeNode key={item.dataCode} title={item.modelName}>
            {loop(item.children)}
          </Tree.TreeNode>
        )
      }
      return <Tree.TreeNode key={item.dataCode} title={item.modelName} />
    })
  const [treeData, setTreeData] = useState<Array<any>>([])
  const [equipmentList, setEquipmentList] = useState<Array<any>>([])

  const [selectData, setSelectData] = useState<Array<any>>(
    props.value?.propertiesList ?? []
  )
  let treeDataItem = props.value ?? { key: '', title: '', propertiesList: [] }
  const handlerChooseTreeItem = (_, e) => {
    treeDataItem = {
      key: e.node.key,
      title: e.node.modelName,
      propertiesList: [],
    }
    getpropertiesData(e.node.key)
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
      {treeData.length ? (
        <Tree
          className="tree-data"
          defaultExpandedKeys={[props.value?.key]}
          defaultSelectedKeys={[props.value?.key]}
          fieldNames={{
            title: 'modelName',
            key: 'dataCode',
            children: 'children',
          }}
          onSelect={handlerChooseTreeItem}
          treeData={treeData}
        >
          {/* {loop(treeData)} */}
        </Tree>
      ) : (
        <></>
      )}
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
              <Select.Option value={itm.propCode} key={itm.propCode}>
                {itm.propName}
              </Select.Option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}
