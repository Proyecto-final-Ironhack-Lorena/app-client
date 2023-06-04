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

const updatePerfil = (perfil) => {
    //actualiza el perfil
    const email = localStorage.getItem("email")
    return service.put(`/user/${email}`, perfil)
}

const getUserData = () => {
    //actualiza el user
    const email = localStorage.getItem("email")
    return service.get(`/user/${email}`)
}

const getQuestions = () => {
    //recuperar las preguntas
    return service.get(`/questions`)
}

const getAnswers = (id) => {
    //recuperar una sola pregunta por su id
    return service.get(`/questions/${id}`)
}


export {
    signup, 
    login, 
    verifyToken,
    updatePerfil,
    getUserData,
    getQuestions,
    getAnswers 
}