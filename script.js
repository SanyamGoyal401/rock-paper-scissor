const cross_btn = document.getElementById('cross-button');
const rule_box = document.getElementById('rule-box');
const rule_btn = document.getElementById('rule-btn');
var sci_btn = document.getElementById('sci');
var stone_btn = document.getElementById('stone');
var paper_btn = document.getElementById('paper');
var play_area = document.getElementById('play-area');
var option_panel = document.getElementById('options');
const score = document.getElementById('score');

const try_again_btn = document.getElementById('try-again');


let current_score = 0;

//constant for representing stone paper scissor
const stone = 0;
const paper = 1;
const scissor = 2;


//handling clicks for cross button 
cross_btn.addEventListener('click', ()=>{
    console.log('event registered');
    if(rule_box.style.display === 'none'){
        rule_box.style.display = 'block';
        // console.log(window.innerWidth);
        if(window.innerWidth < 1300)
            play_area.style.display = 'none';
    }
    else{
        rule_box.style.display = 'none';
        console.log(window.innerWidth);
        if(window.innerWidth < 1300)
            play_area.style.display = 'block'
    }
})

//handling click for rule buttons
rule_btn.addEventListener('click', ()=>{
    console.log('event registered');
    if(rule_box.style.display === 'block'){
        console.log('display is none')
        rule_box.style.display = 'none';
        if(window.innerWidth < 1300)
            play_area.style.display = 'block'
    }
    else{
        console.log('display is block')
        rule_box.style.display = 'block';
        if(window.innerWidth < 1300)
            play_area.style.display = 'none';
    }
})

function updateScore(){
    current_score = ++current_score;
    score.textContent = current_score;
}

//take computer choice
function getComputerDecision(){
    return Math.floor(Math.random() * 3);
}

function updateUI(st_text, userChoice, pcChoice){

    //creating element required for result section
    const options2 = document.createElement('div');
    const result_text = document.createElement('div');
    const status_text = document.createElement('span');
    const against_pc_text = document.createElement('span');
    const play_again_btn = document.createElement('button');
    const pc_picked = document.createElement('div');
    const you_picked = document.createElement('div');

    console.log(st_text, userChoice, pcChoice);
    //hide previous ui
    play_area.removeChild(option_panel);
    
    //setting winner text
    status_text.innerText = st_text;
    against_pc_text.innerText = 'AGAINST PC';
    play_again_btn.innerText = 'PLAY AGAIN';
    pc_picked.innerText = 'PC PICKED';
    you_picked.innerText = 'YOU PICKED';

    userChoice.style.marginTop = '30%';
    pcChoice.style.marginTop = '30%';
    
    if(st_text === 'YOU WIN'){
        userChoice.classList.add('effectwin');
        pcChoice.classList.add('effectlost');
    }
    else if (st_text === 'YOU LOST'){
        userChoice.classList.add('effectlost');
        pcChoice.classList.add('effectwin');
    }
    result_text.appendChild(status_text);
    result_text.appendChild(document.createElement('br'));
    result_text.appendChild(against_pc_text);
    result_text.appendChild(document.createElement('br'));
    you_picked.appendChild(userChoice);
    pc_picked.appendChild(pcChoice);
    options2.appendChild(you_picked);
    options2.appendChild(pc_picked);
    // options2.appendChild(userChoice);
    options2.appendChild(result_text);
    // options2.appendChild(pcChoice);
    play_area.appendChild(options2);
    result_text.appendChild(play_again_btn);

    console.log(options2);

    //adding classlist for styling
    
    status_text.classList.add('status-text');
    against_pc_text.classList.add('against-pc-text');
    result_text.classList.add('result-text');
    options2.classList.add('options2');
    play_again_btn.classList.add('play-again');
    you_picked.classList.add('you-picked');
    pc_picked.classList.add('pc-picked');  

    play_again_btn.addEventListener('click', ()=>{
        play_area.removeChild(options2);
        play_area.appendChild(option_panel);
    });
    
}

function getClone(param){
    if(param === 0){
        return stone_btn.cloneNode(true);
    }
    else if(param === 1){
        return paper_btn.cloneNode(true);
    }
    else{
        return sci_btn.cloneNode(true);
    }
}
function decideResult(player1, player2){
    console.log(player1, player2);
    if(player1 === player2){
        updateUI('TIE', getClone(player1), getClone(player2));
    }
    else if(player1 === 0){
        if(player2 == 1){
            updateUI("YOU LOST", getClone(player1), getClone(player2));
        }
        else{
            updateUI("YOU WIN", getClone(player1), getClone(player2));
            updateScore();
        }
    }
    else if(player1 == 1){
        if(player2 == 2){
            updateUI("YOU LOST", getClone(player1), getClone(player2));
        }
        else{
            updateUI("YOU WIN", getClone(player1), getClone(player2));
            updateScore();
        }
    }
    else if(player1 == 2){
        if(player2 == 0){
            updateUI("YOU LOST", getClone(player1), getClone(player2));
        }
        else{
            updateUI("YOU WIN", getClone(player1), getClone(player2));
            updateScore();
        }
    }
}

//handling click on initial screen container
sci_btn.addEventListener('click', ()=>{
    try_again_btn.style.display = 'block';
    decideResult(2, getComputerDecision());
})
stone_btn.addEventListener('click', ()=>{
    try_again_btn.style.display = 'block';
    decideResult(0, getComputerDecision());
})
paper_btn.addEventListener('click', ()=>{
    try_again_btn.style.display = 'block';
    decideResult(1, getComputerDecision());
})


try_again_btn.addEventListener('click', ()=>{
    score.textContent = 0;
    try_again_btn.style.display = 'none';
})