"use client"

import { ColumnDef } from "@tanstack/react-table"
import SwitchValuable from "./switch"
import Tags from "./tags-input"
import {format,parseISO} from "date-fns"

export type TweetItem = {
  id: number
  user_id: string
  user_name:string
  publish_time:string
  tweet_link:string
  tweet?:string
  category?:string[]
  tags?:string[]
  comments?:string
  valuable?:boolean
  [key:string]:any
}
type CP = {
  isEdit:boolean
}
export const columnsFunc = ({isEdit}:CP):ColumnDef<TweetItem>[]=>{
  return [
  {
    accessorKey: "user_id",
    header: 'id',

  },
  {
    accessorKey: "user_name",
    header: 'name',

  },
  {
    accessorKey: "tweet",
    header: 'tweet',

  },
   {
    accessorKey: "tweet_link",
    header: 'link',

  },
  {
    accessorKey: "publish_time",
    header: 'date',

  },
  {
    accessorKey: "category",
    header: 'category',
    cell: ({ row }) => {
      return <Tags type="category" row={row.original}/>
    }
  },
  {
    accessorKey: "tags",
    header: 'tags',
    cell: ({ row }) => {
      return <Tags type="tags" row={row.original}/>
    }
  },
  {
    accessorKey: "valuable",
    header: 'valuable',
    cell: ({ row }) => {
      let value = (row.getValue("valuable") as string).toString();
      return <SwitchValuable value={value} row={row.original}/>
    }

  },
]

}

