function request(inputSelector, btnSelector, resultField) {
  const input = document.querySelector(inputSelector); // получение элемента ввода текста
  const btn = document.querySelector(btnSelector); // получение элемента кнопки отправки
  const result = document.querySelector(resultField); // получение элемента блока вывода результата

  // функция обработчик функционала
  const handleRequest = () => {
    console.clear(); // очистка консоли

    const query = input.value.trim(); // создание переменной с value элемента ввода

    // проверка на пустое поле
    if (!query) {
      alert('Введите название книги')
      return;
    }

    const encodeQuery = encodeURIComponent(query); // создание переменной с кодировкой
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeQuery}&maxResults=10`; // создание переменной с адресом будущего запроса
  
    // инициализация запроса
    fetch(url)
      .then(res => res.json()) // обработка результата
      .then(data => {
        result.innerHTML = ''; // очистка блока с результатом при каждом новом запросе
        input.value = ''; // очиста value элемента ввода при каждом новом запросе
  
        console.log(data); // вывод в консоль для проверки работы
  
        if (data.items && data.items.length > 0) { // условие проверки наличия данных
          data.items.forEach(item => { // инициализация перебора данных
            const info = item.volumeInfo; // создание переменной с полученными данными
            const bookEl = document.createElement('div'); // создание элемента для вывода данных на страницу
            bookEl.classList.add('card'); // добавление класса к элементу
            
            // создание html структуры элемента
            bookEl.innerHTML = `
              <img src="${info.imageLinks.thumbnail || ''}" alt="book-cover">
              <div class="title">${info.title || 'Заголовок не найден'}</div>
              <div class="subtitle">${info.subtitle || 'Подзаголовок не найден'}</div>
              <div class="subtitle">${info.description || 'Описание не найдено'}</div>
            `;
            result.appendChild(bookEl); // добавление созданного элемента в блок с результатом
          })
  
        } else {
          result.innerHTML = 'Книга не найдена'; // блок кода else если данных все же не было
        }
      })
      .catch(() => {
        alert('Ошибка запроса'); // обработка ошибки при запросе
      });
  };

  btn.addEventListener('click', handleRequest); // обработчик события клика по кнопке с запуском основной функции обработки функционала

  input.addEventListener('keydown', (event) => { // обработчик события нажатия на enter с запуском основной функции обработки функционала
    if (event.key === 'Enter') {
      handleRequest();
    }
  })

};

export default request; // експорт функции


// clear() - очищает консоль в браузере
// trim() - удаляет пробелы в начале и в конце строки
// encodeURIComponent() - кодирует строку в безопасный вид для url