//注册界面
//用户ID由本JS生成，数据库只负责存储已有ID
//JS -> SQL :遍历二维数组userExistedList
//SQL -> JS :创建并填写二维数组userExistedList

//开始数据库相关：从SQL获取二维数组userExistedList
var userExistedList = JSON.parse(localStorage.getItem('userExisted'));
//结束数据库相关：从SQL获取二维数组userExistedList

// 函数：检查用户名是否存在
function checkUsernameExists(userList, name) {
    return userList.some(function(user) {
        return user[0] === name;
    });
}

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    var username = document.getElementById('username').value;
    // 获取两次密码输入的值
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // 检查两次输入的密码是否一致
    if ((password === confirmPassword) && !(checkUsernameExists(userExistedList, username))) {
        // 存储用户名到localStorage
        localStorage.setItem('username', username); 

        

        // 生成一个随机数，可以进一步确保唯一性
        var timestamp = Date.now();
        var randomNumber = Math.floor(Math.random() * 1000000);
        var uniqueNumber = Math.round(timestamp) + randomNumber;
        var userID=uniqueNumber%10000;

        var userList_new=[username,userID,"正常",confirmPassword];
        userExistedList.push(userList_new);

        //开始数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL
        localStorage.setItem('userExisted', JSON.stringify(userExistedList));
        //结束数据库相关：跳转离开该界面的唯一方式，希望在这里写回SQL

        // 如果一致，跳转到home.html
        window.location.href = 'home.html';
    }
    else if (checkUsernameExists(userExistedList, username)) {
        alert('用户名已存在，请重新输入!');
        // 清空，允许用户重新输入
        document.getElementById('username').value = '';
        // 聚焦到用户名输入框，方便用户直接修改
        document.getElementById('username').focus();
    }
    else {
        // 如果不一致，警告用户并阻止表单提交
        alert('两次输入的密码不一致，请重新输入！');
        // 清空密码字段，允许用户重新输入
        document.getElementById('confirmPassword').value = '';
        // 聚焦到确认密码输入框，方便用户直接修改
        document.getElementById('confirmPassword').focus();
    }
});