const logout = document.querySelector("[data-logout]")

const deleteAdmin = () => {

    const admin = JSON.parse(localStorage.getItem("admin"));
    admin.splice(admin, 1);

    localStorage.setItem("admin", JSON.stringify(admin));

    window.location.href = "login.html"
}

logout.addEventListener("click", () => deleteAdmin());