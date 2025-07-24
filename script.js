const topOptions = ["the department store", "the movie theater", "the park", "the zoo", "the libary"];
const leftOptions = ["to go shopping", "to see a movie", "to play sports", "to see animals", "to study"];

const board = document.getElementById('board-container');

const rewards = [
    { type: "points", value: 50, label: "+50" },
    { type: "points", value: 50, label: "+50" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 20, label: "+20" },
    { type: "points", value: 20, label: "+20" },
    { type: "points", value: 20, label: "+20" },
    { type: "points", value: 30, label: "+30" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 20, label: "+20" },
    { type: "points", value: 30, label: "+30" },
    { type: "multiply", value: 2, label: "x2" },
    { type: "multiply", value: 2, label: "x2" },
    { type: "reverse", value: 0, label: "🔄" },
    { type: "points", value: -10, label: "-10" },
    { type: "points", value: -10, label: "-10" },
    { type: "points", value: -10, label: "-10" },
    { type: "points", value: -10, label: "-10" },
    { type: "points", value: -10, label: "-10" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 10, label: "+10" },
    { type: "points", value: 0, label: "0" },
    { type: "points", value: 0, label: "0" },
    { type: "points", value: 0, label: "0" }
];

let currentTeam = 'A';
let scoreA = 0;
let scoreB = 0;

function updateScoreboard() {
    document.getElementById('score-a').textContent = scoreA;
    document.getElementById('score-b').textContent = scoreB;
}

function turnIndicator() {
    document.getElementById('team-a').classList.remove('active-team');
    document.getElementById('team-b').classList.remove('active-team');

    if (currentTeam === 'A') {
        document.getElementById('team-a').classList.add('active-team');
    } else {
        document.getElementById('team-b').classList.add('active-team');
    }
}

function shuffleArray(array) {

    // shuffles the rewards array

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(rewards);
let rewardIndex = 0;

// creates the board and assigns a reward to each cell.
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (row === 0 && col === 0) {
            cell.classList.add('header');
        }
        else if (row === 0) {
            cell.textContent = topOptions[col - 1];
            cell.classList.add('header');
        }
        else if (col === 0) {
            cell.textContent = leftOptions[row - 1];
            cell.classList.add('header');
        }
        else {
            const reward = rewards[rewardIndex++];
            cell.classList.add('sentence-cell');
            cell.dataset.rewardLabel = reward.label;
            cell.dataset.rewardType = reward.type;
            cell.dataset.rewardValue = reward.value;
            
            const star = document.createElement('img');
            star.src = 'star.jpg';
            star.alt = 'star';
            star.style.width = '30px';
            star.classList.add('star-img');
            cell.appendChild(star);

            cell.addEventListener('click', () => {
                if (!cell.classList.contains('clicked')) {
                    cell.classList.add('clicked');
                    cell.innerHTML = reward.label;
                    if (reward.type === 'points') {
                        if (currentTeam === 'A') {
                            scoreA += reward.value;
                        } else { scoreB += reward.value;
                        }
                    } else if (reward.type == "multiply") {
                        if (currentTeam === 'A') {
                            scoreA *= reward.value;
                        } else {
                            scoreB *= reward.value;
                        }
                    } else if (reward.type === 'reverse') {
                        [scoreA, scoreB] = [scoreB, scoreA];
                    }
                    
                    currentTeam = currentTeam === 'A' ? 'B' : 'A';

                    updateScoreboard();
                    turnIndicator();
                }
            });
        }
        board.appendChild(cell);
    }
}

updateScoreboard();
turnIndicator();
