import React, { useEffect, useState } from 'react'
import Source from './Source';
import Target from './Target';
import parse from 'html-react-parser';

export default function Calculation() {
    const [source, setSource] = useState();
    const [target, setTarget] = useState();
    const [forms, setForm] = useState('');
    const [error, setError] = useState("");
    const reactElements = parse(forms);
    useEffect(() => { }, [forms])
    var form;
    const onCompareButtonClick = () => {
        try {
            var sourceArray = objectToArray(JSON.parse(source));
            var targetArray = objectToArray(JSON.parse(target));
            form = '<table className="table table-bordered"><tbody>';
            compareObject(sourceArray, targetArray)
            form = form + '</tbody></table>';
            setForm(form)
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
                let difference = differenceOfObjectsWithSets(inner1, inner2);
                form = form + '<tr>' + '<td>' + inner1[0] + '</td>' + '<td>' + typeof inner1[1] + '</td> ' + '</tr>';
                if (difference.length === 0 && inner1[0] === inner2[0]) {
                    var innerSourceArray = inner1[1];
                    var innerTargetArray = inner2[1];
                    for (let m = 0; m < innerSourceArray.length; m++) {
                        var innerSourceArrayConverted = objectToArray(innerSourceArray[m]);
                        var innerTargetArrayConverted = objectToArray(innerTargetArray[m]);
                        compareObject(innerSourceArrayConverted, innerTargetArrayConverted)
                    }
                } else if (difference.length > 0) {
                    form = form + '<tr className="table-danger">'
                    let diffattribute = "";
                    for (let l = 0; l < difference.length; l++) {
                        for (let p = 0; p < difference[l].length; p++) {
                            diffattribute = Object.keys(difference[l][p]).toString();
                        }
                    }
                    form = form + '<td>' + diffattribute + '</td>' + '<td>missing attribute for object</td>' + '</tr>'
                } else {
                    form = form + '<tr className="table-danger">' + '<td>' + inner1[0] + '</td> ' + '<td> target different from source new value ->' + inner2[0] + '</td> ' + '</tr>';
                }
            } else if (inner1[1] instanceof Object && inner2[1] instanceof Object) {
                var sourceArray = objectToArray(inner1[1]);
                var targetArray = objectToArray(inner2[1]);
                let differences = differenceOfObjectsWithSets(sourceArray, targetArray);
                //form = form + '<tr>' + '<td>' + inner1[0] + '</td>' + '<td>' + typeof inner1[1] + '</td> ' + '</tr>';
                if (differences.length > 0) {
                    form = form + '<tr className="table-danger">'
                    let diffattribute = "";
                    for (let l = 0; l < differences.length; l++) {
                        diffattribute = diffattribute + differences[l][0] + ', ';
                        console.log("diffattribute", diffattribute);
                    }
                    form = form + '<td>' + diffattribute + '</td>' + '<td>missing attribute for object</td>' + '</tr>'
                } else if (differences.length === 0 && inner1[0] === inner2[0]) {

                    form = form + '<tr>' + '<td>' + inner1[0] + '</td>' + '<td>' + typeof inner1[1] + '</td> ' + '</tr>';
                    compareObject(sourceArray, targetArray);
                }
                else {
                    form = form + '<tr className="table-danger">' + '<td>' + inner2[0] + '</td>' + '<td> target different from source new value ->' + inner2[0] + '</td> ' + '</tr>';
                }

            } else {
                if (inner1[0] === inner2[0]) {
                    form = form + '<tr>' + '<td>' + inner1[0] + '</td>' + '<td>' + typeof inner2[1] + '</td> ' + '</tr>';
                } else {
                    form = form + '<tr className="table-danger">' + '<td>' + inner1[0] + '</td> ' + '<td> target different from source new value ->' + inner2[0] + '</td> ' + '</tr>';
                }
            }
        }
    }

    function differenceOfObjectsWithSets(arr1, arr2) {
        const set1 = new Set(arr1.map(obj => JSON.stringify(obj)));
        const set2 = new Set(arr2.map(obj => JSON.stringify(obj)));

        const difference = [...set1].filter(objStr => !set2.has(objStr)).map(objStr => JSON.parse(objStr));

        return difference;
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

                <div className="col">
                    <button className='btn btn-primary w-100 mb-2' onClick={onCompareButtonClick}>Compare</button>
                </div>
                <div className="col-2">
                    <button className='btn btn-danger w-100 mb-2 ' onClick={() => setForm("")}>Delete</button>
                </div>
            </div>
            <div className="row">
                {forms && parse(forms)}
            </div>
        </div>
    )
}
