import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.less'
/**
 * styleMap用来定义渲染规则 
 * key值是样式的名称, 在RichUtils.toggleInlineStyle(EditorState, key)中使用
 * value是渲染的css规则, 其中用驼峰格式来标识样式属性
 **/
const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'COLOR_RED': {
    backgroundColor: 'red'
  },
  'COLOR_BLUE': {
    backgroundColor: '#597aae'
  },
  'COLOR_ORANGE': {
    color: '#f93'
  },
  'COLOR_GREEN': {
    color: '#3a6'
  }
};

const DraftEditor = () => {
  const editor = useRef<any>()
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(`从暴怒的李成


  仁身上散发出一股让我都不可小视的气息。
  
  
  而我当即也不甘示弱，几乎和李成仁是同一时间开启了阳神面具，我的右眼也随之睁开。
  
  
  “令神骨！”
  
  
  李成仁很识货，而我却没有说话，只是安静的用右眼看着出现在他身后出现的巨大神影。
  
  
  三头八臂神影，即便我是一个傻子我也能知道他的神力是来自于哪一位大神。
  
  
  混天绫，火尖枪，风火轮，乾坤圈，震天箭，九龙神火罩作为护身法器。
  
  
  相对比之下，他本人的事迹可谓是家喻户晓，无人不知。
  
  
  李哪吒！
  
  
  “区区九天杀童大将以及王灵官就敢跟我叫板！今天我就拆你的骨，抽你的筋！”
  
  
  “看看你有多大的本事！”
  
  
  按照神力来说，我的九天杀童大将和王灵官加在一起确实没有哪吒的厉害，可我有逆生三重加身。
  
  
  一时间我和李成仁的气息不相上下，屋内平地起风，周围的人都不敢靠近我们两个。
  
  
  “哎？李老板？恭喜呀，这新店开张，我来的还不算晚吧。”
  
  
  秦启荣。
  
  
  秦启荣带着秦少龙和秦少虎两人视李成仁如无物一般走进了店里，直接站在我的面前。
  
  
  秦启荣有多厉害不了解，但他从李成仁身边经过的时候，我发现李成仁身上散发出来的神力竟然靠近不了秦启荣的周身，这是要有多大的修为才能办到。
  
  
  见状，我收了神力，只是对秦启荣微微一笑。
  
  
  秦启荣一扭头，看向李成仁：“怎么了？李老板又得罪你了？李成仁，你怎么处处和李老板过不去。”
  
  
  “秦老，这是我们自家的事情，和你没有什么关系吧。”
  
  
  秦启荣也不生气，说道：“确实没有关系，但是我今天来，是为了恭贺李老板的新店开张，你也是来恭喜的吗？可我看你这架势，好像是要来拆店呀！”
  
  
  李成仁眉头紧锁，其实对于秦启荣，哪怕他是秦家家主，他也没有怕过什么。
  
  
  这是李家的地盘，第一次之所以没有继续发作，是因为来这皆客。
  
  
  可眼看着秦启荣接二连三想要管自己的事情，他这就有些不愉快了。
  
  
  “秦老，这里是长安城。”
  
  
  李成仁盯着我。
  
  
  他很清楚，只要有秦启荣在，他想要对我做什么，那是不可能的。
  
  
  “我自然知道这里是长安城，但这也是李老板李三生的店面，我和他是朋友，我来看看我朋友的新店不行吗？”
  
  
  秦家家主在公共场合表示是我的朋友，这事情要放在别人身上恐怕死了都会笑醒。
  
  
  可这对于我不一样，虽然我在各种场合都表明自己和李家没有任何关系，可这都只是我的一面之词。
  
  
  而五大家族之间的关系十分复杂，秦启荣这个老家伙之前就给我下过暗套。
  
  
  谁知道他这一次又安了什么样的心思。
  
  
  这里可是长安城，是李家的地盘，我一旦接受了秦启荣的好意，那么后面李家会做什么，这个李成仁又会做什么，我们谁也说不清楚。
  
  
  我本不想卷进五大家族的事情当成，可现在我似乎成了他们之间的一个矛盾点。
  
  
  “秦老说笑了，我李三生何德何能能成为秦家家主的朋友，而且咱们还差着辈分，我不敢担。”我停顿片刻接着说道：“我这店也还没开张，就是今天先搬过来。”
  
  
  “李三生，你知道你在说什么吗？”
  
  
  在场的各位除了李成仁这个冲头冲脑的家伙外都不是傻子，秦少龙立刻反应过来。
  
  
  我点点头：“当然知道，我只是一个很普通的开白事馆的老板，高攀不起各位。”
  
  
  “你别给脸不要脸。”
  
  
  秦少虎怒视着我，那样子就好像在说，如果我不接受他们秦家的好意，日后就没有好果子吃。
  
  
  整个店里的气氛变得十分微妙，我也没有先说话，只是安静的看着所有人。
  
  
  就在这个时候，从门外走进来一个满身酒气，全身上下邋里邋遢，那头发上的油我都觉得可以用来炒菜的中年男子，穿着夹克，带着墨镜晃晃悠悠的就走了进来。
  
  
  “哟哟岂可闹，煎饼果子来一套！”
  
  
  这怕不是哪个醉鬼喝大了，神经病一样的跑进来了？
  
  
  不过很快李成仁对此人的态度让我大吃一惊。
  
  
  来人见自己唱了一句没人搭理他之后，他摘下墨镜，目光定格在李成仁的身上。
  
  
  “花花，这里不是开派对吗？大家嗨起来。”
  
  
  “师父……”
  
  
  “怎么滴？不是开派对？我是说，这洪武大厦也不会开派对，我以为家里的那些个老家伙转了性，既然不是，那你们这么多人在这里干什么，装修房子？”
  
  
  这人竟然是李成仁的师父？可我怎么看，这家伙都是那么的不着调？
  
  
  “哟，这不是所谓的秦家四杰嘛，怎么？就来了两个？”
  
  
  秦少龙和秦少虎两人见到这个邋里邋遢的人后，竟然没有说话。
  
  
  此人又将目光转移到了秦启荣的身上，他走到秦启荣的面前，仔细打量了起来：“真他妈的牛逼，跟我们家那老不死的一样，你说你们活这么大年纪了，怎么就还不死，不死也就算了，安享晚年不行吗？非要跑出来瞎掺和，真他娘的要命。”
  
  
  “李空诚，哈哈！原来是你，你个老小子好是那么喜欢口无遮拦，爱喝酒，你喝多了吧。”
  
  
  表面上秦启荣确实在笑，可有那么一瞬间，我感受到了他有一点不一样的情感，是杀意。
  
  
  只是这杀意来的快去的也快，看上去秦启荣和这李空诚之间也有一段故事。
  
  
  李空诚也不在乎，他走到我面前，伸出手拍在我的肩膀上：“你就是国胜的儿子，李三生？”
  
  
  “是。”
  
  
  李空诚点点头，随后看向李成仁：“家里那老头找你，你最好赶紧去见他，同时给自己的屁股上垫厚一点的垫子。”
  
  
  “啊？”别看着李成仁在我面前张牙舞爪，可自从李空诚来了之后，他就跟个孩子一样。
  
  
  “啊什么，赶紧去！”
  
  
  李成仁很不甘心的看了我一眼后才带着人离开。
  
  
  “怎么滴？秦启荣，还要我亲自送你们走？李三生的话，刚刚你们没听清楚？这里他妈的还没开业呢。”
  
  
  秦启荣点点头，对我笑嘻嘻的说道：“李老板，记得开业的时候一定要通知我们，不管你怎么想，我们可是很好的朋友，当然，你也别忘记你我之间的约定喽。”
  
  
  该死的秦启荣，这不明摆着要借着李空诚的嘴，告诉李家高层说我和秦家有关系吗？
  
  
  李空诚又看了一眼李承天：“李承天，这里也没你什么事情了，回去吧。”
  
  
  “诚哥，这……”
  
  
  “回去吧，家里老不死的说了，李三生是我李家人，他有权利用李家的钱，做任何事情。”
  
  
  李承天原本还想继续说些什么，可当他看见李空诚的眼神只能选择闭嘴，临走的时候深深看了我一眼。
  
  
  李承天走后，李空诚又将目光聚集到大黑的身上：“这位帅哥，你也出去待一会，我和你主子有些事情要谈。”
  
  
  大黑看向我，我对着他点点头，大黑出去的时候还不忘帮我们关上了门。
  
  
  原本热闹的屋子里一下子冷清许多，李空诚做到沙发上，翘着二郎腿，如同变戏法一般从口袋里拿出香烟点上：“我那傻徒弟没给你添麻烦吧。”
  
  
  “添麻烦了。”
  
  
  对于我的回答，李空诚很是诧异：“你这是一点面子也不给我呀，要不是我来，你可能会死在我徒弟的手上。”
  
  
  “我没让你来帮忙。”
  
  
  “死鸭子嘴硬，你这又硬又臭的脾气和你那死鬼老爹一模一样，不过我喜欢。”
  
  
  我怪异的看着李空诚，一时间也不知道他的出现意味着什么。
  
  
  “你不用这么看着我。”
  
  
  我眼珠一转：“我想知道你刚刚说的话是不是真的，李家真的就同意我在洪武大厦对面开了自己的分店？”
  
  
  “那有什么不同意的，李家在长安城，可这长安城不是李家的，你这生意合理合法，李家也不能说什么。”
  
  
  停顿片刻后，李空诚继续说道：“不过李家虽然不能阻拦你开店，可有的是办法让你的生意做不下去。”
  
  
  “李空诚是吧？”
  
  
  “是。”
  
  
  我点上香烟，深深吸了一口：“你这是在威胁我吗？”
  
  
  “我从来不威胁人，也没有人有让我威胁的那个实力。”
  
  
  好家伙，比我还牛逼轰轰的。
  
  
  “你什么意思。”
  
  
  “意思很简单，开店没问题，只要你听话，我保你生源不断，财源滚滚。”
  
  
  李空诚这话说的有意思：“说来听听。”
  
  
  “李家在长安城经营多少年，这一点不用我说，你想要在这里扎根开店没问题，每年给我们李家三个免费的名额。”
  
  
  “三个免费的名额？什么玩意。”
  
  
  “就是每年帮李家免费做三件事情，就说三桩生意，你不能收钱。”
  
  
  “就这么简单？”
  
  
  “就这么简单。”
  
  
  我深叹口气，还以为是什么大事。
  
  
  见我答应，李空诚竟然还拿出合同：“没问题，就签个字。”`)))
  const onChange = (editorState: any) => {
    console.log(3456, editorState);

    setEditorState(editorState)
  }
  const defaultInlineStyle = [
    { el: <span className='color-show' style={{ fontWeight: 'bold' }}>B</span>, style: 'BOLD' },
    { el: <span className='color-show' style={{ fontStyle: 'italic' }}>I</span>, style: 'ITALIC' },
    { el: <span className='color-show' style={{ textDecoration: 'underline' }}>U</span>, style: 'UNDERLINE' },
    { el: <span><div className='color-show' style={{ backgroundColor: '#e24' }}>12</div></span>, style: 'COLOR_RED' },
    { el: <span><div className='color-show' style={{ backgroundColor: '#39f' }}>34</div></span>, style: 'COLOR_BLUE' },
    { el: <span><div className='color-show' style={{ backgroundColor: '#f93' }}>56</div></span>, style: 'COLOR_ORANGE' },
    { el: <span><div className='color-show' style={{ backgroundColor: '#3a6' }}>78</div></span>, style: 'COLOR_GREEN' }
  ];


  const toggleInlineStyle = (style: string) => {
    const state = RichUtils.toggleInlineStyle(editorState, style);
    onChange(state);
  }
  // 定义快捷键
  const handleKeyCommand = (command: any, ww: any) => {
    const newState = RichUtils.handleKeyCommand(ww, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const focusEditor = () => {
    if (editor) {
      editor.current.focus()
    }

  }
  useEffect(() => {
    focusEditor() 
  }, [])
  const getBlockStyle = (block: any) => {
    console.log(99,block.getType());
    
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return '';
    }
}
  return (
    <div>
      <div className='editor-btn-group'>
        {defaultInlineStyle.map(item =>
          <span key={item.style} onClick={() => toggleInlineStyle(item.style)}>
            {item.el}
          </span>)}
      </div>
      <div className='editor' onClick={focusEditor}>
        <Editor
          ref={editor}
          blockStyleFn={getBlockStyle}
          placeholder={'Write what you would say.'}
          editorState={editorState}
          onChange={onChange}
          customStyleMap={styleMap}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div >
  )
}

export default DraftEditor;