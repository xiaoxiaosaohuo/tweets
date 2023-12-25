import { Switch } from "@/components/ui/switch"
import {useState} from 'react';

const SwitchValuable = ({checked,row}:{checked:boolean;row:any})=>{
  const [open,setOpen] = useState(checked);
  const onValuableChange = async (checked:boolean) => {
    const {id,tags,category,...rest} = row;
    setOpen(checked)
    const response = await fetch(`http://23.94.83.46:8000/tweet/${id}`, {
      method: 'PUT',
      body:JSON.stringify({...rest,my_comments:'',tags:tags,category:category,valuable:checked}),
      headers:{
        Accept:"application/json",
        'Content-Type':"application/json",
      }
    });
    const res = await response.json();
    if(res.code !== 200){
      setOpen(!checked)
    }



  };
  return <Switch
          checked={open}
          onCheckedChange={onValuableChange}
        />
}

export default SwitchValuable
