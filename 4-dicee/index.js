var randomNumber1 = Math.floor(Math.random(6) * 6) + 1
document.querySelector(".img1").src = "images/dice"+randomNumber1+".png";

var randomNumber2 = Math.floor(Math.random(6) * 6) + 1
document.querySelector(".img2").src = "images/dice"+randomNumber2+".png";

var title = "🥇 Player 1 Wins";
if (randomNumber2 > randomNumber1) {
  title = "Player 2 Wins 🥇";
} else if (randomNumber1 === randomNumber2) {
  title = "🥈 It's a draw 🥈";
}
document.querySelector("#title").textContent = title