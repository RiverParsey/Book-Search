function request(inputSelector, btnSelector, resultField) {
  const input = document.querySelector(inputSelector);
  const btn = document.querySelector(btnSelector);
  const result = document.querySelector(resultField);

  const handleRequest = () => {
    console.clear();

    const query = input.value.trim();

    if (!query) {
      alert('Введите название книги')
      return;
    }

    const encodeQuery = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeQuery}&maxResults=10`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        result.innerHTML = '';
        input.value = '';
  
        console.log(data);
  
        if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
            const info = item.volumeInfo;
            const bookEl = document.createElement('div');
            bookEl.classList.add('card');
  
            bookEl.innerHTML = `
              <img src="${info.imageLinks.thumbnail || ''}" alt="book-cover">
              <div class="title">${info.title || 'Заголовок не найден'}</div>
              <div class="subtitle">${info.subtitle || 'Подзаголовок не найден'}</div>
              <div class="subtitle">${info.description || 'Описание не найдено'}</div>
            `;
            result.appendChild(bookEl);
          })
  
        } else {
          result.innerHTML = 'Книга не найдена';
        }
      })
      .catch(() => {
        alert('Ошибка запроса');
      });
  };

  btn.addEventListener('click', handleRequest);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleRequest();
    }
  })

};

export default request;