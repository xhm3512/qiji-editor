import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import { Row, Col } from 'antd'
import InlineStyle from './InlineStyle'  //行内样式
import LinkEditor from './LinkEditor' //链接
import AddImage from './AddImage' //链接
import ExportContent from './ExportContent' //导出
import ForwardBack from './ForwardBack' //前进后退
import BlockStyle from './BlockStyle'
import ListStyle from './ListStyle'
import FontColorControl from './FontColorControl'
import { myBlockRenderer } from '../components/ToolRender'
import exportHtml from '../components/exportHtml' //导出html处理
import { getMouseLOcal, initTextState } from '../tools'
import OprateModal from '../components/OprateModal'
import 'draft-js/dist/Draft.css';
import './index.less'
import styleMap from './styleMap'
export default () => {
    const editor = useRef<any>()
    const editorRender = useRef<any>()
    const [oprateModalLocal, setOprateModalLocal] = useState({ top: '0', left: '0' })
    // const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const id = 1222
    const savedData = localStorage.getItem(`editorContent-${id}`) || ''
    const saveEditorState: any = savedData && convertFromRaw(JSON.parse(savedData).data)
    // const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText( initTextState())))
    const [editorState, setEditorState] = useState(EditorState.createWithContent(saveEditorState ? saveEditorState : ContentState.createFromText(initTextState())))
    const modalAlertTip = () => {
        const savedData = localStorage.getItem(`editorContent-${id}`) || ''
        if (!savedData) {
            window.onbeforeunload = null;
            return false;
        }
        const saveEditorState: any = savedData && convertFromRaw(JSON.parse(savedData).data)
        const oldText = saveEditorState.getPlainText()
        const newText = editorState.getCurrentContent().getPlainText()
        if (newText === oldText) {
            window.onbeforeunload = null
        } else {
            window.onbeforeunload = function (event) {
                event.returnValue = '我在这写点东西...';
            };
        }
    }
    useEffect(() => {
        // focusEditor()
        onChange(editorState)
        modalAlertTip()
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
    const onChange = (newState: any) => {
        const html = exportHtml(newState)
        editorRender.current.innerHTML = html
        // const oldText = editorState.getCurrentContent().getPlainText()
        // const newText = newState.getCurrentContent().getPlainText()
        setEditorState(newState)
        modalAlertTip()
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

    // 分割线
    const DivisionLine = () => {
        return <span className='divisionLine'></span>
    }
    // 获得选中文本位置
    const getDomSelectLOcal = (e: any) => {

        try {
            const { x, y } = getMouseLOcal(e);
            setOprateModalLocal({
                top: `${y}px`,
                left: `${x}px`
            })
        } catch (error) {
            console.log('设置位置异常', error);
        }
    }
    const onSubmitClick = () => {

        const tempStateContent = JSON.stringify({
            id,
            data: convertToRaw(editorState.getCurrentContent())
        })
        localStorage.setItem(
            `editorContent-${id}`, tempStateContent
        )
        modalAlertTip()
    }
    return (
        <div className='editor-box'>
            <div className='oprate-wrap'>
                {/* 行内样式 */}
                <InlineStyle
                    editorState={editorState}
                    onChange={onChange}
                />
                {/* 块内样式 */}
                <BlockStyle
                    editorState={editorState}
                    onChange={onChange}
                />
                <FontColorControl
                    editorState={editorState}
                    onChange={onChange}
                />
                <DivisionLine />
                {/* 列表等 */}
                <ListStyle
                    editorState={editorState}
                    onChange={onChange}
                />
                <DivisionLine />
                {/* 上传图片 */}
                <AddImage
                    editorState={editorState}
                    setEditorState={setEditorState}
                    blurEditor={blurEditor}
                />
                <DivisionLine />
                {/* 添加链接 */}
                <LinkEditor
                    editorState={editorState}
                    onChange={onChange}
                    focusEditor={focusEditor}
                />
                <DivisionLine />
                {/* 前进后退 */}
                <ForwardBack
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
                <DivisionLine />
                {/* 导出 */}
                <ExportContent
                    editorState={editorState}
                />
                <button
                    onClick={onSubmitClick}
                >提交</button>
            </div>
            {/* 操作弹窗 */}
            <OprateModal
                setEditorState={setEditorState}
                editorState={editorState}
                oprateModalLocal={oprateModalLocal}
                blurEditor={blurEditor}
            />
            <Row className='wrap'>
                <Col className='item-edit' span={12}>
                    <div
                        className='editor'
                        onClick={focusEditor}
                        onMouseUp={e => getDomSelectLOcal(e)}
                    >
                        <Editor
                            ref={editor}
                            editorKey={'editor'}
                            blockStyleFn={(block: any) => myBlockRenderer(block, {})}
                            blockRendererFn={(block: any) => myBlockRenderer(block, {})}
                            placeholder={'Write what you would say.'}
                            editorState={editorState}
                            onChange={onChange}
                            customStyleMap={styleMap}
                            // handleKeyCommand={handleKeyCommand}
                            textAlignment='left'
                            // autoCorrect='true'
                            spellCheck={true}

                        />
                    </div>
                    {/* <div className='sign-box'>
                        <div className='sign-item' style={{width:'10px',left:'10px'}}></div>
                    </div> */}
                </Col>
                <Col className='item-pre' span={12}>
                    <div ref={editorRender}></div>
                </Col>
            </Row>
        </div >
    )
}


