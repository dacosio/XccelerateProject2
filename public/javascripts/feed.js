//POSTS

function generatePost(post) {
    var created_at = moment(new Date(post.created_at));
    return `<div class="card gedf-card">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="mr-2">
                        <img class="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="">
                    </div>
                    <div class="ml-2">
                        <div class="h5 m-0">@${post.firstname1 + ' ' + post.lastname1} --> @${post.firstname2 + ' ' + post.lastname2}</div>
                </div>
            <div>

            </div>
        </div>

        </div>
        <div class="card-body">
            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>&nbsp;${created_at.fromNow()}</div>

            <p class="card-text">${post.description}</p>
        </div>
        <div class="card-footer">
            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
            
            <div id="newComments">
            <br><input type="button" value="Comment" onclick="newComment()"><br><a id="newComment"></a>
            </div>

            <!-- <a id="comments" href="#" class="card-link"><i class="fa fa-comment" onclick="newPoint()"></i> Comment</a>-->
        </div>
    </div>`;
}

function getPosts() {
    axios
        .get('/api/posts/getFormatted')
        .then(function (result) {
            renderPosts(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderPosts(posts) {
    if (!posts || posts.length < 1)
        return;

    //clear posts
    $("#feeds").html("");
    posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
    posts.forEach(function (post) {
        $("#feeds").append(generatePost(post));
    });
}

function createPost() {
    //todo replace created_by and posted_to
    var post = {
        description: $("#message").val().trim(),
        posted_to: $("#posted_to").val()
    };

    axios.post('/api/posts', post)
        .then(function (response) {
            window.location.reload();
            //getPosts();
            $("#message").val("");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function updatePost() {
    var post = {
        description: $("#message").val().trim(),
        created_by: req.params.id,
        posted_to: 2
    };

    axios.patch('/api/posts/getFormatted',post)
        .then(function (response) {
            console.log(response);
            
        })
        .catch(function (error) {
            console.log(error);
        });
}



//Comments
function getComments(post_id) {
    axios
        .get('/api/posts/'+post_id+'/comments')
        .then(function (result) {
            renderComments(post_id, result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderComments(post_id, comments) {
    if (!comments || comments.length < 1)
        return;

    //clear comments
    $("#comments_"+post_id).html("<ul></ul>");
    comments.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.created_at) - new Date(a.created_at);
    });
    comments.forEach(function (comment) {
        var created_at = moment(new Date(comment.created_at))
        $("#comments_"+post_id).append(`<li>${comment.description}, <small>${created_at.fromNow()}</small></li>`);
    });
}

function saveComment(post_id) {
    var comment = {
        description: $("#post_"+post_id).val().trim(),
        post_id: post_id
    };

    axios.post('/api/comments', comment)
        .then(function (response) {
            getComments(post_id);
            $("#post_"+post_id).val("");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function viewComments(post_id){
    $('#newComment_'+post_id).show();
    $("#view_comments_"+post_id).hide();
    getComments(post_id);
}


//LIKES
function getLikes(post_id) {
    axios
        .get('/api/likes/getAllLikesForPost/'+post_id)
        .then(res => {
             $("#post_"+post_id+"_likes").text(res.data.length);
        });
}

function like(post_id) {
    $("#like_unlike_"+post_id).attr("onclick","unlike("+post_id+")");
    axios
        .post('/api/likes', {
            post_id: post_id
        })
        .then(res=> getLikes(post_id));
}

function unlike(post_id) {
    $("#like_unlike_"+post_id).attr("onclick","like("+post_id+")");
    axios
        .post('/api/likes/delete', {
            post_id: post_id
        })
        .then(res => getLikes(post_id));
}