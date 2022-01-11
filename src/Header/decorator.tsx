import React from 'react';
import {CompositeDecorator } from 'draft-js';
export default () => {
  const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link
    }
  ]);
  return decorator;
}
function findLinkEntities(contentBlock: any, callback: any, contentState: any) {
  contentBlock.findEntityRanges(
    (character: any) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    function () {
      // eslint-disable-next-line prefer-rest-params
      console.log(arguments);
      // eslint-disable-next-line prefer-rest-params
      callback(...arguments);
    }

  );
}
const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return ( <a href={url}>
      {props.children}
    </a>
  );
};

