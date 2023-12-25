"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar";
import {useState,useRef} from 'react'
import { Loader2,Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format,parseISO } from "date-fns"

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

import { Input } from "@/components/ui/input"
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
const publish_time =  new Date();

const SearchForm = ({handleSearch}:P) => {
  const [open, setOpen] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
       publish_time:'',
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
      publish_time:data.publish_time ? format(data.publish_time,'yyyy-MM-dd HH:mm:ss') : ''
    } as any;
    if(data.valuable !== 'undefined'){
      d.valuable = data.valuable === 'true' ? true : false
    }
    debugger;
    handleSearch(d)
  }
  const handleCreate = ()=>{

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
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e)=>{
                      // @ts-ignore
                      field.onChange(e)
                      setOpen(false)
                      }
                    }
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
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
