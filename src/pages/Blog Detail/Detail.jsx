import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const Detail = () => {
 const {id} = useParams()
 console.log(id,"id")

const [singleData, setSingleData] =useState([])

useEffect(() => {
  const getData = async() =>{
  const {data} = await axios.get(`https://fakestoreapi.com/products/${id}`)
  setSingleData(data)
  }
  getData()
}, [])
console.log(singleData,"singleData")
  return (
    
    <div>
         <div >
                   <div >{singleData?.title} </div>
                   <img style={{width:"300px"}} src={singleData?.image}/>
                </div>
    </div>
  )
}

export default Detail