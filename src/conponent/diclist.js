import DicItem from "./dicitem";
import {DicStateContext} from '../App';
import { useContext, useState } from "react";
import './diclist.css'

const sortList = [
    {value : 'All', name : 'All'},
    {value : 'html', name : 'html'},
    {value : 'css', name : 'css'},
    {value : 'js', name : 'Javascript'},
    {value : 'react', name : 'react'},
    {value : 'node', name : 'node'}
];
const SortSelect = ({value, onChange, sortList})=>{
    return(
        <select className="select"  value={value} onChange={(e)=>onChange(e.target.value)}>
            {
                sortList.map((sort)=>(
                    <option value={sort.value}>{sort.name}</option>
                ))
            }
        </select>
    )
}

const DicList = () => {
    const datas = useContext(DicStateContext);
    const [sort, setSort] = useState('All');

    const getSortList = ()=>{
        const sortcallback = (item)=>{
            if(sort === 'html'){
                return item.category === 'html'
            } else if(sort === 'css'){
                return item.category === 'css'
            } else if(sort === 'js'){
                return item.category === 'js'
            } else if(sort === 'node'){
                return item.category === 'node'
            } else{
                return item.category === 'react'
            };
        };
        const copyList = JSON.parse(JSON.stringify(datas));
        const sortList = sort === 'All'? copyList : copyList.filter((item)=>sortcallback(item));
        return sortList;
    };

    

    return ( 
        <div className="dicList">
            <div className="dicList_title">
                <SortSelect value={sort} onChange={setSort} sortList={sortList} />
                <p>{sort}</p>
            </div>
            <div>
                <ul>
                    {getSortList().map((data)=>
                        <DicItem key={data.Id} {...data}/>
                    )}
                </ul>
            </div>
        </div>

     );
}
 
export default DicList;