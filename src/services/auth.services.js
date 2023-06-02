import service from './config.services'

const signup = (user) => {
    //user -> username, email, password
    return service.post("/auth/signup", user)
}

const login = (credenciales) => {
    //credenciales -> email, password
    return service.post("/auth/login", credenciales)
}

const verifyToken = () => {
    //pasamos el token
    return service.get("/auth/verify")
}


export {
    signup, 
    login, 
    verifyToken 
}