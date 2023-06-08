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

const getNewQuestion = (body) => {
    //reistrar una nueva pregunta
    const email = localStorage.getItem("email")
    return service.post(`/questions/${email}`, body)
}

const getNewAnswer = (id, body) => {
    //reistrar una nueva pregunta
    const email = localStorage.getItem("email")
    return service.post(`/questions/${id}/${email}/answer`, body)
}

const getSearch = (filter) => {
    //te manda el filtro
    return service.get(`/questions/filter/${filter}`)
}

const getDiarios = () => {
    //te muestra todas las entradas del diario
    const email = localStorage.getItem("email")
    return service.get(`/diario/${email}`)
}

const getDiarioId = (id) => {
    //un solo diario
    const email = localStorage.getItem("email")
    return service.get(`/diario/${email}/${id}`)
}

const getNewDiario = (body) => {
    //añadir nuevo diario
    const email = localStorage.getItem("email")
    return service.post(`/diario/${email}`, body)
}

const getListas = () => {
    //tenemos todas las listas
    const email = localStorage.getItem("email")
    return service.get(`/list/all/${email}`)

}

const getListasId = (id) => {
    //lista por id
    return service.get(`/list/${id}`)
}

const getNewList = (body) => {
    //nueva lista
    const email = localStorage.getItem("email")
    return service.post(`/list/${email}`, body)
}

const getUpdateList = (id, body) => {
    //actualizar una lista ya creada
    return service.put(`/list/${id}`, body)
}

const getDeleteList = (id) => {
    //borra la lista que quieras
    return service.delete(`/list/${id}`)
}

export {
    signup, 
    login, 
    verifyToken,
    updatePerfil,
    getUserData,
    getQuestions,
    getAnswers,
    getNewQuestion,
    getNewAnswer,
    getSearch,
    getDiarios,
    getDiarioId,
    getNewDiario,
    getListas,
    getListasId,
    getNewList,
    getUpdateList,
    getDeleteList
}