const frame = document.getElementById("game");
let game_html = "";

function renderCard(item) {
    game_html += `
    <div class="demo__card" cn=${ item.id } recyclable = ${item.recyclable}>
        <div class="demo__card__top">
            <div class="demo__card__img"></div>
            <p class="demo__card__name">${ item.name }</p>
        </div>
        <div class="demo__card__btm">
            <p class="demo__card__text">${ item.description }</p>
        </div>
        <div class="demo__card__choice m--reject"></div>
        <div class="demo__card__choice m--like"></div>
        <div class="demo__card__drag"></div>
    </div>
    `;
}

data.forEach(item => renderCard(item));
frame.innerHTML = game_html;
