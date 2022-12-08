const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const confirm_password_input = document.getElementById("confirm_password_input");
const signup_form = document.getElementById("signup_form");
const error_message = document.querySelectorAll(".error_message");

signup_form.addEventListener("submit", (event) => {
	event.preventDefault();
    error_message[0].classList.add("show_error");
    let falsy = 0;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value)){
        error_message[0].classList.add("show_error");
		email_input.classList.add("show_error_color");
        falsy+=1;
    }
    else {
        error_message[0].classList.remove("show_error");
		email_input.classList.remove("show_error_color");
    }

    if (!event.target.password.value || event.target.password.value.length <= 8) {
        error_message[1].classList.add("show_error");
		password_input.classList.add("show_error_color");
        falsy+=1;
    }
    else {
        error_message[1].classList.remove("show_error");
		password_input.classList.remove("show_error_color");
    }

    if (!event.target.confirm_password.value ||event.target.password.value !== event.target.confirm_password.value) {
        error_message[2].classList.add("show_error");
		confirm_password_input.classList.add("show_error_color");
        falsy+=1;
    }
    else {
        error_message[2].classList.remove("show_error");
		confirm_password_input.classList.remove("show_error_color");
    }

    if (falsy === 0) {
        window.location.href = "./wall.html";
    }
});