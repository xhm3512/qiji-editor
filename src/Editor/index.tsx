import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw, AtomicBlockUtils } from 'draft-js';
import { Row, Col } from 'antd'
import InlineStyle from './InlineStyle'  //行内样式
import LinkEditor from './LinkEditor' //链接
import AddImage from './AddImage' //链接
import ExportContent from './ExportContent' //导出
import ForwardBack from './ForwardBack' //前进后退
import BlockStyle from './BlockStyle'
import ListStyle from './ListStyle'
import { rawContent, myBlockRenderer } from './ToolRender'
import exportHtml from './exportHtml' //导出html处理
import 'draft-js/dist/Draft.css';
import './index.less'
import styleMap from './styleMap'
export default () => {
    const editor = useRef<any>()
    const editorRender = useRef<any>()
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('从暴怒的李成仁身上散发出一股让')))
    const blocks = convertFromRaw(rawContent);
    // const [editorState, setEditorState] = useState(EditorState.createWithContent(blocks))
    useEffect(() => {
        // focusEditor()
        onChange(editorState)
    }, [])
    const focusEditor = () => {
        if (editor) {
            editor.current.focus()
        }
    }
    const blurEditor = () => {
        if (editor) {
            editor.current.blur()
        }
    }
    /**
     * 监听变化
     * @param editorState 
     */
    const onChange = (newState: any, style?: any) => {
        console.log(1000, newState.toJS());
        console.log(2000, newState.getCurrentContent().toJS());
        console.log(3000, convertToRaw(newState.getCurrentContent()));

        const html = exportHtml(newState)
        editorRender.current.innerHTML = html
        // const oldText = editorState.getCurrentContent().getPlainText()
        // const newText = newState.getCurrentContent().getPlainText()
        setEditorState(newState)
    }
    /**
        * 行泪样式
        * @param style 样式名
        */
    const toggleInlineStyle = (style: string) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                style
            )
        );
    }
    /**
     * 块样式
     * @param blockType 
     */
    const toggleBlockType = (blockType: string) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }
    /**
     * 文字增加链接
     * @param link 
     */
    const addTextLink = (link: any) => {
        onChange(link)
        // setTimeout(() => {
        //     focusEditor()
        // },600)
    }
    /**
     * 图片上传
     * @param src 
     */
    const addImage = (src: string) => {
        console.log(111, src);
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
    /**
     * 定义快捷键
     * @param command 
     * @param ww 
     * @returns 
     */
    const handleKeyCommand = (command: any, ww: any) => {
        const newState = RichUtils.handleKeyCommand(ww, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    // 撤销
    const handleUndo = () => {
        console.log(editorState.getAllowUndo());
        setEditorState(EditorState.undo(editorState))

    }
    // 前进
    const handleRedo = () => {
        setEditorState(EditorState.redo(editorState))
    }
    const onUnReDoClick = (type: string) => {
        console.log(111, type);

        switch (type) {
            case 'fowrad':
                handleUndo();
                return false;
            case 'back':
                handleRedo()
                return false;
        }
    }
    const DivisionLine = () => {
        return <span className='divisionLine'></span>
    }
    return (
        <div className='editor-box'>
            <div className='oprate-wrap'>
                <InlineStyle
                    onToggle={toggleInlineStyle}
                />
                <BlockStyle
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <DivisionLine />
                <ListStyle
                    editorState={editorState}
                    onToggle={toggleBlockType}
                />
                <DivisionLine />
                <AddImage
                    editorState={editorState}
                    addImage={addImage}
                />
                <DivisionLine />
                <LinkEditor
                    editorState={editorState}
                    onToggle={addTextLink}
                />
                <DivisionLine />

                <ForwardBack onUnReDoClick={onUnReDoClick} />
                <DivisionLine />
                <ExportContent
                    editorState={editorState}
                />
            </div>

            <Row className='wrap'>
                <Col className='item-edit' span={12}>
                    <div className='editor' onClick={focusEditor}>
                        <Editor
                            ref={editor}
                            blockStyleFn={(block: any) => myBlockRenderer(block, {})}
                            blockRendererFn={(block: any) => myBlockRenderer(block, {})}
                            placeholder={'Write what you would say.'}
                            editorState={editorState}
                            onChange={onChange}
                            customStyleMap={styleMap}
                            handleKeyCommand={handleKeyCommand}
                        />
                    </div>
                </Col>
                <Col className='item-pre' span={12}>
                    <div ref={editorRender}>1</div>
                </Col>
            </Row>
        </div >
    )
}

