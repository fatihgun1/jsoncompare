import React from 'react'

export default function TextArea({text,setText,label}) {
    return (
        <div className="form-floating">
            <textarea className="form-control h-100" value={text} onChange={(e) => setText(e.target.value)} rows="15"></textarea>
            <label>{label}</label>
        </div>
    )
}
