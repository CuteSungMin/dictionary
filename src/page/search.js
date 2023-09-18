import { useContext} from "react";
import { DicContext } from "../App";
import { Link } from "react-router-dom";

const Search = ({id, word, content, category}) => {
    let {removeFunc} = useContext(DicContext)
    const deleteControll = ()=>{
        if(window.confirm(`${word}를 삭제 하시겠습니까?`)){
            removeFunc(id)
        }
    }
    return ( 
        <div>
             <li key={id}>
            <div>
                {word}<span>{category}</span>
                <p>{content}</p>
           </div>
            {/* <div>
                <button onClick={deleteControll}>Delete</button>
            </div> */}
            <div>
                {/* <Link to='/edit'><button>수정</button></Link> */}
            </div>
            </li>
        </div>
     );
}
 
export default Search;