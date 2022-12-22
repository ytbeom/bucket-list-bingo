import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { setScreenSize } from '../Util';

function Home() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setScreenSize();
        window.addEventListener('resize', setScreenSize);
        try {
            let users = [];
            const users_json = JSON.parse(process.env.REACT_APP_USERS);
            for (const user in users_json) {
                users.push({'id': user, 'name': users_json[user]});
            }
            setUsers(users);
        } catch (e) {
            alert("올바르지 않은 사용자 목록입니다. 관리자에게 문의하세요.");
            setUsers([]);
        }
        return () => {
            window.removeEventListener('resize', setScreenSize)
        }
    }, []);

    const handleOnChange = (e) => {
        navigate('/bingo/' + e.target.value)
    }

    return (
        <div id='home-div'>
            <p>버킷리스트 빙고</p>
            <select name="users-select" id="users-select" onChange={handleOnChange}>
                <option key="placeholder" value="" hidden>--이름--</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Home;
