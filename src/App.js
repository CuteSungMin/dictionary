import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './conponent/header';
import Main from './page/main';
import Write from './page/write';
import DicSearch from './conponent/dicsearch';
import {useCallback, useReducer, useRef, createContext, useMemo} from 'react';

export const DicStateContext = createContext(null);
export const DicContext = createContext(null);

const initState = {
  inputs : {
    word : '',
    content :'',
    category : ''
  },
  dics : [
    {
      id : 1,
      word : 'tag',
      content : 'html에 사용하는 약속된 용어들로 요소를 만들 때 사용',
      category : 'html',
      createDate : '2023-09-14'
    },
    {
      id : 2,
      word : 'style',
      content : '속성은 색상, 글꼴, 크기 등과 같은 요소에 스타일을 추가하는 데 사용됩니다.',
      category : 'css',
      createDate : '2023-09-14'
    },
    {
      id : 3,
      word : 'background-color',
      content : '요소의 배경색을 설정합니다',
      category : 'css',
      createDate : '2023-09-14'
    },
    {
      id : 4,
      word : 'getTime',
      content : 'getTime()1970년 1월 1일 00:00:00 이후의 밀리초 수를 반환합니다.',
      category : 'js',
      createDate : '2023-09-14'
    },
    {
      id : 5,
      word : 'React',
      content : 'jsx라는 html-in-javascript 구문을 사용합니다',
      category : 'react',
      createDate : '2023-09-14'
    },
    {
      id : 6,
      word : '반응형',
      content : '반응형 웹 디자인은 HTML과 CSS를 사용하여 웹 사이트의 크기를 자동으로 조정하고, 숨기고, 축소하거나 확대하여 모든 장치(데스크탑, 태블릿, 휴대폰)에서 보기 좋게 만드는 것입니다. html-in-javascript 구문을 사용합니다',
      category : 'html',
      createDate : '2023-09-14'
    },
    {
      id : 7,
      word : 'array',
      content : '배열은 하나 이상의 값을 보유할 수 있는 특수 변수입니다.',
      category : 'js',
      createDate : '2023-09-14'
    },
    {
      id : 8,
      word : 'new Date( )',
      content : '기본적으로 JavaScript는 브라우저의 시간대를 사용하고 날짜를 전체 텍스트 문자열로 표시합니다.',
      category : 'js',
      createDate : '2023-09-14'
    },
    {
      id : 9,
      word : 'switch',
      content : '명령문 switch은 다양한 조건에 따라 다양한 작업을 수행하는 데 사용됩니다.',
      category : 'js',
      createDate : '2023-09-14'
    },
    {
      id : 10,
      word : 'component',
      content : 'React 컴포넌트는 페이지에 렌더링할 React 엘리먼트를 반환하는 작고 재사용 가능한 코드 조각입니다. 가장 간단한 React 컴포넌트는 React 엘리먼트를 반환하는 일반 JavaScript 함수입니다.',
      category : 'react',
      createDate : '2023-09-14'
    },
    {
      id : 11,
      word : 'Element',
      content : 'React 엘리먼트(React Element)는 React 애플리캐이션을 구성하는 블록입니다. 엘리먼트는 “컴포넌트(Component)“라는 널리 알려진 개념과 혼동되기 쉽습니다. 엘리먼트는 화면에 보이는 것들을 기술하며, React 엘리먼트는 변경되지 않습니다.',
      category : 'react',
      createDate : '2023-09-14'
    },
    {
      id : 12,
      word : 'key',
      content : '“key”는 엘리먼트의 배열을 만들 때 포함해야 하는 특별한 문자열입니다. key는 React가 어떤 항목을 변경, 추가 혹은 삭제할지 식별하는 것을 돕습니다. 엘리먼트들을 안정적으로 식별할 수 있도록 배열 내의 엘리먼트에 key를 제공해야 합니다.',
      category : 'react',
      createDate : '2023-09-14'
    },
  ]
};

const reducer = (state, action)=>{
  switch(action.type){
    case "create" : 
      return {
        inputs : initState.inputs,
        dics : state.dics.concat(action.dic)
      };
    case "edit" : 
      return {
        ...state,
        dics : state.dics.map((item)=>item.id ===action.id ? {...item, content:action.content} : item)
      };
    case "remove" : 
      return {
        ...state,
        dics : state.dics.filter((item)=>item.id !== action.id)
      };
    // case "search" : 
    //   return {
    //     ...state,
    //     dics : state.dics.filter((item)=>item.word.toLowerCase().includes(action.keyName)
    //     || item.word.toLowerCase().includes(action.keyName))
    //   };
    default : 
    return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const {dics} = state;
  const {word, content, category} = state.inputs;
  const userId = useRef(5)
  const onCreate = useCallback ((word, content,category)=>{
    const createDate = new Date().toISOString().slice(0,10);//new Date().toLocaleDateString()
    dispatch({
      type : 'create',
      dic : {    
        word,    
        content, 
        category,
        createDate,
        id : userId.current
      },
    });
    userId.current += 1
  },[word, content, category]);

  const onEdit = (id,content)=>{
    dispatch({
      type : 'edit',
      id,content
    })
  }
  const onRemove = (id)=>{
    dispatch({
      type : 'remove',
      id,
    })
  }
  const onSearch = (id, content)=>{
    dispatch({
      type : 'search',
      id, content
    })
  }


  const memoizedDic = useMemo(()=>{
    return{ onCreate, onEdit, onRemove, onSearch}
  },[])
  return (
    <div className="App">
      <Header />
      <DicStateContext.Provider value={dics}>
        <DicContext.Provider value={memoizedDic}>
        <Routes>
          <Route path='/dictionary' element={<Main/>}></Route>
          <Route path='/write' element={<Write/>}></Route>
          <Route path='/search' element={<DicSearch/>}></Route>
        </Routes>
        </DicContext.Provider>
        </DicStateContext.Provider>
    </div>
  );
};

export default App;
