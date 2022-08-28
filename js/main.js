class Panel{
    static writeFigureOnPanel(){
        let panels = document.getElementsByClassName("field");
        for (let i = 0; i < panels.length; i++){
            panels[i].addEventListener("click", function(){
                console.log(panels[i].id);
                let img = document.createElement("img");
                turn = Game.turnManager(turn);
                if (!panelManagerInfo.field[parseInt(panels[i].id)]) img.src = Panel.decideFigure(turn);
                Game.updatePanelInfo(turn, panels[i].id);
                Game.judge(panelFirstInfo);
                Game.judge(panelSecondInfo);
                panels[i].append(img);
                console.log(panelFirstInfo.field, panelSecondInfo.field, panelManagerInfo.field)
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
        if (turnCount > 9) return console.log("引き分け");
        return turnCount + 1;
    }

    static updatePanelInfo(turn, id){
        if (turn % 2 == 0 && !panelManagerInfo.field[parseInt(id)]) panelFirstInfo.field[parseInt(id)] = true;
        else if(!panelManagerInfo.field[parseInt(id)]) panelSecondInfo.field[parseInt(id)] = true;

        panelManagerInfo.field[parseInt(id)] = true;
    }
    
    static judge(panelInfo){
        let count = 0;
        for (let i = 0; i < winPatterns.length; i++){
            for (let j = 0; j < winPatterns[i].length; j++){
                if (panelInfo.field[winPatterns[i][j]] == true) count++;
            }
            if (count >= 3 && panelInfo.order == "first") console.log("先攻の勝利");
            if (count >= 3 && panelInfo.order == "second") console.log("後攻の勝利");
            else count = 0;
        }
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

let panelFirstInfo = new Game("first");
let panelSecondInfo = new Game("second");
let panelManagerInfo = new Game("Master");

let turn = Game.turnManager(0);
Panel.writeFigureOnPanel();