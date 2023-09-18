import { useState, useRef, useContext} from "react";
import {DicContext} from '../App'
import './dicitem.css'

const DicItem = ({id, word, content, createDate, category}) => {
    const{onRemove, onEdit} = useContext(DicContext)
    const textEdit = useRef()
    const [isEdit, setIsEdit] = useState(false);
    const [editExplain, setEditExplain] = useState(content);
    const editFunc = ()=>{
        setIsEdit(!isEdit);
    }
    const changeFunc = (e)=>{
        setEditExplain(e.target.value)
    }
    const removeFunc = ()=>{
        if(window.confirm(`${word}를 삭제 하시겠습니까?`)){
            onRemove(id)
        }
    }
    const cancelFunc = ()=>{
        if(window.confirm('취소 하시겠습니까?')){
            editFunc()
            setEditExplain(content);
        }
    }
    const saveFunc = ()=>{
        if(editExplain.length < 10){
            alert('설명글을 자세히 작성해주세요');
            textEdit.current.focus();
        }
        onEdit(id, editExplain);
        editFunc()
    }
    return ( 
        <div className="dicItem">
            <div>
                <dl className="dicItem_content">
                    <dt><h1>{word}</h1></dt>
                    <dd><b>「 {
                        isEdit ? 
                        <textarea className="text_write" ref={textEdit} value={editExplain} onChange={changeFunc}/>
                     : content 
                    } 」</b>
                    <p>목록 : {category}</p>
                    <p>업로드 날짜 : {createDate}</p>
                    </dd>
                </dl>
                {isEdit ? 
                    (<div className="btn_wrap">
                        <button className="save_btn" onClick={saveFunc}>저장</button>
                        <button className="cancel_btn" onClick={cancelFunc}>취소</button>
                    </div> 
                    ):(
                    <div className="btn_wrap">
                        <button className="save_btn" onClick={editFunc}>수정</button>
                        <button className="cancel_btn" onClick={removeFunc}>삭제</button>
                    </div> )
                }
            </div>
        </div>
     );
}
 
export default DicItem;