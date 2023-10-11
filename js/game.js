let health = 100;
let level = 1;
let armor = 1;
let damage = 5;
let weapon = 5;
let xp = 0;
let food = 0;
let ore = 0;
let weaponPoints = 0;

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

        console.log(`Taking damage. Weapon strength: ${weaponStrength}, Potential damage: ${potentialDamage}`);
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
}

let monsters = [
    new Monster('Goblin', 50, 2, 2),
    new Monster('Orc', 100, 2, 4),
    new Monster('Dragon', 200, 3, 10)
];

let currentMonster = monsters[0];


function updateHUD() {
    document.getElementById('health').innerText = health;
    document.getElementById('level').innerText = level;
    document.getElementById('armor').innerText = armor;
    document.getElementById('damage').innerText = damage;
    document.getElementById('xp').innerText = xp;
    document.getElementById('food').innerText = food;
    document.getElementById('ore').innerText = ore;
    document.getElementById('weaponPoints').innerText = weaponPoints;
    document.getElementById('monsterName').innerText = currentMonster.name;
    document.getElementById('monsterHP').innerText = currentMonster.hitPoints;
}

function calculateDamage(baseDamage, attackerArmor, defenderArmor) {
    let netDamage = baseDamage + attackerArmor - defenderArmor;
    return Math.max(0, netDamage);  // damage cannot be negative
}

updateHUD();

function clickMonster() {
    console.log("Monster clicked!");
    // Player hits first
    let potentialPlayerDamage = damage + weapon;
    let dealtPlayerDamage = currentMonster.takeDamage(weapon, potentialPlayerDamage);
    console.log(`Player dealt ${dealtPlayerDamage} damage to ${currentMonster.name}`);

    // If the monster is not dead, it retaliates
    if (currentMonster.hitPoints > 0) {
        let potentialMonsterDamage = currentMonster.damageLevel; // assuming monster doesn't use a separate weapon value
        let dealtMonsterDamage = takePlayerDamage(currentMonster.damageLevel, potentialMonsterDamage); // We need to define this function for the player
        health -= dealtMonsterDamage;
        if (health < 0) health = 0;
    } else {
        // Monster died, so maybe grant some loot, and spawn the next monster
        xp += dealtPlayerDamage;
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
    let hitChance = (attackStrength - armor) / attackStrength;
    if (Math.random() > hitChance) return 0; // attack missed
    
    let effectiveDamage = Math.floor(Math.random() * (potentialDamage + 1));
    return effectiveDamage;
}

function spawnNextMonster() {
    //This one spawns them randomly:
    let randomIndex = Math.floor(Math.random() * monsters.length);
    currentMonster = monsters[randomIndex];
    currentMonster.resetHealth(); 
    
    
    // this is a simple mechanism to just cycle through monsters
    /*let monsterIndex = monsters.indexOf(currentMonster);
    if (monsterIndex < monsters.length - 1) {
        currentMonster = monsters[monsterIndex + 1];
    } else {
        currentMonster = monsters[0];  // respawn from the beginning
    }*/
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
        health += 10;
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



