import React, { Component } from 'react';
import { render } from 'react-dom';
// import './style.css';
import { MentionsInput, Mention } from '../mention';

class App extends Component {
  constructor() {
    super();
    this.state = {
      caretPos: 0,
      value: '',
      mentions: null,
      users: [
        {
          _id: 1000,
          name: { first: 'John', last: 'Reynolds' },
        },
        {
          _id: 10001,
          name: { first: 'Holly', last: 'Reynolds' },
        },
        {
          _id: 100002,
          name: { first: 'Ryan', last: 'Williams' },
        },
      ],
    };

    this.expInputRef = React.createRef()
  }

  handleChange = (event, newValue, newPlainTextValue, mentions) => {
    this.setState({
      value: newValue,
      mentions,
    });
  };

  handleBlur = event => {
    event.persist()
    this.setState({ caretPos: event?.target?.selectionStart || 0 })
  }

  // 判断光标是否在复合指标之间，以及光标之前复合指标的个数
  getCursorInfo = (caretPos = 0, mentions = []) => {
    // 光标之前，复合指标，markup 比 displayTransform 多的字节数
    let byteNum = 0
    // 光标之前，复合指标个数
    let num = 0
    // 光标是否在复合指标之间
    let isMiddle = false

    mentions.some(({ plainTextIndex, display, id }) => {
      if (plainTextIndex < caretPos) {
        const strEndIndex = plainTextIndex + display.length
        if (strEndIndex < caretPos) {
          byteNum += String(id).length + 6
          num++
        }
        if (strEndIndex === caretPos) {
          byteNum += String(id).length + 6
          num++
          return true
        }
        if (strEndIndex > caretPos) {
          isMiddle = true
          return true
        }
      }
      if (plainTextIndex === caretPos) {
        return true
      }
    })

    return {
      byteNum,
      num,
      isMiddle,
    }
  }

  // `[${display}]`, id, `{{[${display}(${id})}}`)
  handleIndexSelect(display, id, str) {
    const { value = '', caretPos = 0, mentions = [] } = this.state
    const mentionObj = {
      display,
      id,
      index: caretPos,
      plainTextIndex: caretPos,
    }
    const plainTextCaretPos = caretPos + display.length

    if (!value?.trim() || !mentions?.length) {
      this.doInserIndex(str, value, caretPos, plainTextCaretPos)
      this.setState({
        mentions: [mentionObj],
      })
      return
    }

    const { byteNum, num, isMiddle } = this.getCursorInfo(caretPos, mentions)

    if (isMiddle) {
      alert('指标中间不能插入指标')
      return
    }
    const rawTextCaretPos = caretPos + byteNum
    mentionObj.index = rawTextCaretPos
    mentions.splice(num, 0, mentionObj)
    // 如果插入的指标，不是最后一个复合指标，需更新该指标之后的指标的 mention
    if (num + 1 < mentions.length) {
      for (let index = num + 1; index < mentions.length; index++) {
        const mention = mentions[index]
        mention.plainTextIndex += display.length
        mention.index += str.length
      }
    }
    this.doInserIndex(str, value, rawTextCaretPos, plainTextCaretPos)
    this.setState({
      mentions,
    })
  }

  doInserIndex = (str, value, rawTextCaretPos, plainTextCaretPos) => {
    this._expFocus()
    const newValue = this._insertStr(str, value, rawTextCaretPos)
    this.setState({
      value: newValue,
    })
    if (!this.expInputRef.current) {
      return
    }
    const $node = this.expInputRef.current
    this._setCaretPos($node, plainTextCaretPos)
  }

  _insertStr(source = '', target = '', pos) {
    const startPart = target.substring(0, pos)
    const endPart = target.substring(pos)
    return `${startPart}${source}${endPart}`
  }

  _setCaretPos($input, pos) {
    if (!$input) {
      return
    }
    setTimeout(() => {
      if ($input.createTextRange) {
        const range = $input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', pos)
        range.moveStart('character', pos)
        range.select()
      } else if ($input.setSelectionRange) {
        $input.setSelectionRange(pos, pos)
      }
    }, 200)
  }

  _expFocus() {
    if (!this.expInputRef.current) {
      return
    }
    setTimeout(() => {
      const node = this.expInputRef.current
      node.focus()
    }, 200)
  }

  render() {
    const userMentionData = this.state.users.map((myUser) => ({
      id: myUser._id,
      display: `${myUser.name.first} ${myUser.name.last}`,
    }));

    return (
      <div>
        <MentionsInput
          className='mentions'
          placeholder={'Type anything, use the @ symbol to tag other users.'}
          value={this.state.value}
          markup='{{[__display__](__id__)}}'
          contentEditable
          allowSpaceInQuery
          displayTransform={(id, display) => `[${display}]`}
          inputRef={event => this.expInputRef.current = event}
          onChange={this.handleChange}
          // onBlur={this.handleBlur}
        >
          <Mention
                  contentEditable
            type='index'
            trigger={/(?:^|.)(@([^.@]*))$/}
            data={userMentionData}
            className='mentions__mention'
          />
          <Mention
                  contentEditable
            type='index'
            trigger={/(?:^|.)(“([^.“]*))$/}
            data={userMentionData}
            className='mentions__mention'
          />
        </MentionsInput>
      </div>
    )
  }
}
export default App;
