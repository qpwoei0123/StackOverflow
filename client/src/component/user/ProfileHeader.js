import { styled } from "styled-components";
import userNull  from "../../asset/User_null.png"
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import {fetchAllUserData} from "../../api/getAllUserData"
import { useEffect , useState} from "react";


const ProfileContainer = styled.section`
    display: flex;
    height: 20vh;
    width: 100%;
    justify-content: space-between;
    
    > .leftDiv {
        display: flex;
        height: 100%;
        align-items: center;
        >img{
            height: 100%;
            border-radius: 20px;
        }
        > .userInfo {
            margin-left: 20px;
            & > :first-child {
                margin: 0;
                font-size: 200%;
                color: var(--black);
            }
            & > :last-child {
                margin: 0;
                color: var(--silver-darker);
        }
         }
    }

    > .rightDiv {
        display: flex;
        align-items: start;
        height: 100%;
        >button{
            padding: 10px;
            margin-left: 20px;
            color: var(--white);
            border-radius: 5px;
        }
    }
`

export default function ProfileHeader(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const path = window.location.pathname;
    const [user, setUser] = useState(null)
    const memberId = path.slice(path.lastIndexOf("/") + 1);
    const localId = localStorage.getItem("memberId")
    const admin = useSelector(state => state.user.data.admin)

    useEffect(()=> {
        dispatch(fetchAllUserData())
        .then(data =>  data.payload.data)
        .then(users => users.filter(user => user.memberId == memberId))
        .then(data => setUser(data[0]))
    },[dispatch])
    
    return(
        <>
            {user
            ?(
            <ProfileContainer>
                <div className="leftDiv">
                    <img src={userNull} alt="userNull"/>
                    <div className="userInfo">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="rightDiv">
                {localId == memberId || admin
                ? (
                <>
                    <button style={{ backgroundColor: 'var(--blue-500)' }}  onClick={()=>navigate(`/user/edit/${memberId}`)}>Edit Profile</button>
                    <button style={{ backgroundColor: 'var(--red-400)' }}  onClick={()=>navigate(`/user/delete/${memberId}`)}>Delete Profile</button>
                </>)
                :<></>}
                </div>
            </ProfileContainer>)
            : null}

        
        </>
    )
}