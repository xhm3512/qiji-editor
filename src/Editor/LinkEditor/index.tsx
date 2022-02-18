import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd';
import {
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils
} from 'draft-js';
import { LinkButton } from '../components/StyleButton'
export default ({ editorState, onChange ,focusEditor}: {editorState:any,onChange:any,focusEditor:any}) => {
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState('')
  const showModalClick = () => {
    setShowModal(true)
  }
    /**
     * 文字增加链接
     * @param link 
     */
     const addTextLink = (link: any) => {
      onChange(link)
      setTimeout(() => {
          focusEditor()
      }, 10)
  }
  const addLink = () => {
    handleCancel()
    // 获取contentState
    const contentState = editorState.getCurrentContent();
    // 在contentState上新建entity
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      // 'MUTABLE',
      // 'IMMUTABLE',
      'SEGMENTED',
      { url }
    );
    // 获取到刚才新建的entity
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // 把带有entity的contentState设置到editorState上
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const ff = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )
    addTextLink(ff)
  }
  const handleCancel = () => {
    setShowModal(false)
  }
  /**
     * 链接改变
     *
     * @param {Object} event 事件
     */
  const urlChange = (event: any) => {
    const target = event.target;
    setUrl(target.value)
  }
  return <>
    <LinkButton className='addlink' showModalClick={showModalClick}></LinkButton>
    <Modal title='Title'
      visible={showModal}
      onOk={addLink}
      onCancel={handleCancel}
    >
      <Input value={url} onChange={urlChange}></Input>
    </Modal>
  </>
}
