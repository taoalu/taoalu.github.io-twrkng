document.addEventListener("DOMContentLoaded", function () {

  const loadingIndicator = document.getElementById('loading');
  const dataTable = document.getElementById('rankingDataTable');

  fetch("https://user.wartale.com/api.asp?key=794701946544a3f6d9e42238cde2a551&action=ranking_top_level&count=100")
    .then(response => response.json())
    .then(data => {
      loadingIndicator.classList.add('d-none');
      dataTable.classList.remove('d-none');
      const tableBody = document.querySelector("#rankingDataTable tbody");
      tableBody.innerHTML = '';
      let position = 1;
      data.results.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td style="padding-left: 40px">${position}</td>
          <td><img src="https://user.wartale.com/clanicons/${item.clanId}.png" alt="clan image" style="max-width: 30px; height: auto; border-radius: 5px"></td>    
          <td><img src="https://wartale.com/img/guide/portraits/${getPlayerClassName(item.class)}.png" alt="class image" style="max-width: 30px; height: auto; border-radius: 5px"></td>   
          <td>${item.name}</td>
          <td>${item.expPercentage.toFixed(3)}%</td>
          <td>${item.level}</td>          
          `;
        if (position < 4) {
          switch (position) {
            case 1:
              row.classList.add('top-level-first');
              break;
            case 2:
              row.classList.add('top-level-second');
              break;
            case 3:
              row.classList.add('top-level-third');
              break;
            default:
              row.classList.add('top-level-item');
              break;
          }
        }
        tableBody.appendChild(row);
        position++;
      });
    })
    .catch(error => console.error("Erro ao obter dados da API:", error));
});

const triggerTabList = document.querySelectorAll('#myTab button')
triggerTabList.forEach(triggerEl => {
  const tabTrigger = new bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', event => {
    event.preventDefault()
    tabTrigger.show()
  })
});

function fetchRankingData(rankingName) {

  const loadingIndicator = document.getElementById('loading');
  const dataTable = document.getElementById('rankingDataTable');

  loadingIndicator.classList.remove('d-none');

  fetch("https://user.wartale.com/api.asp?key=794701946544a3f6d9e42238cde2a551&action=" + rankingName + "&count=100")
    .then(response => response.json())
    .then(data => {
      loadingIndicator.classList.add('d-none');
      dataTable.classList.remove('d-none');
      const tableBody = document.querySelector("#rankingDataTable tbody");
      tableBody.innerHTML = '';
      let position = 1;

      if (rankingName == "ranking_sod_personal") {
        // Adicionar cabeçalhos à tabela
        const headerRow = document.createElement("tr");

        const positionHeader = document.createElement("th");
        positionHeader.textContent = "#";
        headerRow.appendChild(positionHeader);

        const clanIconHeader = document.createElement("th");
        headerRow.appendChild(clanIconHeader);

        const classIconHeader = document.createElement("th");
        headerRow.appendChild(classIconHeader);

        const nameHeader = document.createElement("th");
        nameHeader.textContent = "Name";
        headerRow.appendChild(nameHeader);

        const scoreHeader = document.createElement("th");
        scoreHeader.textContent = "Score";
        headerRow.appendChild(scoreHeader);

        const levelHeader = document.createElement("th");
        levelHeader.textContent = "Level";
        headerRow.appendChild(levelHeader);

        tableBody.appendChild(headerRow);

      }

      if (rankingName != "ranking_sod_personal") {
        // Adicionar cabeçalhos à tabela
        const headerRow = document.createElement("tr");

        const positionHeader = document.createElement("th");
        positionHeader.textContent = "#";
        headerRow.appendChild(positionHeader);

        const clanIconHeader = document.createElement("th");
        headerRow.appendChild(clanIconHeader);

        const classIconHeader = document.createElement("th");
        headerRow.appendChild(classIconHeader);

        const nameHeader = document.createElement("th");
        nameHeader.textContent = "Name";
        headerRow.appendChild(nameHeader);

        if (rankingName == "ranking_top_level") {
          const expPercentageHeader = document.createElement("th");
          expPercentageHeader.textContent = "Exp %";
          headerRow.appendChild(expPercentageHeader);
        }

        const levelHeader = document.createElement("th");
        levelHeader.textContent = "Level";
        headerRow.appendChild(levelHeader);

        tableBody.appendChild(headerRow);
      }
      // Adicionar linhas de dados à tabela
      data.results.forEach(item => {
        const row = document.createElement("tr");
        const rowSod = document.createElement("tr");

        const positionCell = document.createElement("td");
        positionCell.textContent = position;
        row.appendChild(positionCell);

        const clanIconCell = document.createElement("td");
        const clanIconImg = document.createElement("img");
        clanIconImg.src = `https://user.wartale.com/clanicons/${item.clanId}.png`;
        clanIconImg.alt = "clan image";
        clanIconImg.style.maxWidth = "30px";
        clanIconImg.style.height = "auto";
        clanIconImg.style.borderRadius = "5px";
        clanIconCell.appendChild(clanIconImg);
        row.appendChild(clanIconCell);

        const classIconCell = document.createElement("td");
        const classIconImg = document.createElement("img");
        classIconImg.src = `https://wartale.com/img/guide/portraits/${getPlayerClassName(item.class)}.png`;
        classIconImg.alt = "class image";
        classIconImg.style.maxWidth = "30px";
        classIconImg.style.height = "auto";
        classIconImg.style.borderRadius = "5px";
        classIconCell.appendChild(classIconImg);
        row.appendChild(classIconCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        if (rankingName == "ranking_top_level") {
          const expPercentageCell = document.createElement("td");
          expPercentageCell.textContent = `${item.expPercentage.toFixed(3)}%`;
          row.appendChild(expPercentageCell);
        }

        if (rankingName == "ranking_sod_personal") {
          const expPercentageCell = document.createElement("td");
          expPercentageCell.textContent = `${scoreMask(item.score, '00.000.000')}`;
          row.appendChild(expPercentageCell);
        }

        const levelCell = document.createElement("td");
        levelCell.textContent = item.level;
        row.appendChild(levelCell);

        if (position < 4) {
          switch (position) {
            case 1:
              row.classList.add('top-level-first');
              break;
            case 2:
              row.classList.add('top-level-second');
              break;
            case 3:
              row.classList.add('top-level-third');
              break;
            default:
              row.classList.add('top-level-item');
              break;
          }
        }

        tableBody.appendChild(row);
        position++;

      });
    })
    .catch(error => console.error("Erro ao obter dados da API:", error));
};

function rankingChange(type) {

  var page_title = document.getElementById('pageTitle');

  if (type === "ranking_top_level") {

    fetchRankingData("ranking_top_level");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">Top Level Ranking</h1>';

  } else if (type === "ranking_sod_personal") {

    fetchRankingData("ranking_sod_personal");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">Bellatra Player Ranking</h1>';

  } else if (type === "ranking_sod_clan") {

    fetchRankingData("ranking_sod_clan");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">Bellatra Clan Ranking</h1>';

  } else if (type === "ranking_sod_clan") {

    fetchRankingData("ranking_sod_clan");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">PVP Player Ranking</h1>';

  } else if (type === "ranking_pvp_personal") {

    fetchRankingData("ranking_pvp_personal");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">PVP Player Ranking</h1>';

  } else if (type === "ranking_pvp_clan") {

    fetchRankingData("ranking_pvp_clan");

    var tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Adiciona a classe 'active' à aba selecionada
    event.target.classList.add('active');

    page_title.innerHTML = '<h1 class="ranking-title">PVP Clan Ranking</h1>';

  }
}

function topLevelClassIconClick(classID, shadowOn) {
  console.log(classID);
  var container = document.getElementById("myContainer");
  if (container.classList.contains("with-shadow")) {
    container.classList.remove("with-shadow");
  } else {
    container.classList.add("with-shadow");
  }
}

function getPlayerClassName(classId) {
  switch (classId) {
    case 1:
      {
        return 'fighter';
      }
      break;
    case 2:
      {
        return 'mechanician';
      }
      break;
    case 3:
      {
        return 'archer';
      }
      break;
    case 4:
      {
        return 'pikeman';
      }
      break;
    case 5:
      {
        return 'atalanta';
      }
      break;
    case 6:
      {
        return 'knight';
      }
      break;
    case 7:
      {
        return 'magician';
      }
      break;
    case 8:
      {
        return 'priestess';
      }
      break;
    case 9:
      {
        return 'assassin';
      }
      break;
    case 10:
      {
        return 'shaman';
      }
      break;
    case 11:
      {
        return 'brawler';
      }
      break;
  }
}

function scoreMask(numero, mascara) {
  let numeroString = numero.toString(); // Converte o número para uma string
  let indiceNumero = 0;
  let numeroFormatado = '';

  // Itera sobre a máscara
  for (let i = 0; i < mascara.length; i++) {
    // Verifica se chegou ao fim do número
    if (indiceNumero >= numeroString.length) {
      break;
    }

    // Se o caractere da máscara for um dígito, adiciona o próximo dígito do número
    if (mascara[i] === '0') {
      numeroFormatado += numeroString[indiceNumero++];
    } else {
      // Se não for um dígito, adiciona o caractere da máscara
      numeroFormatado += mascara[i];
    }
  }

  return numeroFormatado;
}

/**
 * 
 * <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Toggle Bootstrap Container Shadow</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
<style>
  .container.with-shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
</head>
<body>

<div class="container" id="myContainer">
  <h1>Container Bootstrap</h1>
  <p>Conteúdo do container</p>
</div>

<button onclick="toggleShadow()">Toggle Shadow</button>

<script>
  function toggleShadow() {
    var container = document.getElementById("myContainer");
    if (container.classList.contains("with-shadow")) {
      container.classList.remove("with-shadow");
    } else {
      container.classList.add("with-shadow");
    }
  }
</script>

</body>
</html>
 */