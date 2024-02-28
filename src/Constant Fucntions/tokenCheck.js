
// In reality the backend will check the token and the token will be valid for a certain time period
// If the token is not valid then the user will be redirected to the login page
// If the token is valid then the user will be able to access the page

if (localStorage.getItem('saocariOn_token')) {
    const localToken = JSON.parse(localStorage.getItem('saocariOn_token'))
    const compareToken = {
        token: "eyJhbGciOiJIUzI1NiIsInR"
    }
    if (localToken.token.token === compareToken.token) {
        console.log('Token is and...')
        const comparison = Date.now() - localToken.time
       if (comparison < 1000 * 60 * 60 * 24) {
            // This compares the time the token was given to the current time and if it is more than 24 hours then the token is not valid 
            // the date subtraction is in milliseconds so 1000 * 60 * 60 * 24 is 24 hours
            
            // NOTE: THIS IS NOT A SECURE WAY TO CHECK THE TOKEN BECAUSE THE USER CAN CHANGE THE TIME ON THEIR DEVICE THATS WHY 
            // THE TOKEN IS USUALLY CHECKED ON THE BACKEND
           console.log('Token time is Okay')
       } else {
              console.log('Token is expired, going back to login page')
              window.open('login.html', '_self')
       }
    } else {
        console.log('Token is not valid')
        window.open('login.html', '_self')
    }
} else {
    console.log('Token is not there')
    window.open('login.html', '_self')
}