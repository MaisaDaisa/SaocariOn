

async function login() {
	const usernameElement = document.getElementById("username");
	const passwordElement = document.getElementById("password");
	const errorText = document.getElementById("error-text");
	const username = usernameElement.value;
	const password = passwordElement.value;
	console.log(username);
	console.log(password);

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

	let usernameExists = false;
	let passwordCorrect = false;

	const users = await (await fetch("https://fakestoreapi.com/users")).json();

	users.forEach((user) => {
		if (user.username === username) {
			console.log("Username is correct");
			usernameExists = true;
			if (user.password === password) {
				passwordCorrect = true;
				console.log("Password is correct");
				errorText.innerHTML = "";
				usernameElement.style.border = "2px solid black";
				passwordElement.style.border = "2px solid black";
				giveToken();
			} 
		} 
	});
	
	if (!usernameExists) {
		console.log("Username does not exist");
		usernameElement.style.border = "2px solid red";
		usernameElement.value = "";
		passwordElement.value = "";
		errorText.innerHTML = "Username does not exist";
	} else if (!passwordCorrect){
		usernameElement.style.border = "2px solid black";
		passwordElement.style.border = "2px solid red";
		passwordElement.value = "";
		console.log("Password is incorrect");
		errorText.innerHTML = "Password is incorrect";
	}


}

function giveToken() {
	console.log("Token given");
	// IN REALITY THE BACKEND WILL GIVE US A TOKEN
	const token = {
		token: "eyJhbGciOiJIUzI1NiIsInR",
	};
	localStorage.setItem(
		"saocariOn_token",
		JSON.stringify({ token: token, time: Date.now() })
	);
	window.open("index.html", "_self");
}

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	login();
	console.log("submit");
});
