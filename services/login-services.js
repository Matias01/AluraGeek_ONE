// GET 

const loginAdmin = () => fetch("http://localhost:3000/user")
                            .then(respuesta => respuesta.json());

export const adminServices ={
    loginAdmin,
} 