const handelDeletePost = function (postId) {
    // render confirm box
    let messageBox = document.querySelector(`#messageBox`);
    messageBox.classList.remove("d-none");
    if(!messageBox.innerHTML) {
        messageBox.innerHTML +=
                `<span class="mb-3">Are you sure to delete this article?</span> 
                <div> 
                    <button onclick="deletePost(${postId})" type="button" class="btn btn-danger">Delete</button> 
                    <button onclick="removeMessageBox()" type="button" class="btn btn-secondary">Cancel</button>
                </div>`;
    }
}

const deletePost = async function (postId) {
    // fetch delete post api
    let apiURL = `/api/article/delete`;
    await (
        fetch(apiURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId : parseInt(getCookie('SessionUserID'),10),
                articleId : postId
            })
        })
            .then(data => data.json())
            .then(res => console.log(res))
    )
    removeMessageBox();
    deletePostInUI(postId)
}

const removeMessageBox = function () {
    let messageBox = document.querySelector(`#messageBox`);
    messageBox.innerHTML = "";
    messageBox.classList.add("d-none");
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

const deletePostInUI = function (postId) {
    document.querySelector(`#post${postId}`).remove();
}