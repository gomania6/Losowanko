document.querySelector('form').onsubmit = function () {
    // Получаем список игроков из поля players
    const playersInput = document.querySelector('input[name="players"]').value.trim();
    const players = playersInput.split(/\s+/); // Разделяем по пробелам

    if (players.length < 2) {
        alert("Wpisz minimum dwie osoby!");
        return false;
    }

    
    // Перемешиваем игроков и делим на две команды
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffledPlayers.length / 2);
    const team1 = shuffledPlayers.slice(0, mid);
    const team2 = shuffledPlayers.slice(mid);

    // Получаем выбранные карты
    const selectedMaps = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    if (selectedMaps.length === 0) {
        alert("Wybierz chociażby jedną mapę!");
        return false;
    }

    // Выбираем случайную карту
    const randomMap = selectedMaps[Math.floor(Math.random() * selectedMaps.length)];

    // Display results dynamically in the HTML
    const ctList = document.querySelector('.players-ct ul#players');
    const tList = document.querySelector('.players-t ul#players');
    const mapSection = document.querySelector('.maps ul#maps');

    // Clear previous results
    ctList.innerHTML = '<li id="players-list"></li>';
    tList.innerHTML = '<li id="players-list"></li>';
    mapSection.innerHTML = '';

    // Add CT players
    const ctPlayersList = ctList.querySelector('#players-list');
    team1.forEach((player, index) => {
        const h2 = document.createElement('h2');
        if (index === 0) {
            h2.innerHTML = `${player} <img src="img/crown.png" alt="Captain">`;
        } else {
            h2.textContent = player;
        }
        ctPlayersList.appendChild(h2);
    });

    // Add T players
    const tPlayersList = tList.querySelector('#players-list');
    team2.forEach((player, index) => {
        const h2 = document.createElement('h2');
        if (index === 0) {
            h2.innerHTML = `${player} <img src="img/crown.png" alt="Captain">`;
        } else {
            h2.textContent = player;
        }
        tPlayersList.appendChild(h2);
    });

    // Add selected map
    const mapTitle = document.createElement('h1');
    mapTitle.textContent = randomMap;
    const mapImage = document.createElement('img');
    mapImage.src = document.querySelector(`input[value="${randomMap}"]`).nextElementSibling.querySelector('img').src;

    mapSection.appendChild(mapTitle);
    mapSection.appendChild(mapImage);

    return false; // Предотвращаем отправку формы
};