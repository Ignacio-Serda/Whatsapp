const socket = io();
const leftContainer = document.getElementById("left-container");
const msg = document.getElementById("msg");
const chats = document.getElementsByClassName("chat");
const midContainer = document.getElementById("mid-container");
let svg = `<svg viewBox="0 0 212 212" preserveAspectRatio="xMidYMid meet" class="ln8gz9je ppled2lx" version="1.1" x="0px" y="0px" enable-background="new 0 0 212 500" xml:space="preserve"><path fill="#6F6F6F" class="background" d="M106.251,0.5C164.653,0.5,212,47.846,212,106.25S164.653,212,106.25,212C47.846,212,0.5,164.654,0.5,106.25 S47.846,0.5,106.251,0.5z"></path><g><path fill="#FFFFFF" class="primary" d="M173.561,171.615c-0.601-0.915-1.287-1.907-2.065-2.955c-0.777-1.049-1.645-2.155-2.608-3.299 c-0.964-1.144-2.024-2.326-3.184-3.527c-1.741-1.802-3.71-3.646-5.924-5.47c-2.952-2.431-6.339-4.824-10.204-7.026 c-1.877-1.07-3.873-2.092-5.98-3.055c-0.062-0.028-0.118-0.059-0.18-0.087c-9.792-4.44-22.106-7.529-37.416-7.529 s-27.624,3.089-37.416,7.529c-0.338,0.153-0.653,0.318-0.985,0.474c-1.431,0.674-2.806,1.376-4.128,2.101 c-0.716,0.393-1.417,0.792-2.101,1.197c-3.421,2.027-6.475,4.191-9.15,6.395c-2.213,1.823-4.182,3.668-5.924,5.47 c-1.161,1.201-2.22,2.384-3.184,3.527c-0.964,1.144-1.832,2.25-2.609,3.299c-0.778,1.049-1.464,2.04-2.065,2.955 c-0.557,0.848-1.033,1.622-1.447,2.324c-0.033,0.056-0.073,0.119-0.104,0.174c-0.435,0.744-0.79,1.392-1.07,1.926 c-0.559,1.068-0.818,1.678-0.818,1.678v0.398c18.285,17.927,43.322,28.985,70.945,28.985c27.678,0,52.761-11.103,71.055-29.095 v-0.289c0,0-0.619-1.45-1.992-3.778C174.594,173.238,174.117,172.463,173.561,171.615z"></path><path fill="#FFFFFF" class="primary" d="M106.002,125.5c2.645,0,5.212-0.253,7.68-0.737c1.234-0.242,2.443-0.542,3.624-0.896 c1.772-0.532,3.482-1.188,5.12-1.958c2.184-1.027,4.242-2.258,6.15-3.67c2.863-2.119,5.39-4.646,7.509-7.509 c0.706-0.954,1.367-1.945,1.98-2.971c0.919-1.539,1.729-3.155,2.422-4.84c0.462-1.123,0.872-2.277,1.226-3.458 c0.177-0.591,0.341-1.188,0.49-1.792c0.299-1.208,0.542-2.443,0.725-3.701c0.275-1.887,0.417-3.827,0.417-5.811 c0-1.984-0.142-3.925-0.417-5.811c-0.184-1.258-0.426-2.493-0.725-3.701c-0.15-0.604-0.313-1.202-0.49-1.793 c-0.354-1.181-0.764-2.335-1.226-3.458c-0.693-1.685-1.504-3.301-2.422-4.84c-0.613-1.026-1.274-2.017-1.98-2.971 c-2.119-2.863-4.646-5.39-7.509-7.509c-1.909-1.412-3.966-2.643-6.15-3.67c-1.638-0.77-3.348-1.426-5.12-1.958 c-1.181-0.355-2.39-0.655-3.624-0.896c-2.468-0.484-5.035-0.737-7.68-0.737c-21.162,0-37.345,16.183-37.345,37.345 C68.657,109.317,84.84,125.5,106.002,125.5z"></path></g></svg>`;
let tickBlue = `<svg viewBox="0 0 16 11" height="10" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="#53a5ee"></path></svg>`;
let tickGrey = `<svg viewBox="0 0 16 11" height="10" width="15" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="grey"></path></svg>`;
let eventInner;
let nameRoom;
let id;
let idChat;

pointFetch({data: sessionStorage.getItem("user")})

socket.emit('relog', sessionStorage.getItem("user"));
 
  
const click = function (event) {
    socket.emit('room', {user2: event.target.id, user: sessionStorage.getItem("user")})
    for (let i = 0; i<chats.length; i++){
        chats[i].style.backgroundColor = "#131d24"
    }
    eventInner = event.target;
    event.target.style.backgroundColor = "#2b3b44";
    showChat({user: sessionStorage.getItem("user"), 
            user2: event.target.id});
}

async function showChat(data){
    try {
        const response = await fetch("/showChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),

        });
        const result = await response.json();
        midContainer.innerHTML = `
            <div id="chat-name" class="chat-name">
                ${svg}
                <p class="user">${result.name}</p>
            </div>
            <div id="mid" class="mid">
            </div>
        `
        id = result.user;
        idChat = result.chat;
        document.getElementById("mid-container").innerHTML=`
            ${document.getElementById("mid-container").innerHTML}
            <div class="bottom">
                <input type="text" id="msg" class="msg" placeholder="Escribe un mensaje" >
                <button id="btn-send" onclick="sendmsg()"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24" xml:space="preserve"><path fill="white" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></button>
            </div>
        `
        for (let i = 0; i<result.msg.length;i++){
            if (result.msg[i]["idUsers"] == result.user){
                if(result.msg[i]["visto"] == "true"){
                    document.getElementById("mid").innerHTML=`
                        ${document.getElementById("mid").innerHTML}
                        <div class="container-msg-left">
                            <div class="message">
                                <p class="text">${result.msg[i]["Mensajes"]}</p>
                                <div style="margin-left: 10px; display: flex; color:
                                    #999d9f; justify-content: center; align-items: flex-end;">
                                    <p class="text" style="font-size: 10px; margin-right:5px;">${result.msg[i].fecha}</p>
                                    
                                </div>
                            </div>
                        </div>
                    `
                } else {
                    document.getElementById("mid").innerHTML=`
                        ${document.getElementById("mid").innerHTML}
                        <div class="container-msg-left">
                            <div class="message">
                                <p class="text">${result.msg[i]["Mensajes"]}</p>
                                <div style="margin-left: 10px; display: flex; color:
                                    #999d9f; justify-content: center; align-items: flex-end;">
                                    <p class="text" style="font-size: 10px; margin-right:5px;">${result.msg[i].fecha}</p>
                                    
                                </div>
                            </div>
                        </div>
                    `
                }
                
            } else {
                document.getElementById("mid").innerHTML=`
                    ${document.getElementById("mid").innerHTML}
                    <div class="container-msg-right">
                        <div class="message">
                            <p class="text">${result.msg[i]["Mensajes"]}</p>
                            <div style="margin-left: 10px; display: flex; color:
                                #999d9f; justify-content: center; align-items: flex-end;">
                                <p class="text" style="font-size: 10px; margin-right:5px;">${result.msg[i].fecha}</p>
                            </div>
                        </div>
                    </div>
                `
            }
        }
        if (eventInner.children.length!=1){
            eventInner.children[1].remove();
        }
        document.getElementById("mid").scrollTop = document.getElementById("mid").scrollHeight;

    } catch (error) {
        console.error("Error:", error);
    };
}


let btn = document.getElementsByClassName("chat")

for (var i=0; i < btn.length; i++) {
    btn[i].addEventListener("click", click)
}

function disconnect(){
    location.href="/"
}

function sendmsg(){
    document.getElementById("msg").select()
    var today = new Date();
    var options = { hour: 'numeric' , minute: 'numeric'};
    var now = today.toLocaleString("es-es",options);
    let firstMessage;
    try{
        firstMessage = document.getElementsByClassName("text")[0].innerHTML
    } catch(error){
        firstMessage = null;
    }
    if (document.getElementById("msg").value !== ""){
        if (document.getElementById("msg").value.length > 150){
            alert("Caracteres excedidos. Límite 150.")
        } else {
            socket.emit('confirmmessage', {msg: document.getElementById("msg").value, room: nameRoom, id: id, idChat: idChat, lastMessage: firstMessage, sender:sessionStorage.getItem("user"), hour: now})
        }
    }
    document.getElementById("msg").value = "";
}



socket.on('add-user', (data) =>{
    leftContainer.innerHTML=`
        ${leftContainer.innerHTML}
        <div id="${data.respuesta[i].user}" class="chat">
            ${svg}
            <div><p class="user">${data.user}</p><p style="
                            font-size: 15px;
                            color: #00a884;
                        ">Online
                        </p></div>
        </div>
    `
    btn = document.getElementsByClassName("chat");
    for (var i=0; i < btn.length; i++) {
        btn[i].addEventListener("click", click)
    }
})

socket.on('relog', (data) =>{
    leftContainer.innerHTML='';
    for (let i = 0; i<data.respuesta.length; i++){
        if (data.respuesta[i].user != sessionStorage.getItem("user")){
            if (data.respuesta[i].online == true){
                    leftContainer.innerHTML=`
                        ${leftContainer.innerHTML}
                        <div id="${data.respuesta[i].user}" class="chat">
                            <div style="display:flex">
                                ${svg}
                                <div><p class="user">${data.respuesta[i].user}</p><p style="
                                    font-size: 15px;
                                    color: #00a884;
                                ">Online
                                </p></div>
                            </div>
                        </div>
                    `
            } else {
                    leftContainer.innerHTML=`
                        ${leftContainer.innerHTML}
                        <div id="${data.respuesta[i].user}" class="chat">
                            <div style="display:flex">
                                ${svg}
                                <div><p class="user">${data.respuesta[i].user}</p><p style="
                                    font-size: 15px;
                                    color: grey;
                                ">Offline
                                </p></div>
                            </div>
                        </div>
                    `
            }
        }
    }
    pointFetch({data: sessionStorage.getItem("user")})
    btn = document.getElementsByClassName("chat");
    for (var i=0; i < btn.length; i++) {
        btn[i].addEventListener("click", click)
    }
});

async function pointFetch(data){
    try {
        const response = await fetch("/point", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),

        });
        const result = await response.json();
        let people = document.getElementsByClassName("chat");
        for (let i = 0; i < people.length; i++) {
            if (result[people[i].id] == undefined){
                continue;
            }
            if (result[people[i].id] != 0){
                people[i].innerHTML = `
                    ${people[i].innerHTML}
                    <div class="point"><p>${result[people[i].id]}</p></div>
                `;
            }
        }
    } catch (error){
        console.error(error);
    }
}

socket.on('room', (data) =>{
    nameRoom = data
})

socket.on('confirmmessage', (data) =>{
    let firstText;
    try{
        firstText = document.getElementsByClassName("text")[0].innerHTML;
    } catch (error){
        firstText = null
    }
    if (firstText == data.lastmsg){
        if (data.id == id){
            mid.innerHTML=`
                        ${mid.innerHTML}
                        <div class="container-msg-left">
                            <div class="message">
                                <p class="text">${data.msg}</p>
                                <div style="margin-left: 10px; display: flex; color:
                                #999d9f; justify-content: center; align-items: flex-end;">
                                <p class="text" style="font-size: 10px; margin-right:5px;">${data.hour}</p>
                                
                                </div>
                            </div>
                        </div>
                    `
        } else {
            mid.innerHTML=`
                        ${mid.innerHTML}
                        <div class="container-msg-right">
                            <div class="message">
                                <p class="text">${data.msg}</p>
                                <div style="margin-left: 10px; display: flex; color:
                                #999d9f; justify-content: center; align-items: flex-end;">
                                <p class="text" style="font-size: 10px; margin-right:5px;">${data.hour}</p>
                                </div>
                            </div>
                        </div>
                    `
        }
        checkMsgs({idChat: data.idchat, id: data.id});
        document.getElementById("mid").scrollTop = document.getElementById("mid").scrollHeight;
    } else {
        if (document.getElementById(`${data.sender}`).children.length == 1){
            document.getElementById(`${data.sender}`).innerHTML = `
                ${document.getElementById(`${data.sender}`).innerHTML}
                <div class="point"><p>1</p></div>
            `
        }  else {
            let text = document.getElementById(`${data.sender}`).children[1].innerHTML
            text = text.slice(3,text.length-4)
            text = parseInt(text) + 1
            document.getElementById(`${data.sender}`).children[1].remove();
            document.getElementById(`${data.sender}`).innerHTML = `
                ${document.getElementById(`${data.sender}`).innerHTML}
                <div class="point"><p>${text}</p></div>
            `
        }
    }
    
})



async function checkMsgs(data){
    try{
        await fetch("/checkMsg", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    } catch (error){
        console.error(error)
    }
}