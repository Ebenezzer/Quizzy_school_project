import React from 'react'
import Show from '../components/show/show'
import CategoryView from '../Views/categoryView/categoryView'

export default function Category(props) {
  return (
    <div>
      <CategoryView model={props.model}/>
    </div>
  )
}
