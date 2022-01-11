import React from 'react';
import './index.less'
const rawContent: any = {
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

const ImgComponent = (props: any) => {
  return (
    <div>
      <img
        // style={{ height: '300px', width: 'auto' }}
        src={props.blockProps.src}
        alt='图片' />
    </div>
  )
}
const Image = (props: any) => {
  if (!!props.src) {
    return (
      <div>
        <img src={props.src} alt='' className='img-media' />
        <div className='close-icon' onClick={props.handleDelete}>
          {/* <img src={close_icon} /> */}
        </div>
      </div>
    );
  }
  return null;
};

/**
 * 图片上传展示
 * @param props 
 * @returns 
 */
const Media = (props: any) => {
  if (!props.block.getEntityAt(0)) return null;
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === 'image') {
    const key = props.block.getKey();
    media = <div className='upload-box'>
      <Image
        src={src}
        blockKey={key}
        handleDelete={() => {
          props.blockProps.deleteImage(props.block);
        }}
      />
    </div>;
  }

  return media;
};
function myBlockRenderer(block: any, { deleteImage }: any) {

  // 这里我们假定这段内容就是图片的地址
  const text = block.getText();
  const type = block.getType();
  // 这里我们判断contentBlock是不是picture，如果是的话，就返回对应的渲染信息
  const matches = text.match(/\!\[(.*)\]\((http.*)\)/);
  if (matches) {
    const fff: any = {
      component: ImgComponent,  // 指定组件
      editable: false,  // 这里设置自定义的组件可不可以编辑，因为是图片，这里选择不可编辑
      // 这里的props在自定义的组件中需要用this.props.blockProps来访问
      props: {
        src: matches[2]
      }
    };
    return fff
  } else if (type === 'blockquote') {
    return 'RichEditor-blockquote'
  } else if (type === 'atomic') {
    const fff: any = {
      component: Media,
      editable: false,
      props: {
        deleteImage
      },
    };
    return fff;
  } else {
    return ''
  }
}


export { rawContent, myBlockRenderer, ImgComponent }