import React from 'react';
import { Button } from 'antd'
const className = 'RichEditor-styleButton';
export const StyleButton = ({ label, onToggle, style }: any) => {

  const onBtnToggle = (e: any) => {
    e.preventDefault();
    onToggle(style)
  }
  return <Button className={className} onMouseDown={onBtnToggle}>
    {label}
  </Button>
}

export const LinkButton = (props: any) => {
  return <Button className='addlink' onClick={props.showModalClick}>超链接</Button>
};

export const StyleItemButton = ({ label}: any) => {
  return <Button  className={className}>
    {label}
  </Button>
}