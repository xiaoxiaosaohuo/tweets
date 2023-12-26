"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar";
import {useState,useRef,useMemo} from 'react'
import { Loader2,Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format,parseISO,subDays,getHours, getMinutes, getSeconds } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
function formatTime(time:string) {
 return `${time}`.padStart(2, '0')
}


const formSchema = z.object({
  publish_time: z
  .any(),
  tags: z
    .string(),
  category: z
    .string(),
  valuable: z
    .string()

})
const itemStatus = ['true','false','undefined']

export type FormValues = z.infer<typeof formSchema>

interface P  {
  handleSearch: (data: FormValues) => void
}

const SearchForm = ({handleSearch}:P) => {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<any>({
    from: new Date(),
    to: subDays(new Date(), 1)
  })
  const time = useMemo(()=>{
    const now = new Date();
    return {
      hour:getHours(now),
      minute: getMinutes(now)
    }
  },[])
  const [start,setStart] = useState<any>({
    hour:time.hour,
    minute:time.minute,
    second:0,
    millisecond:0
  })
  const [end,setEnd] = useState<any>({
    hour:time.hour,
    minute:time.minute,
    second:0,
    millisecond:0
  })

  const setStartTimeValue= (value:any)=>{
    setStart(value)
  }
  const setEndTimeValue= (value:any)=>{
    setEnd(value)
  }


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
       publish_time:{
        from: '',
        to: ''
       },
       tags:'',
       category:'',
       valuable:'undefined'
    },
    mode: "onChange",
  })

  function onSubmit(data: FormValues) {
    const d = {
      tags:data.tags ? JSON.stringify(data.tags.split(',')) : '',
      category:data.category ?  JSON.stringify(data.category.split(',')) : '',
      from:data.publish_time && data.publish_time.from ? `${format(data.publish_time.from, 'yyyy-MM-dd')} ${formatTime(start.hour)}:${formatTime(start.minute)}` : '',
      to:data.publish_time && data.publish_time.to ?`${format(data.publish_time.to, 'yyyy-MM-dd')} ${formatTime(end.hour)}:${formatTime(end.minute)}` : ''
    } as any;
    if(data.valuable !== 'undefined'){
      d.valuable = data.valuable === 'true' ? true : false
    }
    handleSearch(d)
  }

  return(

    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-wrap space-y-8 xl:flex xl:flex-row xl:items-center xl:justify-start xl:space-x-8 xl:space-y-0">
        <FormField
          control={form.control}
          name="publish_time"
          render={({ field }) => (
            <FormItem className="sm:flex sm:flex-row sm:items-center sm:justify-start sm:space-x-4 sm:space-y-0">
              <FormLabel>Date</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild >
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value.from ? (
                        <div className="flex flex-row justify-between">
                          <p className="mr-4">{`${format(field.value.from, 'yyyy-MM-dd')} ${formatTime(start.hour)}:${formatTime(start.minute)}`}</p>
                          <p>{`${format(field.value.to? field.value.to : new Date(), 'yyyy-MM-dd')} ${formatTime(end.hour)}:${formatTime(end.minute)}`}</p>
                        </div>
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" >
                  <Calendar
                    mode="range"
                    initialFocus
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={(e)=>{
                      field.onChange(e)
                    }}
                    numberOfMonths={2}
                    start={start}
                    end={end}
                    setStartTimeValue={setStartTimeValue}
                    setEndTimeValue={setEndTimeValue}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="sm:flex sm:flex-row sm:items-center sm:justify-start sm:space-x-4 sm:space-y-0">
              <FormLabel>category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="sm:flex sm:flex-row sm:items-center sm:justify-start sm:space-x-4 sm:space-y-0">
              <FormLabel>tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter tags" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valuable"
          render={({ field }) => (
            <FormItem className="sm:flex sm:flex-row sm:items-center sm:justify-start sm:space-x-4 sm:space-y-0">

              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[200px]">
                {itemStatus.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
          )}
        />
        <Button type="submit" className="">Search</Button>
      </form>
    </Form>
  )
}

export default SearchForm;
