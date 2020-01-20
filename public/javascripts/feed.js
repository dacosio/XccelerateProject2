function init() {
    getPosts();
}

function getPosts() {
    axios
        .get('/api/posts/getFormatted')
        .then(function(result) {
            console.log(result);
            renderPosts(result.data);
        })
        .catch(function(error){
            console.log(error);
        });
}

function renderPosts(posts) {
    if(!posts || posts.length < 1)
        return;

    //clear posts
    
    $("#feeds").html("");
    posts.forEach(function(post){
        $("#feeds").append(generatePost(post));
    });
}

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
                        <div class="h5 m-0">@{{user_name}}</div>
                        <div class="h7 text-muted">${post.created_by}</div>
                    </div>
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
            <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
        </div>
    </div>`;
}