const postsContainer = document.querySelector('#postsContainer');
const baseUrl = 'http://localhost:1337/api/';
const postTitle = document.querySelector('#post_title');
const postSlug = document.querySelector('#post_slug');
let  converter = new showdown.Converter();


async function getPosts() {
  let posts =  await fetch('http://localhost:1337/api/posts?populate=*')
    .then(response => response.json())
    loadPage(posts.data);
}


function loadPage(posts) {
    let md = post.attributes.content
    let html = converter.makeHtml(md);
    posts.forEach(post => {
        postsContainer.innerHTML += `<div class="post-preview">
        <a href="#/posts/${post.id}">
            <h2 class="post-title">${post.attributes.title}</h2>
            <h3 class="post-subtitle">${html}</h3>
        </a>
        <p class="post-meta">
            Posted by
            <a href="#!">${post.attributes.user.data.attributes.username}</a>
            on ${post.attributes.updatedAt.substr(0,10)} 
        </p>
    </div>
   
    <hr class="my-4" />`;
    });
    window.addEventListener('hashchange', () => {
        let url =location.hash.substr(2);
        if (url ===''){

        } else{
            fetch(baseUrl + url)
            .then(response => response.json())
            .then(result => {
                postsContainer.innerHTML = `
                <article class="mb-4">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            ${result.data.attributes.content}
                        </div>
                    </div>
                </div>
            </article>`;
       
            postTitle.textContent = result.data.attributes.title
            postSlug.textContent = result.data.attributes.slug
        })
    }
    })
}



getPosts();