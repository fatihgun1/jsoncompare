import React from 'react'
import TextArea from '../components/TextArea'

export default function Target({target,setTarget}) {
    return (
        <TextArea text={target} setText={setTarget} label="Target Json"/>
    )
}
