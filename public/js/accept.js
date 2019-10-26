$('#newUser').submit((list)=>{
    list.preventDefault()
    let signup = $('#newName').val();
    let pass = $('#newPass').val();
    let passTwo = $('#newPassword').val();
    
    $.ajax({url: 'http://localhost:3000/accountUsers', method: 'post', data: {signup,pass}
}).done((list)=>{
    if (pass === passTwo) {
window.location="signin.html";
alert("Registration Completed");
    } else {
        alert("Password Mismatch");
    };
    });
})

$('#loginUser').submit((list)=>{
    list.preventDefault()
    let email = $('#inUser').val();
    let passkey = $('#inPass').val();
    
    $.ajax({url: 'http://localhost:3000/accountUsers', method: 'get', data: {email,passkey}
}).done((list)=>{
    for (let i = 0; i <list.length; i++) {
        if (list[i].signup === email && list[i].pass === passkey) {
            localStorage.setItem("inUser","inPass")  
            window.location="user.html"
            alert("Login Successful");    
        }

    }
    })
})

$('#logout').on('click',function (){
    window.location="signin.html"
    localStorage.clear();
    
    alert("Logged Out"); 
})

//-----------------------comment----------------------
$('#newAdmin').submit((list)=>{
    list.preventDefault()
    let asign = $('#newAdminName').val();
    let apass = $('#newAdminPass').val();
    
    $.ajax({url: 'http://localhost:3000/accountAdmin', method: 'post', data: {asign,apass}
}).done((list)=>{
        window.location="signin.html";
        alert("Registration Completed");
    });
})

$('#loginAdmin').submit((list)=>{
    list.preventDefault()
    let aduser = $('#adminUser').val();
    let adpass = $('#adminPass').val();
    
    $.ajax({url: 'http://localhost:3000/accountAdmin', method: 'get', data: {aduser,adpass}
}).done((list)=>{
    for (let i = 0; i <list.length; i++) {
        if (list[i].asign === aduser && list[i].apass === adpass) {
            localStorage.setItem("adminUser","adminPass")  
            window.location="adminHome.html";
            alert("Login Successful");    
        }

    }
    })
})

$('#logout').on('click',function (){
    window.location="index.html"
    localStorage.clear();
    
    alert("Logged Out"); 
})

