<!--分页显示博客-->
// 定义一个空的 allBlogPosts 数组用于存储博客文章数据
let allBlogPosts = [];
// 定义当前页码和每页显示的数量
let currentPage = 1;
const postsPerPage = 6;

// 获取博客文章的容器
const blogContainer = document.getElementById('blog-posts');

// 根据页码显示对应的博客文章
function displayPosts() {
    blogContainer.innerHTML = '';
    console.log(2);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = allBlogPosts.slice(startIndex, endIndex);
    console.log("当前页面博客："+currentPosts);
    currentPosts.forEach(post => {
    // 创建博客文章的 HTML 结构并添加到容器中
    const postHTML = `
          <div class="col-lg-4 col-sm-6">
    <!--          <a href="blogs/blog-dark.html" class="blog-item">-->
              <a href="#blog-content" class="blog-item" onclick="qiehuan('${post.content}','${post.note}','${post.image}','${post.category}','${post.title}','${post.date}')">
                  <div class="blog-image">
                      <img src="${post.image}" alt="#"></div>
                  <div class="blog-content">
                      <span class="cat">${post.category}</span>
                      <h4 class="blog-title">${post.title}</h4>
                      <div class="blog-date">${post.date}</div></div>
              </a>
          </div>
        `;
        blogContainer.innerHTML += postHTML;
    });
}

// 使用 fetch 方法获取 blogData.json 文件数据
fetch('../blogs/blogsData.json')
    .then(response => response.json())
    .then(data => {
        // 将获取的数据存储到 allBlogPosts 中
        allBlogPosts = data;
        // 在这里可以使用 allBlogPosts 变量来操作博客文章数据
        console.log(allBlogPosts); // 示例方式显示获取到的数据
        // 初始化页面时显示第一页的博客文章
        displayPosts();
    })
    .catch(error => console.error('Error fetching blog data:', error));


// 点击下一页按钮
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    displayPosts();
});

// 点击上一页按钮
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPosts();
    }
});

