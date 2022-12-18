import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        navigate('/bingo/' + e.target.value)
    }

    useEffect(() => {
        try {
            let users = [];
            const users_json = JSON.parse(process.env.REACT_APP_USERS);
            for (const user in users_json) {
                users.push({'id': user, 'name': users_json[user]})
            }
            setUsers(users)
        } catch (e) {
            alert("올바르지 않은 사용자 목록입니다. 관리자에게 문의하세요.")
            setUsers([])
        }
    }, []);

    return (
        <div id='home-div'>
            <select name="pets" id="pet-select" onChange={handleOnChange}>
                <option value="" hidden>이름을 선택해주세요</option>
                {users.map((user) => (
                    <option value={user.id}>{user.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Home;
