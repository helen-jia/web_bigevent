// 注意：每次调用$.get()或者$.ajax()的时候
// 会先调用ajaxPrefilter
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // console.log(options.url);
        // 统一为有权限的结构，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log('执行了complete回调');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
                // 2.强制跳转到登录页面
            window.location.href = "login.html";

        }
    }
})