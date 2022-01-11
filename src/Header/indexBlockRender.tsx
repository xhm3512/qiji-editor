/**
 * @file 自定义渲染
 * @author Marx
 */

 import React, {Component,useState} from 'react';
 import {Editor, EditorState, convertFromRaw} from 'draft-js';
 

 
export default () => {
  const rawContent:any = {
    blocks: [
        {
            text: '这里是文本内容，下面是一张图片',
            type: 'unstyled'
        },
        {
            text: '![图片](https://avatars2.githubusercontent.com/u/9550456?v=4&s=460)',
            type: 'unstyled'
        }
      
    ],
    entityMap: {}
  }
  const blocks = convertFromRaw(rawContent);
  const [editorState,setState]=useState(EditorState.createWithContent(blocks))
  const onChange = (editorState:any) => {
    setState(editorState)
    }
         return (
             <div className='basic'>
                 自定义渲染
                 <div className='editor'>
                     <Editor
                         blockRendererFn={myBlockRenderer}
                         editorState={editorState}
                         onChange={onChange}/>
                 </div>
             </div>
         )
 }
 
 
 const ImgComponent = (props:any) => {
    console.log(props);
    return (
        <div>
            <img
                style={{height: '300px', width: 'auto'}}
                src={props.blockProps.src}
                alt='图片'/>
        </div>
    )
}
 function myBlockRenderer(contentBlock:any) {
 
     // 这里我们假定这段内容就是图片的地址
     const text = contentBlock.getText();
 
     // 这里我们判断contentBlock是不是picture，如果是的话，就返回对应的渲染信息
     const matches = text.match(/\!\[(.*)\]\((http.*)\)/);
     if (matches) {
         return {
             component: ImgComponent,  // 指定组件
             editable: false,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
             // 这里的props在自定义的组件中需要用this.props.blockProps来访问
             props: {
                 src: matches[2]
             }
         };
     }
 }
 