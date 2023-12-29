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

const  mock = {
  "data": [
    {
      "id": "1740339388029051040",
      "user": "CryptosLaowai",
      "publish_time": "2023-12-28 19:50:18",
      "user_name": "Jimmy 米哥 🚀🚀🚀",
      "user_id": "CryptosLaowai",
      "profile_link": "https://twitter.com/CryptosLaowai",
      "tweet": "强者恒强，不要意淫补涨。.资本看不上弱者。",
      "tweet_id": "1740339388029051040",
      "like_cnt": 28,
      "comment_cnt": 14,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "7879",
      "tweet_link": "https://twitter.com/Olympics/status/1740339388029051040",
      "is_certified": true,
      "user_introduce": "🇬🇧Trader, world citizen. @pku1898 alumni. All views are my own. 个人观点强烈。非正式币谈🎙️Space Host｜ 著名交易员｜#Crypto since 2016, 12美金全仓 #eth. 2017-2021赚3.2亿。Tempus fugit.",
      "fans_cnt": 2383,
      "follow_cnt": 2383,
      "location": "London, England",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740328568587157670",
      "user": "CryptosLaowai",
      "publish_time": "2023-12-28 19:07:19",
      "user_name": "Jimmy 米哥 🚀🚀🚀",
      "user_id": "CryptosLaowai",
      "profile_link": "https://twitter.com/CryptosLaowai",
      "tweet": "#LTC to $200 🎯 https://t.co/XiYXdEgT0F",
      "tweet_id": "1740328568587157670",
      "like_cnt": 19,
      "comment_cnt": 14,
      "forward_cnt": 1,
      "quota_cnt": 0,
      "impressions": "11017",
      "tweet_link": "https://twitter.com/Olympics/status/1740328568587157670",
      "is_certified": true,
      "user_introduce": "🇬🇧Trader, world citizen. @pku1898 alumni. All views are my own. 个人观点强烈。非正式币谈🎙️Space Host｜ 著名交易员｜#Crypto since 2016, 12美金全仓 #eth. 2017-2021赚3.2亿。Tempus fugit.",
      "fans_cnt": 2383,
      "follow_cnt": 2383,
      "location": "London, England",
      "quota_tweet_id": "1740002001872712071",
      "quota_tweet_content": "",
      "quota_link": "https://twitter.com/Olympics/status/1740002001872712071",
      "quota_user_id": "CryptosLaowai",
      "quota_tweet_publish_time": "2023-12-27 21:29:39",
      "quota_pic": "https://pbs.twimg.com/media/GCW6mKJWIAEODEj.jpg,",
      "quota_video_link": "",
      "is_forward": true,
      "has_pic": "yes",
      "has_video": "no",
      "img_link": "https://pbs.twimg.com/media/GCbjXpwWoAAcQ7d.png\n",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740322100915937625",
      "user": "CryptosLaowai",
      "publish_time": "2023-12-28 18:41:37",
      "user_name": "Jimmy 米哥 🚀🚀🚀",
      "user_id": "CryptosLaowai",
      "profile_link": "https://twitter.com/CryptosLaowai",
      "tweet": "可涨可跌可横盘，今日分析完毕，祝大家交易愉快！",
      "tweet_id": "1740322100915937625",
      "like_cnt": 18,
      "comment_cnt": 16,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "8543",
      "tweet_link": "https://twitter.com/Olympics/status/1740322100915937625",
      "is_certified": true,
      "user_introduce": "🇬🇧Trader, world citizen. @pku1898 alumni. All views are my own. 个人观点强烈。非正式币谈🎙️Space Host｜ 著名交易员｜#Crypto since 2016, 12美金全仓 #eth. 2017-2021赚3.2亿。Tempus fugit.",
      "fans_cnt": 2383,
      "follow_cnt": 2383,
      "location": "London, England",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740321140164153607",
      "user": "CryptosLaowai",
      "publish_time": "2023-12-28 18:37:48",
      "user_name": "Jimmy 米哥 🚀🚀🚀",
      "user_id": "CryptosLaowai",
      "profile_link": "https://twitter.com/CryptosLaowai",
      "tweet": "🚀😜🚀",
      "tweet_id": "1740321140164153607",
      "like_cnt": 7,
      "comment_cnt": 7,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "3654",
      "tweet_link": "https://twitter.com/Olympics/status/1740321140164153607",
      "is_certified": true,
      "user_introduce": "🇬🇧Trader, world citizen. @pku1898 alumni. All views are my own. 个人观点强烈。非正式币谈🎙️Space Host｜ 著名交易员｜#Crypto since 2016, 12美金全仓 #eth. 2017-2021赚3.2亿。Tempus fugit.",
      "fans_cnt": 2383,
      "follow_cnt": 2383,
      "location": "London, England",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740383197056074049",
      "user": "realwuzhe",
      "publish_time": "2023-12-28 22:44:23",
      "user_name": "wuzhe",
      "user_id": "realwuzhe",
      "profile_link": "https://twitter.com/realwuzhe",
      "tweet": "有没有能监测自己情绪高低的智能手表？",
      "tweet_id": "1740383197056074049",
      "like_cnt": 6,
      "comment_cnt": 7,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "4291",
      "tweet_link": "https://twitter.com/Olympics/status/1740383197056074049",
      "is_certified": true,
      "user_introduce": "科技、好用的工具、美股、数字货币、日常 / 没有建群，谨防骗子 / 投资有风险，不要听我的",
      "fans_cnt": 3985,
      "follow_cnt": 3985,
      "location": "0x",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740186258390065340",
      "user": "realwuzhe",
      "publish_time": "2023-12-28 09:41:49",
      "user_name": "wuzhe",
      "user_id": "realwuzhe",
      "profile_link": "https://twitter.com/realwuzhe",
      "tweet": "中文圈在 CX，那就玩一点吧 https://t.co/SPb4kFn9Pb",
      "tweet_id": "1740186258390065340",
      "like_cnt": 4,
      "comment_cnt": 24,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "13820",
      "tweet_link": "https://twitter.com/Olympics/status/1740186258390065340",
      "is_certified": true,
      "user_introduce": "科技、好用的工具、美股、数字货币、日常 / 没有建群，谨防骗子 / 投资有风险，不要听我的",
      "fans_cnt": 3985,
      "follow_cnt": 3985,
      "location": "0x",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "yes",
      "has_video": "no",
      "img_link": "https://pbs.twimg.com/media/GCZh-svXYAAXiRI.png\n",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740184669189251263",
      "user": "realwuzhe",
      "publish_time": "2023-12-28 09:35:30",
      "user_name": "wuzhe",
      "user_id": "realwuzhe",
      "profile_link": "https://twitter.com/realwuzhe",
      "tweet": "$PRISMA 0.9",
      "tweet_id": "1740184669189251263",
      "like_cnt": 8,
      "comment_cnt": 8,
      "forward_cnt": 0,
      "quota_cnt": 0,
      "impressions": "8859",
      "tweet_link": "https://twitter.com/Olympics/status/1740184669189251263",
      "is_certified": true,
      "user_introduce": "科技、好用的工具、美股、数字货币、日常 / 没有建群，谨防骗子 / 投资有风险，不要听我的",
      "fans_cnt": 3985,
      "follow_cnt": 3985,
      "location": "0x",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740365301051756663",
      "user": "fusionistio",
      "publish_time": "2023-12-28 21:33:16",
      "user_name": "Fusionist 🛸👾 | Endurance ♠️⛓",
      "user_id": "fusionistio",
      "profile_link": "https://twitter.com/fusionistio",
      "tweet": "Fusionist &amp; MARBLEX @MARBLEXofficial unite for a game-changing alliance to revolutionize South Korea's gaming scene! ..MARBLEX, a subsidiary of the leading Gaming company Netmarble Corp, brings together 6,000+ gaming and blockchain pros. ..Get ready for a new era of gaming… https://t.co/ltDvi1mnBI",
      "tweet_id": "1740365301051756663",
      "like_cnt": 175,
      "comment_cnt": 33,
      "forward_cnt": 48,
      "quota_cnt": 7,
      "impressions": "26255",
      "tweet_link": "https://twitter.com/Olympics/status/1740365301051756663",
      "is_certified": false,
      "user_introduce": "Blockchain game & game infrastructure layer $ACE - Discord: https://t.co/8ZiSF0f5GR",
      "fans_cnt": 299,
      "follow_cnt": 299,
      "location": "",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "yes",
      "has_video": "no",
      "img_link": "https://pbs.twimg.com/media/GCcFAgpaAAAIcYz.jpg\n",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740273883381747972",
      "user": "IamRamenPanda",
      "publish_time": "2023-12-28 15:30:01",
      "user_name": "RamenPanda",
      "user_id": "IamRamenPanda",
      "profile_link": "https://twitter.com/IamRamenPanda",
      "tweet": "Solana will soon be under $100..And it will stay under $100 for a long while",
      "tweet_id": "1740273883381747972",
      "like_cnt": 124,
      "comment_cnt": 27,
      "forward_cnt": 8,
      "quota_cnt": 7,
      "impressions": "87520",
      "tweet_link": "https://twitter.com/Olympics/status/1740273883381747972",
      "is_certified": false,
      "user_introduce": "Semi-Retired Crypto OG from 2017. Poloniex and Bittrex alts gambler. Other OGs remember me as Ramen in Bear and Panda in Bull",
      "fans_cnt": 283,
      "follow_cnt": 283,
      "location": "",
      "quota_tweet_id": "",
      "quota_tweet_content": "",
      "quota_link": "",
      "quota_user_id": "",
      "quota_tweet_publish_time": "",
      "quota_pic": "",
      "quota_video_link": "",
      "is_forward": false,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    },
    {
      "id": "1740261857712349361",
      "user": "IamRamenPanda",
      "publish_time": "2023-12-28 14:42:14",
      "user_name": "RamenPanda",
      "user_id": "IamRamenPanda",
      "profile_link": "https://twitter.com/IamRamenPanda",
      "tweet": "币安系列的现在都不太行了..ieo项目今年全军覆没..币安现在被无数双眼睛盯着，不能像21年一样拉盘造富了",
      "tweet_id": "1740261857712349361",
      "like_cnt": 7,
      "comment_cnt": 6,
      "forward_cnt": 0,
      "quota_cnt": 1,
      "impressions": "15950",
      "tweet_link": "https://twitter.com/Olympics/status/1740261857712349361",
      "is_certified": false,
      "user_introduce": "Semi-Retired Crypto OG from 2017. Poloniex and Bittrex alts gambler. Other OGs remember me as Ramen in Bear and Panda in Bull",
      "fans_cnt": 283,
      "follow_cnt": 283,
      "location": "",
      "quota_tweet_id": "1740259458067108119",
      "quota_tweet_content": "",
      "quota_link": "https://twitter.com/Olympics/status/1740259458067108119",
      "quota_user_id": "DoctorMbitcoin",
      "quota_tweet_publish_time": "2023-12-28 14:32:41",
      "quota_pic": "https://pbs.twimg.com/media/GCakvakbgAA1_0x.jpg,",
      "quota_video_link": "",
      "is_forward": true,
      "has_pic": "no",
      "has_video": "no",
      "img_link": "",
      "video_link": "",
      "valuable": false,
      "tags": [

      ],
      "category": [

      ]
    }
  ],
  "code": 200,
  "total": 1305,
  "message": "tweets data retrieved successfully"
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
    query =`since=${search.from}&until=${search.to}&tags=${search.tags}&category=${search.category}&limit=10&offset=${pageIndex*10}`
    if(search.valuable !== undefined){
      query += `&valuable=${search.valuable}`
    }
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
