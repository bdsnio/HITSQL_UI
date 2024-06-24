//发布界面：
//类似于转发
//blogAllList添加新数组，数组元素：用户名为username、时间为按下发布按钮的时间、内容

//开始数据库相关：从SQL获取一维数组blogAllList，用于管理员界面的表格信息填写
var blogAllList = JSON.parse(localStorage.getItem('blogAll'));
//结束数据库相关：从SQL获取一维数组blogAllList，用于管理员界面的表格信息填写

// 左侧按钮点击事件
document.getElementById('page3Btn').addEventListener('click', function() {
    var postContent = document.getElementById('postContent').value;
    if (postContent.trim() != '') {
        alert("内容未发表，离开后不会保存");
    }    
    window.location.href = 'myspace.html';
});

document.getElementById('homeBtn').addEventListener('click', function() {
    var postContent = document.getElementById('postContent').value;
    if (postContent.trim() != '') {
        alert("内容未发表，离开后不会保存");
    }
    window.location.href = 'home.html'; // 确保这是主页的正确URL
});

// 发布按钮点击事件
document.getElementById('publishBtn').addEventListener('click', function() {
    //获取前端填写的博客内容
    var postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') {
        alert('发布内容不能为空！');
        return;
    }
    // 获取当前时间并格式化
    var now = new Date();
    var formattedDate = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' +
                        now.getHours() + ':' +  now.getMinutes() + ':' + now.getSeconds();
                       
                        
    var username = localStorage.getItem('username');
    var myNewBlog=[username,formattedDate,postContent];                  
    blogAllList.push(myNewBlog);

    // 开始数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    localStorage.setItem('blogAll', JSON.stringify(blogAllList));
    // 结束数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL

    localStorage.setItem('myPostTime', formattedDate);
    localStorage.setItem('myPostContent', postContent);

    window.location.href = 'home.html';
});