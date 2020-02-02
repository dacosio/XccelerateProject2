function init() {
    getAllFriends(1); //todo use url's id
}


function getAllFriends(id) {
    //console.log("getting list of friends");
    axios
        .get(`/api/friends/getAllFriends/${id}`)
        .then(function(response){
            var friends = response.data;

            if(friends && friends.length > 0){
                var all_friends = friends
                    .map(function(friend){
                        return {
                            user_id: (friend.user_1 == id)?  friend.user_2 : friend.user_1, 
                            name: (friend.user_1 == id)? friend.Friend2: friend.Friend1
                        }
                    });

                renderFriends(all_friends);
            }
        });
}
function renderFriends(friends) {
    $("#friendbody").html("");

var template = `<div class="d-flex justify-content-between align-items-center card-text">
        <div class="mr-2">
            <a href="#">
                <img class="rounded-circle" width="25" src="https://picsum.photos/50/50" alt="">
                #DATA#
            </a>
            <a id="unfriend" href="#">
                <i class="fas fa-user-slash"></i>
            </a>
        </div>
    </div>`;

    friends.forEach(function(friend) {

        var tmpl = template.replace("#DATA#", `<a href="/profile/${friend.user_id}">${friend.name}</a>`);
        $("#friendbody").append(tmpl);
    });
    
}
