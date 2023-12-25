import { Switch } from "@/components/ui/switch"
import {useState} from 'react';
import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'

const Tags = ({type,row}:{type:string;row:any})=>{
   const isTag = type === 'tags';
  const [tags,setTags] = useState(isTag ?( row.tags||[]) : (row.category||[]));
  const handleChange = async (tgs:any) => {
    const {id,tags,category,...rest} = row;
    setTags(tgs)
    const response = await fetch(`http://23.94.83.46:8000/tweet/${id}`, {
      method: 'PUT',
      body:JSON.stringify({...rest,my_comments:'',tags:isTag ? tgs :tags ,category: isTag ? category : tgs ,}),
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json",
      }
    });
    const res = await response.json();
    if(res.code !== 200){
      setTags(isTag?tags:category)
    }



  };
  return (
    <TagsInput value={tags} onChange={handleChange} />
  )
}

export default Tags
