import React, { useEffect, useState, useRef } from 'react';
import { Upload, message, Button } from 'antd';
import { EditorState,AtomicBlockUtils } from 'draft-js';
import { BtnIcon } from '../../components/StyleButton'
export default ({  editorState,setEditorState,blurEditor}: {editorState:any,setEditorState:any,blurEditor:any}) => {

  // 获得图片
  const getImgFile = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const image: any = new Image();
        image.src = reader.result;
        resolve(image)
      }
    })
  }
 /**
     * 图片上传
     * @param src 
     */
  const addImage = (src: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        { src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
    );
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    setTimeout(() => {
        blurEditor()
    }, 0)
}
  const beforeUpload = async (file: any) => {
    const imgSize: any = await getImgFile(file)
      .then((image: any) => {
        addImage(image.src)
      })

    // reader.readAsDataURL(file);
  }
  return <span className='RichEditor-controls'>
    <Upload
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <BtnIcon type='upImage' />
    </Upload>
  </span>

}
