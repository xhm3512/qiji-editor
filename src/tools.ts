import { Editor, EditorState, RichUtils, ContentState, convertToRaw, Modifier, AtomicBlockUtils } from 'draft-js';
// 获取鼠标在页面的位置
export const getMouseLOcal = (_e: any) => {
  const e = _e || window.event;
  return {
    x: e.clientX,
    y: e.clientY,
  };
};

// 兼容性处理
export function selectDetail() {
  if (window.getSelection) {
    // 一般浏览器
    return window.getSelection();
  }
  const dd: any = document;
  if (dd.selection) {
    // IE浏览器、Opera
    return dd.selection.createRange();
  }
  return null;
}
// 修改选中文案
export function insertCharacter(characterToInsert: string, editorState: any) {
  const currentContent = editorState.getCurrentContent(),
    currentSelection = editorState.getSelection();

  const newContent = Modifier.replaceText(
    currentContent,
    currentSelection,
    characterToInsert,
  );

  const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');

  return newEditorState;
}
export function initTextState() {
  return `
  从暴怒的李成

仁身上散发出一股让我都不可小视的气息。

而我当即也不甘示弱，几乎和李成仁是同一时间开启了阳神面具，我的右眼也随之睁开。

从暴怒的李成

仁身上散发出一股让我都不可小视的气息。

而我当即也不甘示弱，几乎和李成仁是同一时间开启了阳神面具，我的右眼也随之睁开。

`
}