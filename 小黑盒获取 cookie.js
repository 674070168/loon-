/**
 * 小黑盒获取 Cookie 脚本 for Loon
 * 当你打开小黑盒应用的“我”页面时，自动获取并保存 Cookie。
 */

const cookieName = 'heybox';
const cookieKey = 'heybox_cookie';

const requestHeaders = $request.headers;
const cookieValue = requestHeaders['Cookie'] || requestHeaders['cookie'];

if (cookieValue) {
  const saved = $persistentStore.write(cookieValue, cookieKey);
  if (saved) {
    $notification.post(`${cookieName} Cookie 获取成功`, '', 'Cookie 已成功保存');
  } else {
    $notification.post(`${cookieName} Cookie 获取失败`, '', '无法保存 Cookie');
  }
} else {
  $notification.post(`${cookieName} Cookie 获取失败`, '', '请求中未包含 Cookie');
}

$done({});
