import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { BtnIcon } from '../components/StyleButton'
import BLOCK_TYPES from './types'
import './index.less'
export default (props: any) => {

    const { editorState ,onToggle} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
        const onBtnToggle = (e: any,style:string) => {
            e.preventDefault();
            onToggle(style)
          }
    const menu = (
        <Menu>
            {BLOCK_TYPES.map((type) =>
                <Menu.Item key={type.label}  >
                    <span onClick={(e)=>onBtnToggle(e,type.style)}>
                    {type.label}
                    </span>
                    {/* <StyleButton

                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    /> */}
                </Menu.Item>
            )}
        </Menu>
    )
    return (
        <span className='RichEditor-controls'>
            <Dropdown overlay={menu} placement='bottomLeft' arrow>
            <span><BtnIcon type='H' /></span>
            </Dropdown>
        </span>
    );
}
