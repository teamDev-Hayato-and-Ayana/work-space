const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

class Panel{
    static writeFigureOnPanel(){
        let panels = document.getElementsByClassName("field");

        for (let i = 0; i < panels.length; i++){
            panels[i].addEventListener("click", function(){
                console.log(panels[i].id);
                let img = document.createElement("img");
                turn = Game.turnManager(turn);
                console.log(turn);
                img.src = Panel.decideFigure(turn);
                panels[i].append(img);
            })
        }
    }

    static decideFigure(currentTurn){
        
        if (currentTurn % 2 == 0) return "img/マル２.svg";
        else return "img/バツ２.svg";
    }
}

class Game{
    constructor(order){
        this.order = order;
    }

    static turnManager(turnCount){
        if (turnCount > 8) return this.judge();

        return turnCount + 1;
    }

    static judge(){
        console.log("引き分け");
    }

    static firstPlyersPanelInfomation(){
        
    }
}
let panels = document.getElementsByClassName("field");
let turn = Game.turnManager(0);
Panel.writeFigureOnPanel();
// let panel = document.querySelectorAll(".field");
// console.log(panel)