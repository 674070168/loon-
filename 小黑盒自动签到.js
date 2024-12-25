/**
 * 小黑盒自动签到脚本 for Loon
 * 每日自动进行签到操作。
 */

const cookieKey = 'heybox_cookie';
const cookieValue = $persistentStore.read(cookieKey);

if (!cookieValue) {
  $notification.post('小黑盒签到失败', '', '未找到有效的 Cookie，请先获取 Cookie');
  $done();
  return;
}

const url = 'https://api.xiaoheihe.cn/task/sign/sign/';
const headers = {
  'Cookie': cookieValue,
  'User-Agent': 'your_user_agent_here', // 请替换为实际的 User-Agent
};

const request = {
  url: url,
  headers: headers,
};

$httpClient.post(request, (error, response, body) => {
  if (error) {
    console.log('签到请求失败：' + error);
    $notification.post('小黑盒签到失败', '', '网络错误，请检查网络连接');
  } else {
    const result = JSON.parse(body);
    if (result.status === 'success') {
      console.log('签到成功：' + result.message);
      $notification.post('小黑盒签到成功', '', result.message);
    } else {
      console.log('签到失败：' + result.message);
      $notification.post('小黑盒签到失败', '', result.message);
    }
  }
  $done();
});
