import { Switch } from "@/components/ui/switch"
import {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type valuemapT = {
    "true": boolean;
    "false": boolean;
    "undefined": undefined;
}
const valuemap:valuemapT = {
  'true':true,
  'false':false,
  'undefined':undefined
}


const SwitchValuable = ({value,row}:{value:string;row:any})=>{
  const [selectValue,setValue] = useState(value);
  const onValuableChange = async (value:keyof valuemapT) => {
    const {id,tags,category,...rest} = row;
    setValue(value)
    const response = await fetch(`http://23.94.83.46:8000/tweet/${id}`, {
      method: 'PUT',
      body:JSON.stringify({...rest,my_comments:'',tags:tags,category:category,valuable:valuemap[value]}),
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json",
      }
    });
    const res = await response.json();
    if(res.code !== 200){
      setValue(selectValue)
    }
  };

  return (
     <Select onValueChange={onValuableChange} value={selectValue}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={'true'}>true</SelectItem>
          <SelectItem value={'false'}>false</SelectItem>
          <SelectItem value={'undefined'}>undefined</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SwitchValuable
