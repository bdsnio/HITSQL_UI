//动态主页：
//加为好友：friendRequestReceiveList添加用户名、时间
//点赞：clickReceiveList添加用户名、时间
//评论：commentReceiveList添加用户名、时间、内容
//转发时，blogAllList添加新数组，数组元素：用户名为username、时间、内容
//显示博客：遍历blogAllList，读取用户名、时间、内容
//添加博客ID功能：添加好友状态、点赞状态、评论状态

//希望跳转出再回来后，保存好友、点赞、评论

//开始数据库相关：从SQL获取
var blogAllList = JSON.parse(localStorage.getItem('blogAll'));
var friendRequestSendReceiveList = JSON.parse(localStorage.getItem('friendRequestSendReceive'));
var clickReceiveList = JSON.parse(localStorage.getItem('clickReceive'));
var commentReceiveList = JSON.parse(localStorage.getItem('commentReceive'));
//结束数据库相关：从SQL获取
var username = localStorage.getItem('username');

window.onload = function() {
    //获取用户注册/登录时的用户名，显示为用户名+的空间
    document.getElementById('myspaceBtn').innerHTML = '<strong>' + username + '</strong> 的空间';

    //展示blogAllList所有博客内容
    for (var i = 0; i < blogAllList.length; i++) {
        var postUsername=blogAllList[i][0];
        var postTime=blogAllList[i][1];
        var postContent=blogAllList[i][2];
        var postBlogID=blogAllList[i][3];
        displayPost(postUsername,postTime,postContent,postBlogID);
    }
};

document.getElementById('publishBtn').addEventListener('click', function() {
    // 开始数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    localStorage.setItem('blogAll', JSON.stringify(blogAllList));
    localStorage.setItem('friendRequestSendReceive', JSON.stringify(friendRequestSendReceiveList));
    localStorage.setItem('clickReceive', JSON.stringify(clickReceiveList));
    localStorage.setItem('commentReceive', JSON.stringify(commentReceiveList));
    // 结束数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    window.location.href = 'publish.html';
});

document.getElementById('myspaceBtn').addEventListener('click', function() {
    // 开始数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    localStorage.setItem('blogAll', JSON.stringify(blogAllList));
    localStorage.setItem('friendRequestSendReceive', JSON.stringify(friendRequestSendReceiveList));
    localStorage.setItem('clickReceive', JSON.stringify(clickReceiveList));
    localStorage.setItem('commentReceive', JSON.stringify(commentReceiveList));
    // 结束数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    // alert(blogAllList);
    // alert(friendRequestSendReceiveList);
    //alert(clickReceiveList);
    // alert(commentReceiveList);
    window.location.href = 'myspace.html';
});

// 获取当前时间并格式化为"日期:小时:分钟"格式
function generateFormatTime(now){
    var formattedDate = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' +
                        now.getHours() + ':' +  now.getMinutes() + ':' + now.getSeconds();
    return  formattedDate
}

// 生成一个随机博客ID
function generateBlogID(now){
    var randomNumber = Math.floor(Math.random() * 1000000);
    var uniqueNumber = (Math.round(now) + randomNumber)%10000;
    return uniqueNumber;
}

// 创建图标按钮
function createIconButton(className, content) {
    var btn = document.createElement('button');
    btn.className = 'icon-btn ' + className;
    btn.textContent = content;
    return btn;
}

// 添加好友按钮点击事件
//如果已经在好友列表，则视为已点击
function FriendButtonClick(event) {
    var friendBtn = event.target; // 获取点击的按钮元素

    // 检查按钮是否已经被点击过
    if (friendBtn.innerHTML === '加为好友') {
        // 改变按钮文本为“已成为好友”
        friendBtn.innerHTML = '已成为好友';

        // 修改按钮样式为浅蓝色背景
        friendBtn.style.backgroundColor = '#f0f0f0'; // 浅蓝色背景
        friendBtn.style.color = '#333'; // 黑色文字，可以按需调整颜色
        friendBtn.style.fontWeight = 'normal'; // 字体改为非加粗

        var formattedDate = generateFormatTime(new Date());

        // 获取按钮的父元素，即.post-header元素
        var postHeader = this.closest('.post-header');
        // 在.post-header元素中获取.post-username元素
        var postUsername = postHeader.querySelector('.post-username').textContent;

        var friendRequestList_new=[postUsername,formattedDate,username];
        friendRequestSendReceiveList.push(friendRequestList_new);
    } 
    else {
        alert('已经是好友关系');
    }
}

// 点赞按钮点击事件
function LikeButtonClick(event) {
    
    // 获取按钮的父元素，即.post元素
    var postcloset = this.closest('.post');

    // 获取blogID
    var blogID = postcloset.id;
    var postUsername=postcloset.querySelector('.post-username');
    var clickList_new=[postUsername,username,blogID];
    
    // 检查是否已经点赞
    var isLiked = this.getAttribute('data-liked') === 'true'; 
    // 根据当前状态执行操作
    if (isLiked) {
        // 如果已经点赞，取消点赞
        this.style.backgroundColor = 'white'; // 恢复背景色为白色
        this.setAttribute('data-liked', 'false'); // 更新点赞状态

        // 更新clickReceiveList：定位+删除
        var deleteIndex = clickReceiveList.indexOf(clickList_new);
        clickReceiveList.splice(deleteIndex,1);

    } else {
        // 如果未点赞，执行点赞操作
        this.style.backgroundColor = '#4a77d4'; // 设置背景色为浅蓝色
        this.setAttribute('data-liked', 'true'); // 更新点赞状态
        
        clickReceiveList.push(clickList_new);
    }
}

//转发按钮点击事件
function ShareButtonClick(event){
    var formattedDate = generateFormatTime(new Date());

    var postChosen = this.closest('.post');
    var postContent = postChosen.querySelector('.post-content').textContent;
    var postBlogID = generateBlogID(Date.now());

    var myShareNewBlog=[username,formattedDate,postContent];        
    blogAllList.push(myShareNewBlog);

    displayPost(username,formattedDate,postContent,postBlogID);
}

//删除按钮点击事件
function DeleteButtonClick(event){
    // 使用event.target确保能正确获取点击的按钮
    var deleteBtn = event.target;

    // 查找评论按钮所在的.post元素
    var post_to_delete = deleteBtn.closest('.post');
   
    var postusername_to_delete=post_to_delete.querySelector('.post-username').textContent;
    var posttime_to_delete=post_to_delete.querySelector('.post-time').textContent;
    var content_to_delete=post_to_delete.querySelector('.post-content').textContent;
    var blogListDeleting=[postusername_to_delete,posttime_to_delete,content_to_delete];

    post_to_delete.remove();

    // 更新blogAllList：定位+删除
    var deleteIndex = blogAllList.indexOf(blogListDeleting);
    blogAllList.splice(deleteIndex,1);
}

// 评论按钮点击事件
function CommentButtonClick(event) {
    // 查找评论按钮所在的.post元素
    var postclosest = this.closest('.post');
    //所在的评论区
    var commentsSectionChosen = postclosest.querySelector('.comments-section');

    var commentText = prompt('请输入你的评论：', '');
    if (commentText === null) {        
        return;// 用户点击了取消，直接退出函数
    } 
    // 检查评论是否为空或只包含空白字符
    else if (commentText.trim()) {      
        // 在.pos元素中获取.post-username元素
        var postUsername = postclosest.querySelector('.post-username').textContent;
        //获取点击时的格式化时间
        var formattedDate = generateFormatTime(new Date());
        //初始化新的评论数组
        var commentList_new=[postUsername,formattedDate,commentText,username];

        commentReceiveList.push(commentList_new);

        // 将评论显示在页面上
        displayComment(username, commentText, commentsSectionChosen);
    } 
    else {
        // 用户没有输入任何内容，弹出提示
        alert('评论不能为空！');
    }

}

// 显示评论内容的函数
function displayComment(commentPostusername, commentText, commentsSectionChosen) {
    var newCommentElement = document.createElement('div');
    
    // 创建用户名和评论内容的元素结构
    var userElement = document.createElement('span');
    userElement.textContent = commentPostusername;
    userElement.style.color = 'blue'; // 设置用户名颜色为蓝色
    userElement.style.fontWeight = 'bold'; // 设置用户名为加粗

    var commentElement = document.createElement('span');
    commentElement.textContent = " :   " + commentText;
    commentElement.style.color = 'black'; // 设置评论内容颜色为黑色

    // 将用户名和评论内容添加到新评论元素中
    newCommentElement.appendChild(userElement);
    newCommentElement.appendChild(commentElement);
    
    // 将新评论元素添加到评论区域
    commentsSectionChosen.appendChild(newCommentElement); 
}

// 展示单条博客的函数
function displayPost(postUsername, postTime, postContent, postBlogID) {
    // 创建新的post元素
    var newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.id = postBlogID; // 用时间戳作为ID

    // 创建post-header元素及其子元素
    var postHeader = document.createElement('div');
    postHeader.className = 'post-header';
    var postUsernameSpan = document.createElement('span');
    postUsernameSpan.className = 'post-username';
    postUsernameSpan.textContent = postUsername;
    var friendBtn = document.createElement('button');
    friendBtn.className = 'friend-btn';
    friendBtn.textContent = '加为好友';
    friendBtn.addEventListener('click', FriendButtonClick);
    postHeader.appendChild(postUsernameSpan);
    if(postUsername != username) postHeader.appendChild(friendBtn); 
    newPost.appendChild(postHeader);

    // 创建post-body和post-content元素
    var postBody = document.createElement('div');
    postBody.className = 'post-body';
    var postContentDiv = document.createElement('div');
    postContentDiv.className = 'post-content';
    postContentDiv.textContent = postContent;
    postBody.appendChild(postContentDiv);
    newPost.appendChild(postBody);

    // 创建post-footer元素及其子元素
    var postFooter = document.createElement('div');
    postFooter.className = 'post-footer';
    var postTimeSpan = document.createElement('span');
    postTimeSpan.className = 'post-time';
    postTimeSpan.textContent = '发布于 ' + postTime; 
    postFooter.appendChild(postTimeSpan);

    // 添加图标按钮，并添加点击事件
    var likeBtn = createIconButton('like-btn', '👍');
    var clickList_new=[postUsername,username,postBlogID];
    //如果点赞列表中已有这个点赞向量
    var isClicked = clickReceiveList.some(function(subArray) {
        return subArray.every(function(element, index) {
            return element === clickList_new[index];
        });
    });
    if(isClicked){
        likeBtn.style.backgroundColor = '#4a77d4'; // 设置背景色为浅蓝色
        likeBtn.setAttribute('data-liked', 'true'); // 更新点赞状态
    }else{
        likeBtn.style.backgroundColor = 'white'; // 恢复背景色为白色
        likeBtn.setAttribute('data-liked', 'false'); // 更新点赞状态
    }
    likeBtn.addEventListener('click', LikeButtonClick);
    postFooter.appendChild(likeBtn);

    var commentBtn = createIconButton('comment-btn', '💬');
    var shareBtn = createIconButton('share-btn', '🔄');
    var deleteBtn = createIconButton('delete-btn', '🗑️');
    
    commentBtn.addEventListener('click', CommentButtonClick);
    shareBtn.addEventListener('click', ShareButtonClick);
    deleteBtn.addEventListener('click', DeleteButtonClick);

    
    postFooter.appendChild(commentBtn);   
    if(postUsername == username) postFooter.appendChild(deleteBtn);
    else postFooter.appendChild(shareBtn);

    newPost.appendChild(postFooter);

    // 创建评论区
    var commentsSection = document.createElement('div');
    commentsSection.className = 'comments-section';
    var commentsHeader = document.createElement('h3');
    commentsHeader.textContent = '评论区：';
    var commentsContent = document.createElement('div');
    commentsContent.className = 'comments-content';
    commentsSection.appendChild(commentsHeader);
    commentsSection.appendChild(commentsContent);
    newPost.appendChild(commentsSection);

    // 找到.main-content元素
    var mainContent = document.querySelector('.main-content');
    // 将新创建的post元素添加到.main-content中
    mainContent.appendChild(newPost);
}

