import React, { useEffect, useState } from 'react'
import Source from './Source';
import Target from './Target';

export default function Calculation() {
    const [source, setSource] = useState();
    const [target, setTarget] = useState();
    const [invalidFields, setInvalidFields] = useState([]);
    const [error, setError] = useState("");
    const onCompareButtonClick = () => {
        try {
            var sourceArray = objectToArray(JSON.parse(source));
            var targetArray = objectToArray(JSON.parse(target));
            compareObject(sourceArray, targetArray)
            //walkThroughObject(sJson);
        } catch (err) {
            setError(err)
        }
    }

    function compareObject(objarray1, objarray2) {
        let length = objarray1.length;
        for (let i = 0; i < length; i++) {
            var inner1 = objarray1[i];
            var inner2 = objarray2[i];

            if (inner1[1] instanceof Array && inner2[1] instanceof Array) {
                var innerSourceArray = inner1[1];
                var innerTargetArray = inner2[1];
                for (let m = 0; m < innerSourceArray.length; m++) {
                    var innerSourceArrayConverted = objectToArray(innerSourceArray[m]);
                    var innerTargetArrayConverted = objectToArray(innerTargetArray[m]);
                    compareObject(innerSourceArrayConverted,innerTargetArrayConverted)
                }
            } else if (inner1[1] instanceof Object && inner2[1] instanceof Object) {
                console.log("Object",inner1[0], inner2[0]);
                compareObject(objectToArray(inner1[1]), objectToArray(inner2[1]));
            } else {
                if (inner1[0] !== inner2[0]) {
                    //setInvalidFields(oldArray => [...oldArray,inner2[0]] )
                    console.log("Not Equal fields", inner2[0]);
                } else {
                    console.log("Equal fields : ", inner1[0], inner2[0]);
                }

            }
        }
    }

    function objectToArray(obj) {
        return Object.keys(obj).map((key) => [key, obj[key]]);
    }


    const onSourceFormatClick = () => {
        var obj = JSON.parse(source);
        var pretty = JSON.stringify(obj, undefined, 4);
        setSource(pretty)
    }

    const onSTargetFormatClick = () => {
        var obj = JSON.parse(target);
        var pretty = JSON.stringify(obj, undefined, 4);
        setTarget(pretty)
    }


    return (
        <div className='container mt-4 h-100'>
            <div className="row mb-4">
                <div className="col  h-100">
                    <Source source={source} setSource={setSource} />
                    <button className='btn btn-primary w-100 mt-2' onClick={onSourceFormatClick}>Format Source</button>
                </div>
                <div className="col  h-100">
                    <Target target={target} setTarget={setTarget} />
                    <button className='btn btn-primary w-100 mt-2' onClick={onSTargetFormatClick}>Format Target</button>
                </div>
            </div>
            <div className="row">
                <button className='btn btn-primary w-100 mb-2' onClick={onCompareButtonClick}>Compare</button>

            </div>
            <div className="row">

            </div>
        </div>
    )
}
