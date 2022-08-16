// const
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// fetch ap 用到的參數
let limit = 6;
let page = 1;

// function
// fetch post from api
async function getPosts(){
    const respond = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await respond.json();

    return data;
}

// 顯示post 在dom
async function showPosts(){
    // 取得了post 
    const posts = await getPosts();

    // 將post 轉成 html格式
    posts.forEach(post =>{
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = 
        `<div class="number">${post.id}</div>
            <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
         </div>`;

        postsContainer.appendChild(postEl);     
    });

}

// 顯示loader 和 fetch 更多的Post
function showLoading(){
    // loading ... 顯示出來 3秒後關閉
    loading.classList.add('show');
    
    setTimeout(() => {
    loading.classList.remove('show') }, 300);
    
    // fetch 更多的Post
    setTimeout(() => {
      page++;
      showPosts();
    }, 100);
 
}



// 檢查是否要load ... 和抓取post
function checkLoad(){
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight -6) {
      showLoading();
    }
}

// filter posts by input
function filterPosts(e) {
    // 抓取輸入的內容
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
       
        // 如果真的有就顯示，如果沒有不顯示
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex';    
        } else {
            post.style.display = 'none';
        }
    
    })
}



// eventlistner 
window.addEventListener('scroll' , checkLoad);

// 初始化
// 一載入就顯示post
showPosts();

// 搜尋
filter.addEventListener('input', filterPosts);