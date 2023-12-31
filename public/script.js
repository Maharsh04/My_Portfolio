// -------------------------About Me---------------------------------------
var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    document.getElementById(tabname).classList.add("active-tab");
    document.getElementById(tabname + "link").classList.add("active-link");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}

//--------------------------------Typing Effect------------------------------

let writingArea = document.querySelector('.header-text > h1');
const text = "Hi I'm Maharsh from IIT Guwahati";
let cnt = 0, i = 0;
let check1 = false, check2 = false;
let cursorVisible = true;
function type() {
    cursorVisible = false;
    if (i < text.length) {
        if (text.charAt(i) == ' ') {
            cnt++;
        }
        writingArea.innerHTML += text.charAt(i);
        i++;
        if (cnt == 2 && !check1) {
            const name = document.createElement('span');
            name.classList.add('gradient-text');
            writingArea.appendChild(name);
            writingArea = document.querySelector('.header-text > h1 > span');
            check1 = true;
        }
        if (cnt == 3 && !check2) {
            writingArea = document.querySelector('.header-text > h1');
            const newLine = document.createElement('br');
            writingArea.append(newLine);
            check2 = true;
        }
        setTimeout(type, 100);
    }
    else {
        setTimeout(flickerCursor, 100);
    }
}

function flickerCursor() {
    if (cursorVisible) {
        writingArea.innerHTML += "|";
    } else {
        if (writingArea.innerHTML.charAt(writingArea.innerHTML.length - 1) == '|') {
            writingArea.innerHTML = writingArea.innerHTML.slice(0, -1);
        }
    }
    cursorVisible = !cursorVisible;
    setTimeout(flickerCursor, 500); // Adjust the flickering speed (in milliseconds) here
}

window.addEventListener('load', type);



document.querySelector('.submit').addEventListener('click', () => {
    let Name = document.querySelector('.name').value;
    let email = document.querySelector('.email').value;
    let message = document.querySelector('.message').value;
    if (Name.length == 0 || email.length == 0 || message.length == 0) {
        alert("Please fill all form details");
        return;
    }
    const data = {
        name: Name,
        email: email,
        message: message
    }

    fetch('https://myportfolio-hdkh.onrender.com/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(result => {
            document.querySelector('.name').value = "";
            document.querySelector('.email').value = "";
            document.querySelector('.message').value = "";
            document.querySelector('.submit').textContent = "Submitted";
            document.querySelector('.submit').style.background = "#54B435";
            document.querySelector('.submit').style.color = "black";
            setTimeout(() => {
                document.querySelector('.submit').textContent = "Submit";
                document.querySelector('.submit').style.background = "#ff004f";
                document.querySelector('.submit').style.color = "white";
            },1000)
        })
})

