const socket = io();
const btn = document.getElementById("btn");
const user = document.getElementById("user");
const pass = document.getElementById("pass");

btn.addEventListener("click", function(){
    if (user.value === "" || pass.value === ""){
        alert("Complete todos los campos");
    } else {
        sessionStorageSave()
        let data = {
            username: user.value,
            password: pass.value,
            socket: socket.id
        }
        fetchUsers(data);
    }
})

async function fetchUsers(data){
    try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if(result.status == true){
            socket.emit('login-register', user.value);
            location.href="/home";
        } else {
            alert("La contraseña/usuario no son correctos");
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