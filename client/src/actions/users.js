import axios from "../config/axios"

export const setUser = (user) => {
    return {type:'SET_USER', payload: user}
}
export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}
export const startSetUser = (loginData,redirect) => {
    return (dispatch) => {
        axios.post('/api/users/login',loginData)
            .then(response=>{
                console.log(response.data)

                if(response.data.hasOwnProperty('errors')){
                    console.log(`${response.data.errors}`,"--","error")
                } else {
                    console.log("Successfully Logged In!","","success")
                    localStorage.setItem('authToken', response.data.token)
                    dispatch(setUser(response.data.user))
                    redirect()
                    window.location.reload()
                }
            })
    }
}
export const startAddUser = (registerData,redirect) => {
    return(dispatch=>{
        axios.post('/api/users/register',registerData)
            .then(response=>{
                if(response.data.errors){
                    alert(`${response.data.message}`,"","error")
                } else {
                    console.log("Successfully Registered!")
                    redirect()
                    dispatch(setUser(response.data.user))
                                

                }
            })
            

    })
}
export const startRemoveUser = () => {
    return(dispatch=>{
        axios.delete('/api/users/logout',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    localStorage.removeItem('authToken')
                    window.location.href = '/users/login'
                    dispatch(removeUser())
                }
            })
            

    })
}
