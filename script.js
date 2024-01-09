let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let closeIcon = document.querySelector(".close-icon");

let msg = document.querySelector("#msg");

let count = 0;

let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
    } 
    else {
        box.innerText = "X";
        turnO = true
    }
    box.disabled = true;
    count += 1;
    checkWinner (count);
    });
});


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if (pos1Val ==  pos2Val && pos2Val == pos3Val)
            {
                // console.log("Winner");
                popupWindow(1,pos1Val);  /*Show pop up window*/
                // disableBoxes();
            }
            else if (count == 9)
            {
                popupWindow(1,"")
            }
        }
    }
}

const popupWindow = (x,winner) => 
{let popupWindow = document.getElementById("popupWindow");
    if (x == 1)
    {
        if (winner == "")
        {
            msg.innerText="Draw";
            popupWindow.style.visibility = "visible";
        }
        else
        {
            msg.innerText=`Congratulations, Winner is ${winner}`;
            popupWindow.style.visibility = "visible";
            
        }
        disableBoxes();   
    }
    else
    {
        popupWindow.style.visibility = "hidden"; 
    }
 
}


const resetGame = () =>
{
    turnO = true;
    enableBoxes();
    popupWindow(0);
}

const disableBoxes = () =>
{
    for (let box of boxes)
    {
        box.disabled = true;
        // box.innerText="";
    }
}

const enableBoxes = () =>
{
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerText="";
    }
}

resetBtn.addEventListener("click",resetGame);  /*We can use onclick (like we used in newGame btn)*/
closeIcon.addEventListener("click",popupWindow); /*no arguments and it will return 0 by default , so no popup window will show up*/
