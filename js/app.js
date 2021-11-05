const frame = document.getElementById("game");
let game_html = "";

function renderCard(item) {
    game_html += `
    <div class="demo__card" cn=${ item.id } recyclable = ${item.recyclable}>
        <div class="demo__card__top">
            <p class="demo__card__name">${ item.name }</p>
            <div class="demo__card__img" style="background-image: url('images/${item.name}.jpg')"></div>
            <div class="demo__card__choice m--reject"></div>
            <div class="demo__card__choice m--like"></div>
            <div class="demo__card__drag"></div>
        </div>
        <div class="demo__card__btm">
            <p class="demo__card__text">${ item.description } <a href="${item.link}" target="_blank">Find out more here</a></p>
        </div>
        
    </div>
    
    `;
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let last_card = `
    <div class="demo__card">
        <div class="demo__card__top bg">Congratulations! You've finished!<p role="img" aria-label="celebration" style="font-size: 5em">&#x1F389</p>
        <button onclick="resetGame()">Play again!</button>
        </div>
        <div class="demo__card__btm">
        </div>
    </div>
`
let first_card = `
    <div class="demo__card">
        <div class="demo__card__top bg">Can I recycle it?<p style="font-size: 0.7em; font-weight: normal">Think you know your recyclables? <br /><br />Put your knowledge to the test with our game!<br /><br />Swipe right if you think you can put the item in your recycling bin at home!</p>
        <button onclick="resetGame()">Play!</button>
        </div>
        <div class="demo__card__btm opaque">
        </div>
    </div>
`
data = shuffle(data);
data.forEach(item => renderCard(item));
frame.innerHTML = last_card + game_html + first_card;

