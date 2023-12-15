<!--分页显示博客-->
// 假设这是你的所有博客文章数据，每页显示3篇
const allBlogPosts = [
/* 博客文章数据 */
{
    title: "Best Way to Design",
    category: "Web Design",
    image: "img/blog/img-1.jpg",
    date: "August 15, 2018",
    src:"",
    // 其他属性
},
{
    title: "Things I Need to Get Started",
    category: "Personal",
    image: "img/blog/img-2.jpg",
    date: "August 10, 2018",
    content: "这篇博客的内容...",
    // 其他属性
},
    {},{},{},{},{},{},{},{},
];

// 定义当前页码和每页显示的数量
let currentPage = 1;
const postsPerPage = 6;

// 获取博客文章的容器
const blogContainer = document.getElementById('blog-posts');

// 根据页码显示对应的博客文章
function displayPosts() {
blogContainer.innerHTML = '';
const startIndex = (currentPage - 1) * postsPerPage;
const endIndex = startIndex + postsPerPage;
const currentPosts = allBlogPosts.slice(startIndex, endIndex);

currentPosts.forEach(post => {
// 创建博客文章的 HTML 结构并添加到容器中
const postHTML = `
      <div class="col-lg-4 col-sm-6">
          <a href="blogs/blog-dark.html" class="blog-item">
              <div class="blog-image">
                  <img src="img/blog/img-1.jpg" alt="#"></div>
              <div class="blog-content">
                  <span class="cat">Traveling</span>
                  <h4 class="blog-title">Top Beaches in the world</h4>
                  <div class="blog-date">June 24,2018</div></div>
          </a>
      </div>
    `;
    blogContainer.innerHTML += postHTML;
});
}

// 初始化页面时显示第一页的博客文章
displayPosts();

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

