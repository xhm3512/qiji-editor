import React from 'react';
import {  EditorState} from 'draft-js';
import { BtnIconClick } from '../../components/StyleButton'
export default ({ editorState ,setEditorState}: {editorState:any,setEditorState:any}) => {
  const list = [
    { label: 'fowrad' },
    { label: 'back' },
  ]
      // ζ€ι
      const handleUndo = () => {
        setEditorState(EditorState.undo(editorState))

    }
    // εθΏ
    const handleRedo = () => {
        setEditorState(EditorState.redo(editorState))
    }
    const onUnReDoClick = (type: string) => {
        switch (type) {
            case 'fowrad':
                handleUndo();
                return false;
            case 'back':
                handleRedo()
                return false;
        }
    }
  return <>
    {
      list.map((item) => <BtnIconClick key={item.label} type={item.label} onClick={ ()=>onUnReDoClick(item.label)}/>)
    }
  </>
}