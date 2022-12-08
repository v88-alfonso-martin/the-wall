/* Modal elements */
const create_message_modal = document.querySelector(".create_message_modal");
const create_message_form = document.getElementById("create_message_form");
const delete_message_modal = document.querySelector(".delete_message_modal");
const delete_comment_modal = document.querySelector(".delete_comment_modal");
const create_message_btn = document.getElementById("create_message_button");
const [create_message_cancel_btn, delete_message_cancel_btn, delete_comment_cancel_btn] = document.querySelectorAll(".cancel_button");
const [create_message_close_btn, delete_message_close_btn, delete_comment_close_btn] = document.querySelectorAll(".close_button");
const [create_message_success_btn, delete_message_success_btn, delete_comment_success_btn, c] = document.querySelectorAll(".success_button");

/* Messages elements */
const messages_container = document.getElementById("messages_container");
const message_container = document.getElementById("message_container");
const no_messages = document.querySelector(".no_messages");
const messages_length = document.getElementById("messages_length");
const delete_message_form = document.getElementById("delete_message_form");
const delete_comment_form = document.getElementById("delete_comment_form");

let current_post_comments_container;
let current_comment_length;
let delete_message_container;
let delete_comment_container;

/* Switch modal shown or hidden */
let toggleModal = (event) => {
    event.stopPropagation();
    let element = event.target;
    if (element === create_message_modal 
        || element === create_message_btn 
        || element === create_message_cancel_btn
        || element === create_message_close_btn
    ) {
        create_message_modal.classList.toggle("show_modal");
        create_message_success_btn.disabled = true;
        create_message_success_btn.classList.add("disabled_button");
        create_message_form.reset();
    }
    else if (element === delete_message_modal
        || element === delete_message_cancel_btn
        || element === delete_message_close_btn
        || element === delete_message_success_btn    
    ) {
        delete_message_modal.classList.toggle("show_modal");
    } 
    else if (element === delete_comment_modal
        || element === delete_comment_cancel_btn
        || element === delete_comment_close_btn
        || element === delete_comment_success_btn     
    ) {
        delete_comment_modal.classList.toggle("show_modal");
    } 
};

/* Create message modal functionalities */
create_message_btn.addEventListener("click", toggleModal);
create_message_close_btn.addEventListener("click", toggleModal);
create_message_cancel_btn.addEventListener("click", toggleModal);
create_message_close_btn.addEventListener("click", toggleModal);
create_message_close_btn.addEventListener("click", toggleModal);
/* Toggle when clicked outside the modal */
window.addEventListener("click", toggleModal);

/* Modal create message form functionalities */
create_message_form.addEventListener("keyup", (event) => {
    /* Disable button if textarea is empty  */
    if(!event.target.value) {
        create_message_success_btn.disabled = true;
        create_message_success_btn.classList.add("disabled_button");
    } 
    else {
        create_message_success_btn.disabled = false;
        create_message_success_btn.classList.remove("disabled_button");
    }
})

/* Submit the message */
let submitMessage = (event) => {
    event.preventDefault();

    /* Place post in the wall */
    const cloned_message_container = message_container.cloneNode(true);
    cloned_message_container.removeAttribute("id");
    messages_container.prepend(cloned_message_container);
    cloned_message_container.children[0].post.value = event.target.message.value;
    no_messages.classList.add("hide_no_messages");
    messages_length.innerHTML = messages_container.childElementCount; 

    /* Hide modal after posting message */
    create_message_modal.classList.toggle("show_modal");
    create_message_success_btn.disabled = true;
    create_message_success_btn.classList.add("disabled_button");
    create_message_form.reset();

    /* Comment message action */
    const comment_action = document.querySelector(".comment_action");
    const comments_container = document.querySelector(".comments_container");
    const post_comment_form = document.querySelector(".post_comment_form");
    const comment_button = document.querySelector(".comment_button");
    const post_comments_container = document.querySelector(".post_comments_container");
    const post_comment_container = document.getElementById("post_comment_container")
    const comment_length = document.querySelector(".comment_length");

    /* Show comment form and comments */
    comment_action.addEventListener("click", function () {
        comments_container.classList.toggle("hide_comments_container");
        post_comments_container.classList.toggle("hide_comments_container");
        comment_action.classList.toggle("clicked");
        const img_src = comment_action.children[0].getAttribute("src");
        if(img_src === "../assets/images/messages-bubble-square-text.png"){
            comment_action.children[0].setAttribute("src", "../assets/images/messages-bubble-square-text-blue.png")
        }
        else {
            comment_action.children[0].setAttribute("src", "../assets/images/messages-bubble-square-text.png")
        }
    });

    /* Check textarea when editing if valid */
    post_comment_form.addEventListener("keyup", function (event) {
        /* Disable button if textarea is empty  */
        if(!event.target.value) {
            comment_button.disabled = true;
            comment_button.classList.add("disabled_button");
        } 
        else {
            comment_button.disabled = false;
            comment_button.classList.remove("disabled_button");
        }
    });

    /* Post a comment and predend in the wall */
    post_comment_form.addEventListener("submit", function(event) {
        event.preventDefault();
        let cloned_post_comment_container = post_comment_container.cloneNode(true);
        cloned_post_comment_container.removeAttribute("id");
        post_comments_container.prepend(cloned_post_comment_container);
        cloned_post_comment_container.children[0].post_comment.value = event.target.comment.value;
        comment_length.innerHTML = `${post_comments_container.childElementCount} Comment`; 
        post_comment_form.reset();
        comment_button.disabled = true;
        comment_button.classList.add("disabled_button");

        /* Delete comment actions */
        const delete_comment_action = document.querySelector(".delete_action_comment");

        delete_comment_action.addEventListener("click", function () {
            delete_comment_container = this.parentNode.parentNode.parentNode.parentNode;
            delete_comment_modal.classList.toggle("show_modal");  
            current_post_comments_container =  post_comments_container.childElementCount;
            current_comment_length = comment_length;
        });

        /* Edit comment actions */
        const edit_action_comment = document.querySelector(".edit_action_comment");
        const comment_cancel_button = document.querySelector(".comment_cancel_button");
        const edit_comment_form = document.querySelector(".edit_comment_form");
        const comment_edit_button = document.querySelector(".comment_edit_button");
        
        /* Edit comment */
        edit_action_comment.addEventListener("click", function () {
            const textarea_comment = this.parentNode.parentNode.previousElementSibling;
            textarea_comment.classList.add("textarea_edit");
            const comment_actions = this.parentNode;
            comment_actions.classList.add("hide_message_actions");
            textarea_comment.removeAttribute("disabled");
            textarea_comment.setAttribute("data-old-message", textarea_comment.value)
            this.parentNode.nextElementSibling.classList.remove("hide_buttons_container");
        })


        /* Cancel editing comment */
        comment_cancel_button.addEventListener("click", function () {
            const textarea_comment = this.parentNode.parentNode.previousElementSibling;
            textarea_comment.classList.remove("textarea_edit");
            const comment_actions = this.parentNode.previousElementSibling;
            comment_actions.classList.remove("hide_message_actions");
            this.parentNode.classList.add("hide_buttons_container");
            textarea_comment.setAttribute("disabled", "");
            const currentMessage = textarea_comment.getAttribute("data-old-message")
            textarea_comment.value = currentMessage;
        })

        /* Check textarea when editing comment if valid */
        edit_comment_form.addEventListener("keyup", function (event) {
            /* Disable button if textarea is empty  */
            if(!event.target.value) {
                comment_edit_button.disabled = true;
                comment_edit_button.classList.add("disabled_button");
            } 
            else {
                comment_edit_button.disabled = false;
                comment_edit_button.classList.remove("disabled_button");
            }
        });
    });

    /* Edit message action */
    const edit_action = document.querySelector(".edit_action");
    const buttons_container = document.querySelector(".buttons_container");
    const edit_cancel_button = document.querySelector(".cancel_button");
    const edit_button = document.querySelector(".edit_button");
    const edit_message_form = document.querySelector(".edit_message_form");

    /* Edit message */
    edit_action.addEventListener("click", function () {
        const textarea_post = this.parentNode.parentNode.previousElementSibling;
        textarea_post.classList.add("textarea_edit");
        const message_actions = this.parentNode;
        message_actions.classList.add("hide_message_actions");
        buttons_container.classList.remove("hide_buttons_container");
        textarea_post.removeAttribute("disabled");
        textarea_post.setAttribute("data-old-message", textarea_post.value)
    });

    /* Cancel editing message */
    edit_cancel_button.addEventListener("click", function () {
        const textarea_post = this.parentNode.parentNode.previousElementSibling;
        textarea_post.classList.remove("textarea_edit");
        const message_actions = this.parentNode.previousElementSibling;
        message_actions.classList.remove("hide_message_actions");
        buttons_container.classList.add("hide_buttons_container");
        textarea_post.setAttribute("disabled", "");
        const currentMessage = textarea_post.getAttribute("data-old-message")
        textarea_post.value = currentMessage;
    });

    /* Check textarea when editing if valid */
    edit_message_form.addEventListener("keyup", function (event) {
         /* Disable button if textarea is empty  */
         
        if(!event.target.value) {
            edit_button.disabled = true;
            edit_button.classList.add("disabled_button");
        } 
        else {
            edit_button.disabled = false;
            edit_button.classList.remove("disabled_button");
        }
    });

    /* Submit edited message */
    edit_message_form.addEventListener("submit", function (event) {
        event.preventDefault();
        const textarea_post = this.firstElementChild;
        textarea_post.classList.remove("textarea_edit");
        const message_actions = this.children[1].children[0];
        message_actions.classList.remove("hide_message_actions");
        buttons_container.classList.add("hide_buttons_container");
        textarea_post.setAttribute("disabled", "");
    });

    /* Delete message action */
    const delete_action = document.querySelector(".delete_action");

    /* Show delete modal */
    delete_action.addEventListener("click", function () {
        delete_message_container = this.parentNode.parentNode.parentNode.parentNode;
        delete_message_modal.classList.toggle("show_modal");        
    });
}

create_message_form.addEventListener("submit", submitMessage);

/* Delete a message */
delete_message_form.addEventListener("submit", (event) => {
    event.preventDefault();
    delete_message_container.remove();
    messages_length.innerHTML = messages_container.childElementCount; 
    toggleModal(event);
});

/* Delete a comment */
delete_comment_form.addEventListener("submit", (event) => {
    event.preventDefault();
    delete_comment_container.remove();
    current_comment_length.innerHTML = current_post_comments_container - 1 + " Comment"; 
    toggleModal(event);
});