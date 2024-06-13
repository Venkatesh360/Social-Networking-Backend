"use client"

import axios from "axios";
import { useState } from "react";

function FindDiscussion() {
const [keyWords, setKeywords] = useState("")
const [discussions, setDiscussions] = useState({})

const handleSearch = async () =>{
  try {
    const response = await axios.get("/api/discussion/getDiscussions", {
      params:{
        keywords:keyWords
      }
    })

    if(response.status == 200){
      setDiscussions(response.data.data)
    }
    else{
      console.log("No discussions found, search using different keywords")
    }
  } catch (error:any) {
    console.log(error)
  }
}

  return (
    <div className="flex flex-col bg-blue-300 h-full">
      <h4>FindDiscussion</h4>
      <input  placeholder="search by keywords" onChange={(e) => setKeywords(e.target.value)} ></input>
      <button>search</button>
    </div>
    
  )
}

export default FindDiscussion;