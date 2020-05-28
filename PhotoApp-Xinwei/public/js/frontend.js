function logoutClick(event){
    var fetchOption = {
        method: "POST",
        body: '',
        headers: {
            'Content-type': 'appilcation/json'
        }
    }
    let fetchURL = '/users/logout';
    fetch(fetchURL, fetchOption, {mode: 'cors'})
        .then((data) => {
            console.log(data);
            let logButton = document.getElementById('loginBotton');
            logButton.innerHTML = "Log in";
            logButton.setAttribute('href', '/login');
            logButton.onclick = null;
        }).catch((err) => location.reload());
}


if(document.cookie.includes('csid')){
    console.log('user is logged in');
    let logButton = document.getElementById('loginBotton');
    logButton.innerHTML = "Log out";
    logButton.removeAttribute('href');
    logButton.onclick = logoutClick;

}else{
    let logButton = document.getElementById('loginBotton');
    logButton.innerHTML = "Log in";
    logButton.setAttribute('href', '/login');
}