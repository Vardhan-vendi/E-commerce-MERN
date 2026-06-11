import { useSelector } from "react-redux"

const Profile = () => {
  const {userInfo} = useSelector(state => state.user)
  return (
    <div>{` welcome ,${userInfo.username}`}</div>
  )
}

export default Profile