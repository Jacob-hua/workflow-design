import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DesingerView } from './designer'
import { FormPreview } from './formPreview'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DesingerView />}></Route>
      <Route path="/preview" element={<FormPreview />}></Route>
    </Routes>
  )
}

export default App
