import React, { useContext} from "react";
import useInput from '../hook/useinput';
import {DicContext} from '../App'
import './dicwrite.css'

const DicWrite = () => {
    const [{word, content, category}, onChange, reset] = useInput({
        word : '',
        content : '',
        category : ''
    });
    const {onCreate} = useContext(DicContext);
    const onCreateBtn = ()=>{
        onCreate(word, content,category);
        reset();
    };
    return (  
        <div className="dicWrite">
            <div className="dicWrite_word"> 
                <input onChange={onChange} type="text" name="word" value={word} placeholder="단어를 등록 해주세요" />
            </div>
            <div className="dicWrite_content">
                <textarea onChange={onChange} name="content" value={content} placeholder="설명글을 등록 해주세요" />
            </div>
            <div className="dicWrite_category">
                <select name="category" value={category} onChange={onChange}>
                        <option value={'html'}>html</option>
                        <option value={'css'}>css</option>
                        <option value={'js'}>java script</option>
                        <option value={'node'}>node</option>
                        <option value={'react'}>react</option>
                </select>
            </div>
            <div className="dicWrite_btn">
                <button onClick={onCreateBtn}>save</button>
            </div>
        </div>
    );
}
 
export default React.memo(DicWrite);