import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const moveToBingoViewer = (id) => {
        navigate('/bingo/' + id)
    }

    useEffect(() => {
        console.log("use effect")
        console.log(process.env.REACT_APP_USERS)
    }, []);

    return (
        <div id='home-div'>

        </div>
    )
}

export default Home;
