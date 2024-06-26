//我的空间界面
//删除：更新friendRequestSendReceiveList、clickReceiveList、commentReceiveList
//显示：username匹配，格式化显示
//希望同意好友申请后，加入到好友列表

//开始数据库相关：从SQL获取
var friendRequestSendReceiveList = JSON.parse(localStorage.getItem('friendRequestSendReceive'));
var clickReceiveList = JSON.parse(localStorage.getItem('clickReceive'));
var commentReceiveList = JSON.parse(localStorage.getItem('commentReceive'));
//结束数据库相关：从SQL获取
var username = localStorage.getItem('username');

// 生成一个随机ID
function generateNotificationID(now){
    var randomNumber = Math.floor(Math.random() * 1000000);
    var uniqueNumber = (Math.round(now) + randomNumber)%10000;
    return uniqueNumber;
}

// 用于显示通知的函数
function displayNotifications(notifications, type) {
    var notificationsContainer = document.querySelector('.notifications');
    for (var i = 0; i < notifications.length; i++){
        var notification=notifications[i];
        
        // 为每种通知类型创建相应的HTML结构
        var notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification';
        notificationDiv.id = generateNotificationID(Date.now());

        var contentParagraph = document.createElement('p');
        contentParagraph.className = 'notification-content';
        // 根据通知类型设置不同的文本内容
        var contentText = "";
        if (type === 'friendRequest' && notification[0] === username && notification[2] != username) 
        {
            contentText = notification[2] + ' 于 ' + notification[1] + ' 想要添加您为好友';
        } 
        else if (type === 'click' && notification[0] === username && notification[1] != username) 
        {
            contentText = notification[1] + ' 点赞了您';
        } 
        else if (type === 'comment' && notification[0] === username && notification[3] != username) 
        {
            contentText = notification[3] + ' 于 ' + notification[1] + ' 回复了您：' + notification[2];
        }
        else continue;
        contentParagraph.textContent = contentText;

        var markAsReadBtn = document.createElement('button');
        markAsReadBtn.className = 'markAsRead';
        markAsReadBtn.textContent = '已读';
        markAsReadBtn.addEventListener('click', MarkAsReadButtonClick);

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', DeleteButtonClick);

        // 将元素添加到通知容器中
        notificationDiv.appendChild(contentParagraph);
        notificationDiv.appendChild(markAsReadBtn);
        notificationDiv.appendChild(deleteBtn);

        notificationsContainer.appendChild(notificationDiv);
    };
}

// 页面加载完毕后显示所有通知
document.addEventListener('DOMContentLoaded', function() {

    displayNotifications(friendRequestSendReceiveList, 'friendRequest');
    displayNotifications(clickReceiveList, 'click');
    displayNotifications(commentReceiveList, 'comment');
});


// 左侧按钮点击事件
document.getElementById('administratorBtn').addEventListener('click', function() {
    window.location.href = 'administrator.html';
});

document.getElementById('publishBtn').addEventListener('click', function() {
    window.location.href = 'publish.html';
});

document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'home.html';
});

document.getElementById('friendBtn').addEventListener('click', function() {
    window.location.href = 'friendlist.html';
});

// 已读按钮点击事件
function MarkAsReadButtonClick(event) {
    var markAsReadBtn = event.target;
    var notification = markAsReadBtn.closest('.notification');
    notification.classList.add('read');
}

// 删除按钮点击事件
function DeleteButtonClick(event) {
    var deleteBtn = event.target;
    var notification = deleteBtn.closest('.notification');
    notification.remove();
}

