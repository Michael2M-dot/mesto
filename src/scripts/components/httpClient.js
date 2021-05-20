// Токен: 99295e52-decf-4a30-8030-f17c65fb60b0
// Идентификатор группы: cohort-24

/*
fetch('https://mesto.nomoreparties.co/v1/cohort-24/cards', {
  headers: {
    authorization: '99295e52-decf-4a30-8030-f17c65fb60b0'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 
  */

const userName = document.querySelector('.profile__user-name');
const userJob = document.querySelector('.profile__user-job');
const userAvatar = document.querySelector('.profile__user-avatar')



function getUsedData() {
  return fetch('https://nomoreparties.co/v1/cohort-24/users/me', {
    method: 'GET',
    headers: {
      authorization: '99295e52-decf-4a30-8030-f17c65fb60b0'
    }
  })
}

getUsedData()
  .then((res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res.status);
  })
    .then((data) => {
      console.log(data);
      renderUserData(data);
    })
    .catch((err) => {
      console.log('Error', err)
    })


function renderUserData (data){
    userName.textContent = data.name;
    userJob.textContent = data.about;
    userAvatar.style.backgroundImage = data.avatar;
}
