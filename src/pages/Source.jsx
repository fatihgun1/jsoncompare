import React from 'react'
import TextArea from '../components/TextArea'

export default function Source({ source, setSource }) {
    return (
        <TextArea text={source} setText={setSource} label="Source Json"/>
    )
}
