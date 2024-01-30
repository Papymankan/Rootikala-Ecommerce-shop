import React from "react";

export default function Input(props) {

    const element = <input placeholder={props.placeholder} type={'text'} />

    return (
        <>
            {element}
        </>
    )
}
