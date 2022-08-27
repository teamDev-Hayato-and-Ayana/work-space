class Button{
    static detectPanel(){
        let panels = document.getElementsByClassName("field");

        for (let i = 0; i < panels.length; i++){
            panels[i].addEventListener("click", function(){
                console.log(panels[i].id);
            })
        }
    }
}
let panels = document.getElementsByClassName("field");

console.log(panels)
Button.detectPanel();

// let panel = document.querySelectorAll(".field");
// console.log(panel)