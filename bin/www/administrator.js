//管理员界面
//JS -> SQL :遍历二维数组userExistedList
//SQL -> JS :创建并填写二维数组uuserExistedList
//从SQL获取二维数组uuserExistedList，用于管理员界面的表格信息填写
//管理员界面可能涉及修改用户的禁言状态，希望跳转离开该界面时写回SQL

//开始数据库相关：从SQL获取二维数组uuserExistedList，用于管理员界面的表格信息填写
var userExistedList = JSON.parse(localStorage.getItem('userExisted'));
//结束数据库相关：从SQL获取二维数组uuserExistedList，用于管理员界面的表格信息填写


// 页面加载时填写表格信息
window.onload = function() {
    // 遍历用户信息列表
    userExistedList.forEach(function(user) {
        // 调用addNewUserRow函数，使用用户信息
        addNewUserRow(user[0], user[1], user[2]);
    });
};

function addNewUserRow(username, userId, status='正常') {
    var newRow = document.createElement('tr');
    var usernameTd = document.createElement('td');
    usernameTd.textContent = username;
    var idTd = document.createElement('td');
    idTd.textContent = userId;
    var statusTd = document.createElement('td');
    statusTd.id = 'userStatus-' + userId;
    statusTd.textContent = status;
    var actionTd = document.createElement('td');

    var actionBtn = document.createElement('button');
    actionBtn.className = 'action-btn';
    actionBtn.id = 'action-btn-' + userId; 
    actionBtn.textContent = status === '正常' ? '禁言' : '恢复';
    actionTd.appendChild(actionBtn);
    actionBtn.addEventListener('click',ActionButtonClick);

    // 将子元素添加到<tr>元素
    newRow.appendChild(usernameTd);
    newRow.appendChild(idTd);
    newRow.appendChild(statusTd);
    newRow.appendChild(actionTd);

    // 将新行添加到表格中
    var tbody = document.querySelector('tbody');
    tbody.appendChild(newRow);
}

// 按钮点击事件，跳转到个人空间
document.getElementById('myspaceBtn').addEventListener('click', function() {

    // 开始数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
    localStorage.setItem('userExisted', JSON.stringify(userExistedList));
    // 结束数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL

    //跳转到我的空间界面
    window.location.href = 'myspace.html';
});

function ActionButtonClick() {
    var btnIdParts = this.id.split('-'); 
    var userId = btnIdParts[btnIdParts.length - 1];
    var statusElementId = 'userStatus-' + userId; // 根据用户ID构建状态元素的ID

    var statusElement = document.getElementById(statusElementId);
    if (statusElement) {
        // 切换状态显示
        var currentStatus = statusElement.textContent.trim();
        statusElement.textContent = (currentStatus === '正常') ? '禁言' : '正常';
        
        // 切换按钮文本
        this.textContent = (this.textContent === '禁言') ? '恢复' : '禁言';

        // 找到userExistedList中对应ID的用户状态并修改
        for (var i = 0; i < userExistedList.length; i++) {
            if (userExistedList[i][1] === parseInt(userId)) {
                userExistedList[i][2] = statusElement.textContent;
                break;
            }
        }
    }
}

document.querySelectorAll('.action-btn').forEach(function(button) {
    button.addEventListener('click', ActionButtonClick);
})
