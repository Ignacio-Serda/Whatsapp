const socket = io();
const btn = document.getElementById("btn");
const nam = document.getElementById("name");
const user = document.getElementById("user");
const pass = document.getElementById("pass");
const passconfirm = document.getElementById("passconfirm");

btn.addEventListener("click", function(){
    if (nam.value === "" || user.value === "" || pass.value === "" || passconfirm.value === ""){
        alert("Complete todos los campos");
    } else {
        if (pass.value === passconfirm.value){
            sessionStorageSave()
            let data = {
                name: nam.value,
                username: user.value,
                password: pass.value,
                id: socket.id
            }
            fetchRegister(data)
        } else {
            alert("Las contraseñas no son iguales");
        }
    }
})

async function fetchRegister(data){
    try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if(result.status == true){
            socket.emit('login-register', user.value);
            socket.emit('add-user', {user: user.value})
            location.href="/home";
        } else {
            alert("El usuario ya existe");
        };
    } catch (error) {
        console.error("Error:", error);
    };
}

function sessionStorageSave(){
    sessionStorage.clear();
    sessionStorage.setItem("id", socket.id);
    sessionStorage.setItem("user", user.value);
}

