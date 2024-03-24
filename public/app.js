document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
      const id = event.target.dataset.id;
  
      remove(id).then(() => {
        event.target.closest('li').remove();
      })
    }
  })
  
  
  async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'});
  }

  document.addEventListener('click', event => {
    if (event.target.dataset.type === 'edit') {
      const id = event.target.dataset.id;
      const titleElement = event.target.closest('li').querySelector('span');
    if (!titleElement) return; // Если элемент не найден, завершаем функцию.
      const currentTitle = titleElement.textContent;
      const newTitle = prompt('Введите новое название:', currentTitle);
  
      if (newTitle) {
        edit(id, newTitle).then(() => {
          titleElement.textContent = newTitle;
        }).catch(err => {
          console.error('Note update error:', err);
        });
      }
    }
  });
  
  async function edit(id, title) {
    await fetch(`/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
  }