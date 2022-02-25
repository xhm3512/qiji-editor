import React, { useEffect, useState, useRef } from 'react';
import { Row, Col } from 'antd'
import { insertCharacter, getMouseLOcal, selectDetail } from '../../tools'
import './index.less'
export default ({ oprateModalLocal, setEditorState, editorState, blurEditor }: { oprateModalLocal: any, setEditorState: any, editorState: any, blurEditor: any }) => {
  const [boxOpacity, setopacity] = useState(0);
  const ff: any = selectDetail()
  const txt = ff.toString()
  useEffect(() => {
    if (txt) {
      setopacity(1)
    } else {
      setopacity(0)
    }
  }, [txt])
  const onMouseDown = (e: any) => {
    e.preventDefault()
    if (!txt) return;
    const newEditorState = insertCharacter(`${txt}💖`, editorState);
    setEditorState(newEditorState)
    setTimeout(() => {
      blurEditor()
    })
  }
  return <Row
    className='oprate-modal-box'
    style={{
      position: 'absolute',
      top: oprateModalLocal.top,
      left: oprateModalLocal.left,
      opacity: boxOpacity,
      zIndex: boxOpacity === 0 ? -1 : 9999,

    }} >
    <Col className='item' onMouseDown={onMouseDown}>
      改
    </Col>
    <Col className='item'>
      读
    </Col>
    <Col className='item'>
      查
    </Col>
  </Row>
}