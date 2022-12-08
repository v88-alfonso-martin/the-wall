const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_form = document.getElementById("login_form");
const error_message = document.querySelectorAll(".error_message");

login_form.addEventListener("submit", (event) => {

	event.preventDefault();
	if (event.target.email.value === "test@test.com" 
    && event.target.password.value === "password"
    ) {
		window.location.href = "./wall.html";
	} 
    else {
        error_message[0].classList.add("show_error");
		email_input.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
        error_message[1].classList.add("show_error");
		password_input.style.backgroundColor = "rgba(225, 85, 76, 0.08)";
	}
});