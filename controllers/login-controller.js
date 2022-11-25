import { adminServices } from "../services/login-services.js";

const user = document.querySelectorAll("[data-login]")
const wrongUser = document.querySelector("[data-wrong-user]")

document.querySelector(".menu_login").style = "display: none"

const userEmail = user[0]
const userPass = user[1]

const login = (event) => {
    addUser(event)

    adminServices.loginAdmin().then( (respuesta) => {

        if (userEmail.value === respuesta[0].email && userPass.value === respuesta[0].pass) {
            window.location.href = "admin.html"
        } else {
            const card = document.createElement("div");

            const contenido = "<span>El Usuario o la contraseña son incorrectos</span>"

            card.innerHTML = contenido;
            card.style = "display: block; color: red; margin: 0; padding-left: 1rem;";

            userEmail.value = ""
            userPass.value = ""

            wrongUser.appendChild(card)
        }
    })
}

const addUser = (event) => {
    event.preventDefault();

    const addAdmin = JSON.parse(localStorage.getItem("admin")) || [];

    adminServices.loginAdmin().then( (respuesta) => {
        
        if (userEmail.value === respuesta[0].email && userPass.value === respuesta[0].pass) {
            const admin = {
                id: respuesta[0].id,
                pass: respuesta[0].pass,
                email: respuesta[0].email,
                isAdmin: respuesta[0].isAdmin,
            };
            addAdmin.push(admin);
    
            localStorage.setItem("admin", JSON.stringify(addAdmin));
        }
    })
};

const sendUser = document.querySelector("[data-send]")

sendUser.addEventListener("click", event => login(event))