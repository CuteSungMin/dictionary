import { useContext, useState } from "react";
import Search from "../page/search";
import {DicStateContext} from '../App'
import './dicsearch.css'

const DicSearch = () => {
    const [result, setRsult] = useState([]);
    const dics = useContext(DicStateContext);
    const searchData = ()=>{
        setRsult(
            dics.filter((item) =>item.word.toLowerCase().includes(keyword)||item.content.toLowerCase().includes(keyword)
      ));
      
    }
    let [keyword, setKeyword] = useState('');
    
    const keywordInput = (e)=>{
        setKeyword(e.target.value)
    }
    const search = ()=>{
        searchData(keyword)
    }
    
    return ( 
        <div className="dicsearch_wrap">
            <input onChange={keywordInput} type="text" placeholder="검색어를 입력해주세요"></input>
            <button onClick={search}>search</button>
            <ul>
            {result.map((data) =>
                <Search key={data.Id} {...data} ></Search>
            )}
            </ul>
        </div>
     );
}
 
export default DicSearch ;