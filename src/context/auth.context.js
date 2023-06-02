import { createContext, useEffect, useState } from "react"
import * as BackendService from "../services/auth.services";
import { Box, CircularProgress } from "@mui/material";


const AuthContext = createContext();

function AuthWrapper({children}) {

    //1- los estados o funciones a exportar
    const [logged, setLogged ] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        tokenVerification()
    }, [])

    const tokenVerification = async () => {

        try {

            const response = await BackendService.verifyToken()
            setLogged(true)
            setUser(response.data.payload)
            setIsLoading(false)


        } catch(error) {
            setLogged(false)
            setUser(null)
            setIsLoading(false)
        }
    }

    //2- El objeto de contexto que pasaremos

    const contextObj = {
        user,
        logged,
        tokenVerification
    }

    //3- La renderización de la App con el contexto
    if (isLoading) {
        return (
          <Box component="div" className="App">
            <CircularProgress color="secondary"/>
          </Box>
        )
      }

      return (

            <AuthContext.Provider value={contextObj}>

                {children}

            </AuthContext.Provider>
      )

}

export {
    AuthWrapper,
    AuthContext
}