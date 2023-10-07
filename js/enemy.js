//delcared object constructor globally so the gamemanager can use it.
let enemy;

//This is how we manage enemy character using an Object Bp & Object Constructer
function Enemy(enemyType, health, mana, strength, agility, speed) {
    this.enemyType = enemyType;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility; 
    this.speed = speed;
}