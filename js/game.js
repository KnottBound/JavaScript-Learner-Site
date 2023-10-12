
let level = 0;
let armor = 0;
let damage = 0;
let weapon = 0;
let xp = 0;
let food = 0;
let ore = 0;
let weaponPoints = 0;
let monstersKilled = 0;

//Auto Functions
let autoMonster = false;
let autoFishing = false;
let autoMining = false;
let autoBlacksmithing = false;

let autoMonsterIntervalDuration = 1000;
let autoFishingIntervalDuration = 1000;
let autoMiningIntervalDuration = 1000;
let autoBlacksmithingIntervalDuration = 1000;

let autoFishingUpgradeCost = {food: 10};
let autoMiningUpgradeCost = {ore: 10};
let autoBlacksmithingUpgradeCost = {weaponPoints: 10};

let fishingLevel = 1;
let miningLevel = 1;
let smithingLevel = 1;


const gameManager = {
    state: "start", // Possible states: "start", "game", "lose"
    
    startGame: function() {
        // Initialization code here
        health = 50; // Reset the player's health
        toggleAutoMonster(); // Start the Autos
        toggleAutoFishing();
        toggleAutoMining();
        toggleAutoBlacksmithing();
        // Reset other game parameters if needed
        
        this.state = "game";
        this.updateScreens();
    },
    
    loseGame: function() {
        this.state = "lose";
        toggleAutoMonster(); // Start the Autos
        toggleAutoFishing();
        toggleAutoMining();
        toggleAutoBlacksmithing();
        document.getElementById('level').innerText = level;
        document.getElementById('monstersKilled').innerText = `Total Monsters Killed: ${monstersKilled}`;
        // Perhaps stop any ongoing intervals or actions
        this.updateScreens();
    },
    
    retryGame: function() {
        this.startGame(); // Restart the game
    },
    
    checkForLoseCondition: function() {
        if (health <= 0) {
            this.loseGame();
        }
    },

    updateScreens: function() {
        // Hide all screens first
        document.getElementById('startMenu').style.display = 'none';
        document.getElementById('gameScene').style.display = 'none';
        document.getElementById('retryScreen').style.display = 'none';
        
        switch (this.state) {
            case "start":
                document.getElementById('startMenu').style.display = 'grid';
                break;
            case "game":
                document.getElementById('gameScene').style.display = 'grid';
                break;
            case "lose":
                document.getElementById('retryScreen').style.display = 'grid';
                break;
        }
    }
};


class Monster {
    constructor(name, hitPoints, armorLevel, damageLevel) {
        this.name = name;
        this.initialHitPoints = hitPoints; 
        this.hitPoints = hitPoints;
        this.armorLevel = armorLevel;
        this.damageLevel = damageLevel;
    }

    resetHealth() {
        this.hitPoints = this.initialHitPoints;  // Reset health to original value
    }
    
    takeDamage(weaponStrength, potentialDamage) {

        // First Check - the hit or miss check
        let hitChance = (weaponStrength - this.armorLevel) / weaponStrength;
        if (Math.random() > hitChance) { 
            console.log("Attack missed!");
            return 0;} // attack missed
        
        // Second Check - calculate damage if the attack hits
        let effectiveDamage = Math.floor(Math.random() * (potentialDamage + 1)); // random value between 0 and potentialDamage
        this.hitPoints -= effectiveDamage;
        if (this.hitPoints < 0) this.hitPoints = 0;
        return effectiveDamage;  // return the damage done
    }

    scaleMonster() {
        this.hitPoints = this.initialHitPoints + (monstersKilled * 5); // For every monster killed, increase health by 5
        this.damageLevel += monstersKilled / 2; // Increase damage by 1 for every monster killed
        console.log("You've killed: " + monstersKilled);
    }
}

let monsters = [
    new Monster('Goblin', 50, 2, 2),
    new Monster('Orc', 100, 2, 4),
    new Monster('Dragon', 100, 3, 6)
];

let currentMonster = monsters[0];


function updateHUD() {
    document.getElementById('health').innerText = health.toFixed(0);
    document.getElementById('level').innerText = level;
    document.getElementById('armor').innerText = armor;
    document.getElementById('damage').innerText = damage;
    document.getElementById('xp').innerText = xp;
    document.getElementById('food').innerText = food;
    document.getElementById('ore').innerText = ore;
    document.getElementById('weaponPoints').innerText = weaponPoints;
    document.getElementById('monsterName').innerText = currentMonster.name;
    document.getElementById('monsterHP').innerText = currentMonster.hitPoints;
    document.getElementById('autoFishingIntervalDuration').innerText = `Food: ${(autoFishingIntervalDuration / autoFishingIntervalDuration ) * (60 * fishingLevel)} /min`;
    document.getElementById('autoMiningIntervalDuration').innerText = `Ore: ${(autoMiningIntervalDuration / autoMiningIntervalDuration) * (60 * miningLevel)} /min`;
    document.getElementById('autoBlacksmithingIntervalDuration').innerText = `Weapon: ${(autoBlacksmithingIntervalDuration / autoBlacksmithingIntervalDuration) * (60 * smithingLevel)} /min`;
    document.getElementById('fishingUpgradeCost').innerText = `Food: ${autoFishingUpgradeCost.food}`;
    document.getElementById('miningUpgradeCost').innerText = `Ore: ${autoMiningUpgradeCost.ore}`;
    document.getElementById('blacksmithingUpgradeCost').innerText = `WP: ${autoBlacksmithingUpgradeCost.weaponPoints}`;
}

function calculateDamage(baseDamage, attackerArmor, defenderArmor) {
    let netDamage = baseDamage + attackerArmor - defenderArmor;
    return Math.max(0, netDamage);  // damage cannot be negative
}

//updateHUD();

function clickMonster() {
    // Player hits first
    let potentialPlayerDamage = damage + weapon;
    let dealtPlayerDamage = currentMonster.takeDamage(weapon, potentialPlayerDamage); 

    // If the monster is not dead, it retaliates
    if (currentMonster.hitPoints > 0) {
        let potentialMonsterDamage = currentMonster.damageLevel; // assuming monster doesn't use a separate weapon value
        let dealtMonsterDamage = takePlayerDamage(currentMonster.damageLevel, potentialMonsterDamage); // We need to define this function for the player
        health -= dealtMonsterDamage;
        gameManager.checkForLoseCondition();
        if (health < 0) health = 0;
    } else {
        // Monster died, so maybe grant some loot, and spawn the next monster
        xp += dealtPlayerDamage;
        monstersKilled += 1;
        if (xp > level * 10) {
            xp = 0;
            level++;
            health += 10;  // increase health when leveling up
            damage++;      // increase damage when leveling up
        }
    
        // Drop loot (for simplicity, let's assume a 10% chance to drop loot)
        if (Math.random() < 0.1) {
            // random loot (could be more sophisticated)
            let lootType = ['food', 'ore', 'weaponPoints'][Math.floor(Math.random() * 3)];
    
            if (lootType === 'food') food += 10;
            if (lootType === 'ore') ore += 10;
            if (lootType === 'weaponPoints') weaponPoints += 10;
        }
        spawnNextMonster();
    }

    updateHUD();
}

function takePlayerDamage(attackStrength, potentialDamage) {
    // Similar to Monster's takeDamage but adjusted for the player
    let hitChance = (attackStrength) / attackStrength;  // Always 1, but kept for clarity
    if (Math.random() > hitChance) return 0; // Attack missed (though with the above hitChance, it'll never miss)

    let effectiveDamage = attackStrength;  // Monster deals its full damage level as effective damage
    return effectiveDamage;
}

//Spawning of Random Monsters
function spawnNextMonster() {
    //This one spawns them randomly:
    let randomIndex = Math.floor(Math.random() * monsters.length);
    currentMonster = monsters[randomIndex];
    currentMonster.resetHealth(); 
    currentMonster.scaleMonster();
}


function clickFishing() {
    // gain Food
    food += 1;
    updateHUD();
}

function clickMining() {
    // gain Ore
    ore += 1;
    updateHUD();
}

function clickBlacksmithing() {
    // gain Weapon Points
    weaponPoints += 1;
    updateHUD();
}

function clickEat() {
    // exchange food for health
    if (food >= 10) {
        food -= 10;
        health += 5 + (fishingLevel * 1.1);
        health.toFixed(0);
    }
    updateHUD();
}

function clickArmor() {
    // exchange ore for armor
    if (ore >= 10) {
        ore -= 10;
        armor += 1;
    }
    updateHUD();
}

function clickWeapon() {
    // exchange weaponPoints for repairing armor and weapon
    if (weaponPoints >= 10) {
        weaponPoints -= 10;
        weapon += 1;  // increase damage
    }
    updateHUD();
}

function toggleAutoMonster() {
    autoMonster = !autoMonster;
    if (autoMonster) {
        autoMonsterInterval = setInterval(clickMonster, 1000);
    } else {
        clearInterval(autoMonsterInterval);
    }
}

function toggleAutoFishing() {
    autoFishing = !autoFishing;
    if (autoFishing) {
        autoFishingInterval = setInterval(clickFishing, autoFishingIntervalDuration);
    } else {
        clearInterval(autoFishingInterval);
    }
}

function toggleAutoMining() {
    autoMining = !autoMining;
    if (autoMining) {
        autoMiningInterval = setInterval(clickMining, autoMiningIntervalDuration);
    } else {
        clearInterval(autoMiningInterval);
    }
}

function toggleAutoBlacksmithing() {
    autoBlacksmithing = !autoBlacksmithing;
    if (autoBlacksmithing) {
        autoBlacksmithingInterval = setInterval(clickBlacksmithing, autoBlacksmithingIntervalDuration);
    } else {
        clearInterval(autoBlacksmithingInterval);
    }
}



function purchaseFishingUpgrade() {
    if (food >= autoFishingUpgradeCost.food) {
        food -= autoFishingUpgradeCost.food;
        
        fishingLevel += 1;
        autoFishingIntervalDuration /= 2;

        // Double the upgrade cost
        autoFishingUpgradeCost.food *= 2;

        toggleAutoFishing(); // Turn off auto-clicking
        toggleAutoFishing(); // Turn it back on with the new interval duration
    }
}

function purchaseMiningUpgrade() {
    if (ore >= autoMiningUpgradeCost.ore) {
        ore -= autoMiningUpgradeCost.ore;
        
        miningLevel += 1;
        autoMiningIntervalDuration /= 2;

        // Double the upgrade cost
        autoMiningUpgradeCost.ore *= 2;

        toggleAutoMining(); // Turn off auto-clicking
        toggleAutoMining(); // Turn it back on with the new interval duration
    }
}

function purchaseBlacksmithingUpgrade() {
    if (weaponPoints >= autoBlacksmithingUpgradeCost.weaponPoints) {
        weaponPoints -= autoBlacksmithingUpgradeCost.weaponPoints;
        
        miningLevel += 1;
        autoBlacksmithingIntervalDuration /= 2;

        // Double the upgrade cost
        autoBlacksmithingUpgradeCost.weaponPoints *= 2;

        toggleAutoBlacksmithing(); // Turn off auto-clicking
        toggleAutoBlacksmithing(); // Turn it back on with the new interval duration
    }
}