const loginBtn = document.getElementById('d-login');
const danshari = document.getElementById('danshari');
const formWraper = document.getElementById('d-form');
let token = '';
chrome.storage.sync.get('token', function(data) {
  if (data.token) {
    formWraper.classList.add('hide');
    danshari.classList.remove('hide');
    token = data.token;
  }
});

loginBtn.onclick = function(element) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (!username || !password) {
    alert('请填写用户名、密码');
    return
  }
  fetch("https://api.shimo.im/oauth/token", {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'xxx',
      client_secret: 'yyy',
      grant_type: 'password',
      username,
      password
    }),
    headers: {
      'content-type': 'application/json',
      'origin': 'https://shimo.im'
    },
  }).then(res => {
    if (res.status !== 200) {
      return res.json().then(data => alert(data.error))
    }
    return res.json().then(data => {
      token = data.access_token
      chrome.storage.sync.set({token: token}, function() {
        console.log('set token success');
        formWraper.classList.add('hide');
        danshari.classList.remove('hide');
        token = data.token;
      });
    })
  }).catch(err => alert(err))
};
