const users = [
    {"username" : "admin", "password" : "admin"},
    {"username" : "username", "password" : "password"}
];
let timer = null;

$("form").submit(function(e){
    e.preventDefault();
})

$("form[name=login_form]").submit(function(){
    const username = $("#username").val();
    const password = $("#password").val();

    let message = ""; let type = "error";

    if(username == ""){
        message = "No username was provided";
    }else if(password == ""){
        message = "No password was provided";
    }else if(!checkUsername(username)){
        message = "Username provided is invalid";
    }else if(!checkPassword(username, password)){
        message = "Password is incorrect";
    }else{
        message = "Your login credentials are a match";
        type = "success";
    }

    showMessage(message, type);
})

$("form[name=signup_form]").submit(function(){
    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const password = $("#password").val();

    let type = "error";
    let message = "";

    if(fullname == ""){
        message = "Fullname was not provided";
    }else if(email == ""){
        message = "Email was not provided";
    }else if(password == ""){
        message = "Password was not provided";
    }else{
        message = "Your account was created successfully";
        type = "success";
    }

    showMessage(message, type);
})

function showMessage(message, type){
    $("#message").html(message)
    $("#form_box").removeClass("success error no_disp").addClass(type)

    clearTimeout(timer);

    timer = setTimeout(function(){
        $("#message").html("");
        $("#form_box").removeClass(type).addClass("no_disp");
    }, 3000)
}

function checkUsername(username) {
    // Check if the provided username exists in the users array
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());
    
    return user ? true : false;
}

function checkPassword(username, password) {
    // Find the user with the provided username
    const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());

    if (user) {
        // Check if the provided password matches the user's password
        return user.password === password;
    }

    // Username not found, so password check fails
    return false;
}