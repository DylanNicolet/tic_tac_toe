import React from "react";

export default function WinModal(props){
    return(
        <section className="win-modal">
            {props.winner} TAKES THE ROUND
        </section>
    )
}