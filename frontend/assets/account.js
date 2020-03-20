const signin = (googleUser) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/verify');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('id_token=' + googleUser.getAuthResponse().id_token);

    const profile = googleUser.getBasicProfile();
    localStorage.setItem('name', profile.getName());
    localStorage.setItem('email', profile.getEmail());

    // TODO: Implement backend
    setUserInfo();
    navigateTo('home');
}

function signOut() {
    localStorage.clear();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        navigateTo('login')
    });
}

const setUserInfo = () => {
    document.querySelectorAll('.name.first').forEach(el => el.innerText = localStorage.getItem('name').split(" ")[0])
}