//This is how we manage the game
let GameManager = {

    setGameStart: function(classType) {
        this.resetPlayer(classType);
        this.setPreFight();
    },
    resetPlayer: function(classType) {
        switch (classType) {
            case 'Dwarf':
                player = new Player(classType, 200, 0, 200, 50, 50);
                break;
            case 'Hunter':
                player = new Player(classType, 160, 0, 100, 150, 200);
                break;
            case 'Warrior':
                player = new Player(classType, 180, 0, 180, 120, 100);
                break;
            case 'Wizard':
                player = new Player(classType, 140, 200, 200, 100, 150);
                break;
        }

        let getInterface = document.querySelector(".interface");
        getInterface.innerHTML = '<img src="img/avatar-player/' + 
        classType.toLowerCase() + '.png" class="image-avatar"><div><h3>' + 
        classType + '</h3><p class="health-player">Health: ' + player.health +  '</p><p>Mana: ' + 
        player.mana +  '</p><p>Strength: ' + player.strength +  '</p><p>Agility: ' + 
        player.agility +  '</p><p>Speed: ' + player.speed +  '</p></div>';
    },
    //creates the PreFight Screen
    setPreFight: function(){
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getArena = document.querySelector(".arena");
        getHeader.innerHTML = '<p>Task: Find an Enemy!</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="GameManager.setFight()"> Search for an enemy! </a>';
        getArena.style.visibility = 'visible';
    },
    setFight: function(){
        let getHeader = document.querySelector(".header");
        let getActions = document.querySelector(".actions");
        let getEnemy = document.querySelector(".enemy");
        
        //create Enemy
        let enemy00 = new Enemy("Robo Troll", 200, 0, 150, 100, 100);
        let enemy01 = new Enemy("Yester Goblin", 150, 0, 180, 120, 140);

        let chooseRandomEnemy = Math.floor(Math.random() * Math.floor(2));

        switch (chooseRandomEnemy) {
            case 0:
                enemy = enemy00
                break;
            case 1:
                enemy = enemy01
                break;
        }
        getHeader.innerHTML = '<p>Task: Choose your move</p>';
        getActions.innerHTML = '<a href="#" class="btn-prefight" onclick="PlayerMoves.calcAttack()"> Attack enemy! </a>';
        getEnemy.innerHTML = '<img src="img/avatar-enemy/' + 
        enemy.enemyType.toLowerCase() + '.png" alt="' + enemy.enemyType + '" class="img-avatar"><div><h3>' + 
        enemy.enemyType + '</h3><p class="health-enemy"">Health: ' + enemy.health +  '</p><p>Mana: ' + 
        enemy.mana +  '</p><p>Strength: ' + enemy.strength +  '</p><p>Agility: ' + 
        enemy.agility +  '</p><p>Speed: ' + enemy.speed +  '</p></div>';
    }
}