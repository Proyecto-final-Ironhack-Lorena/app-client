import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"

function Signout() {
const context = useContext(AuthContext)
const navigate = useNavigate()


    useEffect(() => {
        const signout = async () => {
            await context.signout()
        }
        signout().then(() => {
          navigate("/")  
        })  
    }, [navigate, context])
  return (
    <div></div>
  )
}

export default Signout