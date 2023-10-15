import React from "react";

export default function ClassComponent(props) {
    return (
        <div>
            <div>
                <div>props.title</div>
                <div>props.username</div>
                <img src={props.profileImage}></img>
            </div>
        </div>
    )
}