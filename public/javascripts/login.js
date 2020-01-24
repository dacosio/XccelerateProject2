$(()=> {
    $("#login").submit((event)=>{
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        
        const user = {
            email,
            password
        };

        login(user)
            .then((result) => {
                console.log(result);
                
            }).catch((err) => {
                console.error(error)
                const $errorMessage = $('#errorMessage');
                $errorMessage.text(error.responseJSON.message);
                $errorMessage.show();
                
            });
    })    
})


function login(user){
    return $.post('localhost:5000/auth/login', user)
}