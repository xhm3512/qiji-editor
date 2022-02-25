import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { RichUtils } from 'draft-js';
import { StyleButton } from '../../components/StyleButton'
import BLOCK_TYPES from './types'
import './index.less'
export default (props: any) => {
    const { editorState ,onChange} = props;
    const onToggle = (blockType:string) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }
    return (
        <span className='RichEditor-controls'>
            {BLOCK_TYPES.map(type =>
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            )}
        </span>
    );
}
