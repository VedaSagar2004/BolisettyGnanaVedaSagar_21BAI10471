import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Heading } from "../components/Heading"
import { LandingCell } from "../components/LandingCell"
import { LandingButton } from "../components/LandingButton"

export const Landing = () => {
    const [order, setOrder] = useState([])
    const navigate = useNavigate()
    const Id = localStorage.getItem("Id")

    if (Id){
        navigate('/game', {state: {Id}})
    }

    
    // button logic to navigate to game page
    const handleButton = () => {
        if (order.length != 5){
            return alert("Please select all Characters")
        } else {
            navigate('/game', {state: {order: order}})
            
        }
    }

    // cell logic to update the order
    const handleClick = (piece) => {
        setOrder(prevOrder => {
            if (prevOrder.includes(piece)){
                return prevOrder.filter(i => i!== piece)
            } else {
                return [...prevOrder, piece]
            }
        })
    }

    return <div className="bg-slate-950 min-h-screen">
        <div><Heading></Heading></div>
        <div className="text-2xl text-white flex items-center justify-center pt-7">Please select your character order</div>
        <div className="min-h-96 min-w-screen flex items-center justify-center">
            <div className="flex justify-evenly gap-5">
                <LandingCell piece={"P1"} onClick={() => handleClick("P1")} isSelected={order.includes("P1")}></LandingCell>
                <LandingCell piece={"P2"} onClick={() => handleClick("P2")} isSelected={order.includes("P2")}></LandingCell>
                <LandingCell piece={"P3"} onClick={() => handleClick("P3")} isSelected={order.includes("P3")}></LandingCell>
                <LandingCell piece={"H1"} onClick={() => handleClick("H1")} isSelected={order.includes("H1")}></LandingCell>
                <LandingCell piece={"H2"} onClick={() => handleClick("H2")} isSelected={order.includes("H2")}></LandingCell>
            </div>
        </div>
        <div className="text-2xl text-white flex items-center justify-center pt-7">
            Selected Order: {order.join(" ")}
        </div>
        <div className="flex items-center justify-center mt-6"><LandingButton onClick = {() => handleButton()}></LandingButton></div>
    </div>

}