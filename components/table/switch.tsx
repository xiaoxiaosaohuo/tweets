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



const SwitchValuable = ({value,row}:{value:string;row:any})=>{
  const [selectValue,setValue] = useState(value);
  const onValuableChange = async (value:string) => {
    const {id,tags,category,...rest} = row;
    setValue(value)
    const response = await fetch(`http://23.94.83.46:8000/tweet/${id}`, {
      method: 'PUT',
      body:JSON.stringify({...rest,my_comments:'',tags:tags,category:category,valuable:value}),
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
          <SelectItem value={'1'}>未定义</SelectItem>
          <SelectItem value={'2'}>有价值</SelectItem>
          <SelectItem value={'3'}>无价值</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SwitchValuable
