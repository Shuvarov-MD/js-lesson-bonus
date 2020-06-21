'use strict';

const userName = document.getElementById('username'),
  registerUser = document.getElementById('registerUser'),
  login = document.getElementById('login'),
  list = document.getElementById('list'),
  userData = JSON.parse(localStorage.getItem('userData') || '[]');


//Функция получения данных о пользователе
const getUserData = function() {
  let user = {},
    date = new Date(),
    mounth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let userFullName = [];

  do {
    let userName  = prompt('Введите через пробел имя и фамилию пользователя:', '').trim();
    userFullName = userName.split(' ');
    user.name = userFullName[0];
    user.surname = userFullName[1];
  } while (userFullName.length !== 2);

  user.login = prompt('Введите логин:', '').trim();
  user.password = prompt('Введите пароль:', '').trim();
  user.date = date.getDate() + ' ' + mounth[date.getMonth() + 1] + ' ' + date.getFullYear() + ' г., ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  userData.push(user);
};


//Функция вывода информации на экран
const render = function() {
  list.textContent = '';
  localStorage.setItem('userData', JSON.stringify(userData));

  userData.forEach(function(item, index) {
    let listItem = document.createElement('li');
    listItem.style.display = 'flex';
    listItem.innerHTML = '<p>Имя: ' + item.name + ', фамилия: ' + item.surname + ', зарегистрирован: ' + item.date + '</p><button class="deleteUser">X</button>';
    list.append(listItem);

    const deleteUser = listItem.querySelector('.deleteUser');
    deleteUser.addEventListener('click', function() {
      userData.splice(index, 1);
      render();
    });
  });
};

registerUser.addEventListener('click', function() {
  getUserData();
  render();
});

login.addEventListener('click', function() {
  let login = prompt('Введите логин:'),
    password = prompt('Введите пароль:'),
    count = 0;

    userData.forEach(function(item) {
      if (login === item.login && password === item.password) {
        userName.textContent = item.name;
        return;
      }
      count++;
      if (count === userData.length) {
        alert('Пользователь не найден');
      }
    });

});

render();