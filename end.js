const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//IMG 
const image = document.getElementById("animated-gif");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
changeImg(mostRecentScore);

function changeImg(recScore)
{
    if(recScore<=20)
    {
        image.src = "gifs/joey-sad.gif";
        
    }
    else if(recScore>=30 && recScore<=40)
    {
        image.src = "gifs/ross-sad.gif";
    }
    else if(recScore>=50 && recScore<=60)
    {
        image.src = "gifs/okay-applause.gif";
    }
    else if(recScore>=70 && recScore<=80){
        image.src = "gifs/chan-joey.gif";
    }
    else{
        image.src = "gifs/rachel-phoeby.gif";
    }
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};


function hov()
{
    image.src = "gifs/friends.gif";
}