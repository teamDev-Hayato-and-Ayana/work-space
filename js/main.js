class Panel{
    static writeFigureOnPanel(){
        let panels = document.getElementsByClassName("field");
        for (let i = 0; i < panels.length; i++){
            panels[i].addEventListener("click", function(){
                if (!Game.isFinish()){
                    console.log(panels[i].id);
                    let img = document.createElement("img");
                    turn = Game.turnManager(turn);
                    
                    if (!panelManagerInfo.field[parseInt(panels[i].id)]) img.src = Panel.decideFigure(turn);
                    else turn--;

                    Game.updatePanelInfo(turn, panels[i].id);
                    Game.judge(panelFirstInfo);
                    Game.judge(panelSecondInfo);
                    let result = document.getElementById("resultText");
                    if (Game.isDraw() && !Game.isFinish()) {
                        console.log("引き分け");
                        result.innerHTML = "引き分け";
                    };
            
                    panels[i].append(img);
                    console.log(panelFirstInfo.field, panelSecondInfo.field, panelManagerInfo.field)
                }
            });
        };
    };

    static decideFigure(currentTurn){
        if (currentTurn % 2 == 0) return "img/マル２.svg";
        else return "img/バツ２.svg";
    }
}

class Game{
    constructor(order){
        this.order = order;
        this.field = {
            0 : false,
            1 : false, 
            2 : false, 
            3 : false, 
            4 : false, 
            5 : false,
            6 : false,
            7 : false,
            8 : false,
        }
    }

    static turnManager(turnCount){
        return turnCount + 1;
    }

    static updatePanelInfo(turn, id){
        if (turn % 2 == 0 && !panelManagerInfo.field[parseInt(id)]) panelFirstInfo.field[parseInt(id)] = true;
        else if(!panelManagerInfo.field[parseInt(id)]) panelSecondInfo.field[parseInt(id)] = true;

        panelManagerInfo.field[parseInt(id)] = true;
    }
    
    static judge(panelInfo){
        let count = 0;
        let result = document.getElementById("resultText");

        for (let i = 0; i < winPatterns.length; i++){
            for (let j = 0; j < winPatterns[i].length; j++){
                if (panelInfo.field[winPatterns[i][j]] == true) count++;
            }
            if (count >= 3 && panelInfo.order == "First" && !this.isFinish()) {
                console.log("先攻の勝利");
                result.innerHTML = "先攻の勝利";
                confetti();
                Animation.hubuki();
            }
            if (count >= 3 && panelInfo.order == "Second" && !this.isFinish()) {
                console.log("後攻の勝利");
                result.innerHTML = "後攻の勝利";
                confetti();
                Animation.hubuki();
            }
            else count = 0;
        }
    }
    static isDraw(){
        let managerPanelValues = Object.values(panelManagerInfo.field);
        for (let i = 0; i < managerPanelValues.length; i++){
            if (managerPanelValues[i] == false) return false;
        }

        return true;
    }
    static isFinish(){
        let result = document.getElementById("resultText");
        return result.innerHTML != "ゲーム中…";
    }

    static start(){
        Panel.writeFigureOnPanel();
    }
}

class Animation{
    static hubuki(){
        (function confettiAnime() {
            confetti({
              origin: {
                x: Math.random(),
                y: 0
              }
            })
            setTimeout(function() {
              requestAnimationFrame(confettiAnime)
            }, 100)
          })()
    }
}
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

let panelFirstInfo = new Game("First");
let panelSecondInfo = new Game("Second");
let panelManagerInfo = new Game("Master");

let turn = Game.turnManager(0);
Game.start();
