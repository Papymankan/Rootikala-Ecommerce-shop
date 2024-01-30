import React, { useEffect, useReducer } from "react";
import Validator from "../../Validation/Validators";

const inputReducer = (state, action) => {
    switch (action.type) {
        case ('CHANGE'): {
            console.log(state, action);
            return { ...state, value: action.value, isValid: Validator(action.value, action.validation) }
        }
        case ('CLEAR'): {
            console.log(state, action);
            return { ...state, value: '', isValid: false }
        }
        default: {
            return state
        }
    }
}

export default function Input(props) {
    const [mainInput, dispatch] = useReducer(inputReducer, { value: '', isValid: false })

    const InputOnChange = (e) => {
        dispatch({ type: 'CHANGE', value: e.target.value, validation: props.validation })
    }

    useEffect(() => {
        props.onInputHandler(props.id, mainInput.value, mainInput.isValid)
    }, [mainInput.value])

    const element = <input placeholder={props.placeholder} type={props.type == 'password' ? 'password' : 'text'} onChange={InputOnChange} value={mainInput.value} className={`${mainInput.isValid ? 'success' : 'error'}`}/>



    return (
        <>
            {element}
        </>
    )
}
