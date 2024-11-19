let stats = {
    level: 1,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 70
};

let restCooldown = false;

const actions = {
    cleanup: { energy: -5, pollutionCleaned: 10, log: "Cleanup Drive: +10 Pollution Cleaned, -5 Energy" },
    protectAnimals: { energy: -8, animalsProtected: 5, log: "Protected Animals: +5 Animals, -8 Energy" },
    plantTrees: { energy: -4, treesPlanted: 3, log: "Planted Trees: +3 Trees, -4 Energy" },
    installTurbines: { energy: -10, pollutionCleaned: 25, log: "Installed Wind Turbines: +15 Pollution Cleaned, -10 Energy" },
    rest: { energy: 10, log: "Took a rest: +10 Energy" }
};

function updateStats() {
    document.getElementById("energy").textContent = stats.energy;
    document.getElementById("pollution-cleaned").textContent = stats.pollutionCleaned;
    document.getElementById("animals-protected").textContent = stats.animalsProtected;
    document.getElementById("trees-planted").textContent = stats.treesPlanted;
    document.getElementById("time").textContent = stats.timeLeft;
    document.getElementById("levelcount").textContent = stats.level;

    if (stats.timeLeft <= 0) {
        endGame();
    }
}

function startRestCooldown() {
    restCooldown = true;
    addLog("Rest is on cooldown for 4 seconds.");
    setTimeout(() => {
        restCooldown = false;
        addLog("Rest is now available.");
    }, 4000); // 4 seconds
}

function performAction(action) {
    if (action === "rest" && restCooldown) {
        addLog("Rest is on cooldown. Please wait.");
        return;
    }

    const effects = actions[action];
    if (stats.energy + (effects.energy || 0) >= 0) {
        stats.energy += effects.energy || 0;
        stats.pollutionCleaned += effects.pollutionCleaned || 0;
        stats.animalsProtected += effects.animalsProtected || 0;
        stats.treesPlanted += effects.treesPlanted || 0;
        if (effects.energyGain) stats.energy += effects.energyGain;
        addLog(effects.log);
        updateStats();

        if (action === "rest") startRestCooldown();
    } else {
        addLog("Not enough energy for this action.");
    }
}   

function addLog(message) {
    const logList = document.getElementById("log-list");
    const listItem = document.createElement("li");
    listItem.textContent = message;
    logList.appendChild(listItem);
}

function endGame() {
    alert(`Game Over! \n Final Scores- \n Pollution Cleaned: ${stats.pollutionCleaned}\n Animals protected: ${stats.animalsProtected}\n Trees Planted: ${stats.treesPlanted}`);
    if (stats.level === 1){
        if (stats.pollutionCleaned > 20 && stats.animalsProtected > 15 && stats.treesPlanted > 30){
            alert(`Awesome! You have done some work to save the environment!\n I see your enthusiasm, level up!`)            
            levelUp();
        }
        else{
            alert(`You have not done well in helping the envirnoment in all fields, try again!`);
            levelReset();
        }
    }
    else if (stats.level === 2){
        if (stats.pollutionCleaned > 20 && stats.animalsProtected > 30 && stats.treesPlanted > 40){
            alert(`Awesome! You have done some work to save the environment!\n I see your enthusiasm, level up!`)            
            levelUp();
        }
        else{
            alert(`You have not done well in helping the envirnoment in all fields, try again!`);
            levelReset();
        }
    }else if (stats.level === 3){
        if (stats.pollutionCleaned > 30 && stats.animalsProtected > 42 && stats.treesPlanted > 55){
            alert(`Awesome! You have done some work to save the environment!\n I see your enthusiasm, level up!`)            
            levelUp();
        }
        else{
            alert(`You have not done well in helping the envirnoment in all fields, try again!`);
            levelReset();
        }
    }
    else if (stats.level === 4){
        if (stats.pollutionCleaned > 40 && stats.animalsProtected >54 && stats.treesPlanted > 64){
            alert(`You've used good combinations! Use better combinations to win the game! You helped clean the environment more!!\n I see your passion, level up!`)            
            levelUp();
        }
        else{
            alert(`You have not done well in helping the envirnoment in all fields, try again!`);
            levelReset();
        }
    }
    else if (stats.level === 5){
        if (stats.pollutionCleaned > 50 && stats.animalsProtected > 60 && stats.treesPlanted > 80){
            alert(`Outstanding Choice of Resources! You have done extremely well! \n you truly show your yearning for saving the environment!`)            
            finishGame();
        }
        else{
            alert(`You have not done well in helping the envirnoment in all fields, try again!`);
            levelReset();
        }
    }
    resetGame();
}

function levelReset(){
    stats.level = 1;
}
function finishGame(){
    window.location.href = "thankyou.html";
} 

function levelUp(){
    stats.level++;
}
function resetGame() {
    if (stats.level === 1){
    stats = {
    level : 1,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 70
    };}
    else if (stats.level === 2){
    stats = {
    level : 2,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 65
    };}
    else if (stats.level === 3){
    stats = {
    level : 3,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 65
    };}     
    else if (stats.level === 4){
    stats = {
    level : 4,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 55
    };}
    else if (stats.level === 5){
    stats = {
    level : 5,
    energy: 50,
    pollutionCleaned: 0,
    animalsProtected: 0,
    treesPlanted: 0,
    timeLeft: 50
    };}    
    document.getElementById("log-list").innerHTML = "";
    updateStats();
}

function countdown() {
    stats.timeLeft--;
    updateStats();
}

setInterval(countdown, 1000);
updateStats();
