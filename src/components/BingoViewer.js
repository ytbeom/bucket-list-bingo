import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BingoViewer() {
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    }, []);

    return (
        <div id='viewer-div'>

        </div>
    )
}

export default BingoViewer;
