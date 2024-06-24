//登录界面：
//SQL -> JS :获取已有的用户名和密码

//开始数据库相关：从SQL获取二维数组userExistedList，用于管理员界面的表格信息填写
var userExistedList = JSON.parse(localStorage.getItem('userExisted'));
//结束数据库相关：从SQL获取二维数组userExistedList，用于管理员界面的表格信息填写

document.getElementById('LoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 假设用户名输入字段的id为"username"
    var username = document.getElementById('username').value;
    // 获取密码输入的值
    var password = document.getElementById('password').value;

    // 通过匹配测试
    if (userCheck(username,password)) {
        // 存储用户名到localStorage
        localStorage.setItem('username', username); 
        //跳转到home.html
        window.location.href = 'home.html';
    } else {
        // 如果不正确，警告用户并阻止表单提交
        alert('密码错误，请重新输入！');
        // 聚焦到密码输入框，方便用户直接修改
        document.getElementById('password').focus();
    }
});

// 检查用户名和密码是否匹配
function userCheck(username,password){
    for (var i = 0; i < userExistedList.length; i++) {
        if (userExistedList[i][0] === username && userExistedList[i][3] === password) {
            return true;
        }
    }
    return false;
}

// 添加事件监听器到管理员登录按钮
document.getElementById('adminLoginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为
    var password = document.getElementById('password').value;
    if (password === "123") {
        window.location.href = 'administrator.html';
    } else {
        alert('密码错误，请重新输入！');
        document.getElementById('password').focus();
    }
});
