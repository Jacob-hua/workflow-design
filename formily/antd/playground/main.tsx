import '../public-path'
import 'antd/dist/antd.dark.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import actions from './service/actions'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN'

function render(props: Record<string, any>, appDOM: any) {
  const { container } = props
  ReactDOM.render(
    appDOM,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  )
}

function createDOM(flag: boolean) {
  if (flag) {
    return (
      <ConfigProvider locale={locale}>
        <BrowserRouter
          // 对两种不同的环境分别给出不同的基础路径
          basename={
            (window as any).__POWERED_BY_QIANKUN__ ? '/home/Form' : '/'
          }
        >
          <App />
        </BrowserRouter>
      </ConfigProvider>
    )
  } else {
    return (
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    )
  }
}

// 独立运行，直接调用 createRoot函数 render
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({}, createDOM(false))
}
// lifecycle => 初始化
export async function bootstrap(props: Record<string, any>) {
  // eslint-disable-next-line no-console
  console.log(props)
}

// lifecycle => 挂载
export async function mount(props: Record<string, any>) {
  // eslint-disable-next-line no-console
  // console.log(props,'mount');
  actions.setActions(props.actions);
  // actions.setGlobalState({test: 'aaa'})
  render(props, createDOM(true))
}

// lifecycle => 卸载
export async function unmount(_props: Record<string, any>) {
  const { container } = _props
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root')
  )
}
// ReactDOM.render(<App />, document.getElementById('root'))
