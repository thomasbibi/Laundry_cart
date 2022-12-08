import React, { useEffect, useState } from "react"
import HeaderWithUsername from "../components/HeaderWithUsername"
import "../styles/createOrder.css"
import SmallFooter from "../components/SmallFooter"

function Product(props){
const {image,productType,description,washingRate,ironingRate,towelRate,bleach} = props.data
const [quant , setQuant] = useState()
const [washtype , setWashtype] = useState(false)
const [iron , setIron] = useState(false)
const [towel , setTowel] = useState(false)
const [bleaching , setBleach] = useState(false)
const [total , settotal] = useState(0)

console.log(total)

    return (<div className="product">
        <img src={image} className="heroImg" alt="" />
        <h6 className="productName">{productType}</h6>
        <h6 className="description">{description}</h6>
        <input type="text" className="quantity" onChange={(e) => { setQuant(e.target.value) }} value={quant} />
        <button className="btn"><img src={washtype?"./images/washing-machine-1.png":"./images/washing-machine.png"} alt=" " className="washImg" onClick={(e) => {
            setWashtype(!washtype)
            washtype?
            settotal(prev =>prev - washingRate):settotal(prev =>prev + washingRate)
            // washtype ? e.target.setAttribute('src', "./images/washing-machine-1.png") : e.target.setAttribute('src', "./images/washing-machine.png")
        }} /></button>
        <button className="btn"><img src={iron ?"./images/ironing.png": "./images/ironing-1.png"} className="ironImg" onClick={(e) => {
            setIron(!iron)
            iron?
            settotal(prev =>prev - ironingRate):settotal(prev =>prev + ironingRate)
            // iron ? e.target.setAttribute('src', "./images/ironing.png") : e.target.setAttribute('src', "./images/ironing-1.png")
        }} /></button>
        <button className="btn"><img src="/images/towel.png" className="towelImg" onClick={() => {
            setTowel(!towel)
            towel?settotal((prev)=>prev - towelRate): settotal((prev)=>prev + towelRate)
        }} /></button>
        <button className="btn"><img src={bleaching?"/images/bleach.png" : "/images/bleach-1.png"} className="bleachImg" onClick={(e) => {
            setBleach(!bleaching)
            bleaching ?settotal(prev =>prev - bleach):settotal(prev =>prev + bleach)

            // bleaching ? e.target.setAttribute('src', "/images/bleach.png") : e.target.setAttribute('src', "/images/bleach-1.png")
        }} /></button>
        <span className="ans">{ quant === undefined|| quant === ""? <span>-</span>: `${quant}X${total}= ${quant*total} `}</span>
        <button className="reset" onClick={()=>{
                  setQuant("")
                  setWashtype(false)
                  setIron(false)
                  setTowel(false)
                  setBleach(false)
                  settotal(false)
        }}><h6 className="textBtn">Reset</h6></button>
    </div>)
}

export default function CreateOrder(){
    const [productList , setProductList] = useState([])
    useEffect(()=>{
        async function datafetch(){
        const res = await fetch('http://localhost:5000/createOrder')
        const data = await res.json()
        setProductList(data)
        }
        datafetch();
    },[])
    return (<div>
        <HeaderWithUsername/>
        <div id="search">
            <p id="createText">CreateOrder</p>
            <span id="iconImg"><img src="./images/search.png" id="iconImage"/><span id="line">_____________</span></span>
        </div>
    <div id="table">
    <div className="head">
        <h3 id="type">Product Types</h3>
        <h3 id="quant">Quantity</h3>
        <h3 id="wash">Wash Type</h3>
        <h3 id="price">Price</h3>
    </div>
    <div >
        {productList.map((iter,index)=>{
            return (<Product data = {iter} key = {index} />)
        })}
    </div>
    </div>
    <div id="btncontainer">
        <button id="proceed"><p id="proceedText">Proceed</p></button>
        <button id="cancel"><p id="cancelText">Cancel</p></button>
    </div>
    <div id="orderfooter">
    <SmallFooter/>
    </div>
    </div>)
}