//数据库存储信息
//用户ID由本JS生成，数据库只负责存储已有ID

//开始数据库相关：存储现有用户信息

//用户信息：用户名、用户ID（0-10000）、禁言状态（正常 or 禁言）、密码
localStorage.removeItem('userExisted');//清空
var userList1=["aaa",9001,"正常","passwd"];
var userList2=["bbb",9002,"禁言","passwd"];
var userList3=["ccc",9003,"正常","passwd"];
var userList4=["ddd",9004,"正常","passwd"];
var userExistedList=[userList1,userList2,userList3,userList4];
localStorage.setItem('userExisted', JSON.stringify(userExistedList));

//好友列表：用户ID
//用户ID范围0-9999
localStorage.removeItem('friendExistedList');//清空
var friendExistedList=[9001,9002,9004];
localStorage.setItem('friendExisted', JSON.stringify(friendExistedList));

//所有用户的博客信息
//博客发布者用户名、发布时间、博客内容、博客ID
//博客ID范围0-9999
localStorage.removeItem('blogAll');//清空
var blogList1=["aaa","2024年1月1日 20:00:00","我是aaa,很开心",1111];
var blogList2=["bbb","2024年2月1日 20:00:00","我是bbb,不开心",2222];
var blogAllList=[blogList1,blogList2];
localStorage.setItem('blogAll', JSON.stringify(blogAllList));

//收到的好友请求
localStorage.removeItem('friendRequestSendReceive');//清空
var friendRequestList1=["aaa","2024年1月1日 22:00:00","bbb"];//aaa收到bbb的好友请求
var friendRequestList2=["aaa","2024年2月1日 22:00:00","ccc"];
var friendRequestSendReceiveList=[friendRequestList1,friendRequestList2];
localStorage.setItem('friendRequestSendReceive', JSON.stringify(friendRequestSendReceiveList));

//收到的点赞
localStorage.removeItem('clickReceive');//清空
var clickList1=["ccc","bbb",3333];//ccc收到了bbb点赞，通过1111号博客
var clickList2=["bbb","aaa",2222];
var clickReceiveList=[clickList1,clickList2];
localStorage.setItem('clickReceive', JSON.stringify(clickReceiveList));

//收到的评论
localStorage.removeItem('commentReceive');//清空
var commentList1=["aaa","2024年1月1日 20:00:00","你好aaa，我是bbb","bbb",1111];//aaa收到bbb的评论，通过1111号博客
var commentList2=["bbb","2024年2月1日 20:00:00","你好bbb，我是ccc","ccc",2222];
var commentReceiveList=[commentList1,commentList2];
localStorage.setItem('commentReceive', JSON.stringify(commentReceiveList));


//结束数据库相关：存储现有用户信息

// 跳转到注册页面
document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = 'register.html'; 
});

// 跳转到登录页面
document.getElementById('loginBtn').addEventListener('click', function() {
    window.location.href = 'login.html'; 
});