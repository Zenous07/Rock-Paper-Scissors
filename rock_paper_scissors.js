let score=JSON.parse(localStorage.getItem('score')) || {
  win:0,
  looses:0,
  tie:0
};

/*  if(!score){
  score={
    win:0,
    looses:0,
    tie:0
  };
}
 */

document.querySelector('.display-score').innerHTML=scoreboard();

let intervalId;
let isAutoPlaying=false;

 function autoPlay(){
    if(!isAutoPlaying){
        intervalId=setInterval(function(){
            let playerMove=RandomMove();
            playGame(playerMove);
        },100);
        document.querySelector('.autoPlayButton').innerHTML='Stop Playing';
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        document.querySelector('.autoPlayButton').innerHTML='Start Playing'
        isAutoPlaying=false;
    }
    
 }

 document.querySelector('.reset').addEventListener('click',()=>{
    document.querySelector('.resetConfirmation').innerHTML=`Do You Want to reset the score ?? <button class='yesOption'>Yes</button> <button class='noOption'>No</button> `;
    document.querySelector('.yesOption').addEventListener('click',()=>{
        score.win=score.looses=score.tie=0;
        document.querySelector('.display-score').innerHTML=scoreboard();
        document.querySelector('.resetConfirmation').innerHTML='';
    });
    document.querySelector('.noOption').addEventListener('click', () =>{
        document.querySelector('.resetConfirmation').innerHTML='';
    })
 });
 //onclick="score.win=score.looses=score.tie=0;
 //document.querySelector('.display-score').innerHTML=scoreboard();"

 document.querySelector('.js-rock-button').addEventListener('click',() =>{
    playGame('Rock');
 });

 document.querySelector('.js-paper-button').addEventListener('click',() =>{
    playGame('Paper');
 });

 document.querySelector('.js-scissors-button').addEventListener('click', () =>{
    playGame('Scissors');
 });

 document.body.addEventListener('keydown', (event) => {
    if(event.key==='r' || event.key === 'R'){
        playGame('Rock');
    }
    else if(event.key==='p' || event.key==='P'){
        playGame('Paper');
    }
    else if(event.key==='s' || event.key==='S'){
        playGame('Scissors');
    }
 });

 document.body.addEventListener('keydown', (event) => {
    if(event.key ===' '){
        autoPlay();
    };
 })

function playGame(userMove){
    let result='';
    const ComputerMove=RandomMove();

    if(userMove==='Rock'){
        if(ComputerMove==='Rock'){
        result='Tie';
        }
        else if(ComputerMove==='Paper'){
            result='Loose';
        }
        else{
            result='Win';
        }
    }

    else if(userMove==='Paper'){
        if(ComputerMove==='Rock'){
        result='Win';
        }
        else if(ComputerMove==='Paper'){
            result='Tie';
        }
        else{
            result='Loose';
        }
    }

    else{
        if(ComputerMove==='Rock'){
        result='Loose';
        }
        else if(ComputerMove==='Paper'){
            result='Win';
        }
        else if(ComputerMove==='Scissors'){
            result='Tie';
        }
    }
    if(result==='Win'){
        score.win=score.win+1;
    }
    else if(result==='Loose'){
        score.looses+=1;
    }
    else if(result==='Tie'){
        score.tie+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    document.querySelector('.display-score').innerHTML=scoreboard();

    document.querySelector('.moves-display').innerHTML=`You
<img class="userMoveIcon" src="Images/${userMove}-emoji.png"> 
<img class="computerMoveIcon" src="Images/${ComputerMove}-emoji.png">
Computer`;

    document.querySelector('.result-display').innerHTML=`${result}`;


    /*if(result==='Tie'){
        alert(`You chose ${userMove} and computer chose ${ComputerMove} and the result is ${result}
${scoreboard()}`)
    }
    else{
        alert(`You chose ${userMove} and computer chose ${ComputerMove} and the result is you ${result}
${scoreboard()}`)
    }*/

}


function scoreboard(){
    return `Wins ${score.win} Lost ${score.looses} Draw ${score.tie}`;
}



function RandomMove(){
    let ComputerMove='';
    const randomnumber=Math.random();
    if(randomnumber>=0 && randomnumber<0.3){
        ComputerMove='Rock';
    }
    else if(randomnumber>=0.3 && randomnumber<0.6){
        ComputerMove='Paper';
    }
    else{
        ComputerMove='Scissors';
    }
    return ComputerMove;
}