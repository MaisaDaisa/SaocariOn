
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username)
    console.log(password)

    // API DOES NOT WORK SO WE DOING IT MY WAY

    // await fetch('https://fakestoreapi.com/auth/login',{
    //         method:'POST',
    //         body:JSON.stringify({
    //             username: username,
    //             password: password
    //         })
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))

    // ANYTHING AFTER THIS IS DONE IN NON TRADITIONAL WAY

    const users = await (await fetch('https://fakestoreapi.com/users')).json()
    users.forEach(user => {
        if (user.username === username && user.password === password) {
            console.log('Logged in')
            return true;
        }
    });
    
    return true;
}

async function giveToken() {
    if (await login()) {
        console.log('Token given')
        // IN REALITY THE BACKEND WILL GIVE US A TOKEN
        const token = {
            token: "eyJhbGciOiJIUzI1NiIsInR"
        }
        localStorage.setItem('saocariOn_token', JSON.stringify({token: token, time: Date.now()}))
        window.open('index.html', '_self')
    } else {
        console.log('Wrong credentials')
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit')
    giveToken();
});


