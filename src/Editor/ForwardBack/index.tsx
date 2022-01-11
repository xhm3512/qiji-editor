import React from 'react';
import { BtnIconClick } from '../components/StyleButton'
export default ({ onUnReDoClick }: any) => {
  const list = [
    { label: 'fowrad' },
    { label: 'back' },
  ]
  return <>
    {
      list.map((item) => <BtnIconClick key={item.label} type={item.label} onClick={ ()=>onUnReDoClick(item.label)}/>)
    }
  </>
}