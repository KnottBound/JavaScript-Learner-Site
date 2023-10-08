function startGame(){
    myGameArea.start();
}

let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1080;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        let containerDiv = document.getElementById("game-canvas");
        containerDiv.appendChild(this.canvas);
    }
}