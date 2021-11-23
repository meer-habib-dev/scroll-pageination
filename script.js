const postsContainer = document.getElementById('posts-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');

let limit = 5;
let page = 1;

// fetch post from API  
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

// show post to DOM     
async function showPost() {
    const post = await getPosts();

    post.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
             <div class="number">${post.id}</div>
            <div class="post-info">
               ${post.title? `<h2 class="post-title">${post.title.slice(0,20)}</h2>`: `${post.title}`} 
                <p class="post-body">${post.body}</p>
            </div>
        `;
        postsContainer.appendChild(postEl);
    })
};
function filterPost(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) !== -1 || body.indexOf(term) !== -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
            
        }
        
    })
}
showPost();

function showLoader() {
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');
        setTimeout(() => {
            page++;
            showPost();
        }, 300);
    }, 2000);
}

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoader();
    }
});
filter.addEventListener('input', filterPost);