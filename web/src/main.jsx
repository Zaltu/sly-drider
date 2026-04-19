import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const hostimg = "http://metis:5555/"
const hostimgurl = hostimg + "discharge/"

async function getNewImage(setImgUrl, setImgName){
  let response = await fetch(hostimg+"filepath", {
    mode:"cors",
    method: "GET",
  })
  let res = await response.json()
  console.log(res)
  setImgUrl(hostimgurl+res)
  setImgName(res)
  return res
}

async function passJudgement(judgement, pathnow, siu, sin){
  let body = {
    judgement:judgement,
    path:pathnow
  }
  await fetch(hostimg+"judge", {
    mode:"cors",
    method: "POST",
    body: JSON.stringify(body)
  })
  getNewImage(siu, sin)
}


function Slideshow(){
  const [imgurl, setImgUrl] = useState()
  const [imgname, setImgName] = useState()
  useEffect(() => {
    getNewImage(setImgUrl, setImgName)
  }, [])
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <div className="slideshow-container">
        {/* <!-- Full-height images with number and caption text --> */}
        <div className="mySlides" style={{flexGrow: 1}}>
          <img src={imgurl} style={
            {width: "100%", maxWidth: "none", maxHeight: "100vh", height:"auto", objectFit: "contain"}
          }></img>
        </div>
        {/* <!-- Judgement buttons --> */}
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", position:"absolute", right:0, height:"100vh", backgroundColor: 'transparent'}}>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("poggers", imgname, setImgUrl, setImgName)}>👌</a>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("noice", imgname, setImgUrl, setImgName)}>👍</a>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("icanfixher", imgname, setImgUrl, setImgName)}>🧛</a>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("mid", imgname, setImgUrl, setImgName)}>😐</a>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("yikes", imgname, setImgUrl, setImgName)}>👎</a>
          <a className="icon" style={{color:"white"}} onClick={()=>passJudgement("yeet", imgname, setImgUrl, setImgName)}>🗑️</a>
        </div>
      </div>
    </div>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Slideshow/>
  </StrictMode>,
)
