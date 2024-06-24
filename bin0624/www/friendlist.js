//好友列表界面：
//SQL -> JS :通过二维数组userExistedList，获取用户ID到用户名的映射
//SQL -> JS :通过一维数组friendExistedList，获取初始的好友列表，每个元素是用户ID
//JS -> SQL :该界面删除好友后，更新friendExistedList，跳转离开该界面时写回SQL

//开始数据库相关：从SQL获取二维数组userExistedList、一维数组friendExistedList
var userExistedList = JSON.parse(localStorage.getItem('userExisted'));
var friendExistedList = JSON.parse(localStorage.getItem('friendExisted'));
//结束数据库相关：从SQL获取二维数组userExistedList、一维数组friendExistedList
var username = localStorage.getItem('username');

// 页面加载完毕后显示
document.addEventListener('DOMContentLoaded', function() {
    // 显示好友列表，参数是用户ID
    for (var i = 0; i < friendExistedList.length; i++) {
        addFriendRequest(friendExistedList[i]);
    }
});

// 函数：添加好友请求到列表
// 好友请求列表函数，接受一个参数：用户ID
function addFriendRequest(userId) {
    // 获取好友请求列表容器
    var friendRequestsContainer = document.querySelector('.friend-requests');

    //从userExistedList中根据用户ID找到对应用户名
    var friendname=id2name(userId);
    // 如果没有找到用户，返回
    if (friendname === "" || friendname === username) return;
    
    // 创建新的好友请求元素
    var newRequest = document.createElement('div');
    newRequest.className = 'request';
    newRequest.id = 'request-' + userId;

    // 创建用户名元素
    var requestName = document.createElement('span');
    requestName.className = 'requestName';
    requestName.id = 'requestName-' + userId;
    requestName.textContent = friendname;

    // 创建删除按钮元素
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '删除好友';
    deleteBtn.id = 'delete-btn-' + userId;
    deleteBtn.addEventListener('click', DeleteFriendButtonClick);

    // 将用户名和删除按钮添加到新的好友请求元素
    newRequest.appendChild(requestName);
    newRequest.appendChild(deleteBtn);

    // 将新的好友请求元素添加到列表容器中
    friendRequestsContainer.appendChild(newRequest);
}

function id2name(userId){
    for (var i = 0; i < userExistedList.length; i++) {
        if (userExistedList[i][1] === userId) {
            return userExistedList[i][0];
        }
    }
    return "";
}

// 按钮点击事件，跳转到个人空间
document.getElementById('myspaceBtn').addEventListener('click', function() {
    //开始数据库相关：跳转离开该界面的唯二方式，希望在这里写回SQL
    localStorage.setItem('friendExisted', JSON.stringify(friendExistedList));
    // 结束数据库相关：跳转离开该界面的唯二方式，希望在这里写回SQL

    //跳转到我的空间
    window.location.href = 'myspace.html';
});

// 按钮点击事件，跳转到主界面
document.getElementById('homeBtn').addEventListener('click', function() {
    //开始数据库相关：跳转离开该界面的唯二方式，希望在这里写回SQL
    localStorage.setItem('friendExisted', JSON.stringify(friendExistedList));
    // 结束数据库相关：跳转离开该界面的唯二方式，希望在这里写回SQL

    //跳转到动态主页
    window.location.href = 'home.html';
});

// 删除好友按键
function DeleteFriendButtonClick(event){
    var deleteFriendBtn = event.target;

    // 找到按钮所在的request元素
    var request = deleteFriendBtn.parentNode;

    // 从request元素中获取用户ID，假设ID是request元素的id属性的一部分
    var requestId = request.id.replace('request-', '');

    // 更新friendExistedList：定位+删除
    var deleteIndex = friendExistedList.indexOf(requestId);
    friendExistedList.splice(deleteIndex,1);

    // 从页面中删除这个元素
    request.remove();
}

