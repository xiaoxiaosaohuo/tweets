'use client'
import {useState,useMemo, useCallback} from 'react'
import { columnsFunc,TweetItem } from "@/components/table/columns"
import { DataTable } from "@/components/data-table"
import SearchForm,{FormValues}  from "@/components/tweet-search-form";
import useSWR, { SWRResponse,mutate } from 'swr';
import { format,parseISO } from "date-fns"

interface Data {
  data: TweetItem[];
  total?: number;
  [key:string]:any;
}


const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};


function IndexPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [search,setSearch] = useState<any>({publish_time:'',tags:'',category:''});
  const query = useMemo(()=>{
    let query = '';
    const list = ['publish_time','tags','category','valuable']
    query =`since=${search.from||''}&until=${search.to||''}&tags=${search.tags||''}&category=${search.category||''}&limit=10&offset=${pageIndex*10}`
    query += `&valuable=${search.valuable || ''}`
    return query
  },[search,pageIndex])

  const { data, error,isLoading }: SWRResponse<Data, any> = useSWR(`http://23.94.83.46:8000/tweet/list?${query}`, fetcher,{
     revalidateOnFocus:false
  });

  const handleSearch = (data:any)=>{
    setPageIndex(0)
    setSearch(data);
  }

  const columns = useMemo(()=>{
    return columnsFunc({isEdit:true})
  },[search,pageIndex])


   const tableData = Array.isArray(data?.data) && data?.data ? data.data : [];
  const total = data?.total ? data.total : 0;

  return (
    <div className="containe m-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold leading-6">Tweets Management</h1>
        </div>
      </div>

      <div className="mt-8 space-y-8">

       <SearchForm handleSearch={handleSearch}></SearchForm>

      <DataTable columns={columns} data={tableData} setPageIndex={setPageIndex} pageIndex={pageIndex} total={total}  isLoading={isLoading}/>
      </div>

    </div>
  )
}

export default IndexPage;
