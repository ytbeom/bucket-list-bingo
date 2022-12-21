import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BingoViewer.css';
import { getBucketListByUserId, postBucketListItem } from '../api/API';
import { setScreenSize } from '../Util';

function BingoViewer() {
    const { id } = useParams();
    const [ items, setItems ] = useState([]);
    const [ lines, setLines ] = useState(0);
    const [ selectedItem, setSelectedItem ] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', setScreenSize);
        return () => {
            window.removeEventListener('resize', setScreenSize)
        }
    }, [])

    useEffect(() => {
        getBucketListByUserId(id)
            .then(response => {
                setItems(response.data)
                checkBingo(response.data)
            })
            .catch(error => {
                console.log(error)
                alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            })
    }, [id])

    const checkBingo = (items) => {
        let _lines = 0;
        let i, j, checked;

        // check diagonal direction
        if (items[0].complete &&
            items[6].complete &&
            items[12].complete &&
            items[18].complete &&
            items[24].complete) {
            _lines++;
        }
        if (items[4].complete &&
            items[8].complete &&
            items[12].complete &&
            items[16].complete &&
            items[20].complete) {
            _lines++;
        }

        // check row direction
        for (i = 0; i < 5; i++) {
            checked = true;
            for (j = 0; j < 5 && checked; j++) {
                checked = checked && items[i * 5 + j].complete
            }
            if (checked) {
                _lines++;
            }
        }

        // check column direction
        for (i = 0; i < 5; i++) {
            checked = true;
            for (j = 0; j < 5 && checked; j++) {
                checked = checked && items[i + j * 5].complete
            }
            if (checked) {
                _lines++;
            }
        }

        setLines(_lines)
    }

    const handleBoardOnClick = (e) => {
        e.stopPropagation()
        const data = JSON.parse(e.target.getAttribute('custom-data'))
//        setSelectedItem(data)
        const item = {
            'id': data.id,
            'complete': !data.complete
        }
        postBucketListItem(item)
            .then(response => {
                const items = items.map(function(item) {
                    return item.id === response.data.id ? response.data : item;
                });
                setItems(items)
                checkBingo(items)
            })
            .catch(error => {
                console.log(error)
                alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
            })
    }

    const handleOutsideOnClick = () => {
        setSelectedItem(null)
    }

    const handleCompleteButtonOnClick = () => {

    }

    const handleNotCompleteButtonOnClick = () => {

    }

    return (
        <>
            <div id='bingo-viewer-div'>
                <div id='count-div'>완성한 빙고 수: {lines}</div>
                <div id='board-div'>
                    {items.map((item) => (
                        <div
                            className={(item.complete ? "completed": "")}
                            key={item.id}
                            custom-data={JSON.stringify(item)}
                            onClick={handleBoardOnClick}
                        >
                            {item.num}
                        </div>
                    ))}
                </div>
            </div>
            {selectedItem !== null && <div id='popup-div' onClick={handleOutsideOnClick}>
                {selectedItem.num}
                {selectedItem.title}
            </div>}
        </>
    )
}

export default BingoViewer;
