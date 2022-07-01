let allGoals = new Array(); 
let selectedGoalIndex = 0;


$("document").ready(function(){
     init();    
});

let init = function(){
    getGoals();
}

let completeGoal = function(){
    closeDialog();
     allGoals[selectedGoalIndex].status = "complete";
     localStorage.setItem("goals", JSON.stringify(allGoals));
     getGoals();
}

let closeDialog=function(){
    $("#popupBasic").popup("close");
}

/*
*       getGoals():  This function retrieves the goals from localStorage
*       and displays them in the user interface.
*/

let getGoals = function(){
    
    //Retrieves goals from localStorage, parses the object as JSON
    // and stores in the savedGoals variable
    let savedGoals = JSON.parse(localStorage.getItem("goals"));
    
    //If no goals are stored, the app has to detect that.  This conditional
    //checks to see if any goals were returned.
    if(savedGoals != "" && savedGoals != null){
        allGoals = savedGoals;  //Copies the goals retrieved to the global goals array
        let output = "<ul data-role='listview' id='goalListView'>";  //Begin building output
        output += "<li data-role='list-divider'>Incomplete Goals</li>"; //Add divider
        
        //The goals are stored in the global array allGoals.  This line will loop through
        //the array and access each individual goal.
        for(var x = 0; x < allGoals.length; x++){
        
        //As goals are looped through, in this first pass we're only going to parse
        //goals with the status complete.
        if(allGoals[x].status != "complete"){
            let goalText = parseGoal(allGoals[x]);  //Get the text from the goal object
            let rawDate = allGoals[x].date;  //Get the raw date from the goal object
            output = output +  "<li onclick='editGoal(" + x + ")'>" + goalText + "</li>";
        }
        }
        output += "<li data-role='list-divider'>Complete Goals</li>";
        for(var x= 0; x < allGoals.length; x++){
        if(allGoals[x].status == "complete"){
            let goalText = parseGoal(allGoals[x]);
            let rawDate = allGoals[x].date;
            output = output +  "<li><strike>" + goalText + "</strike></li>";
        }
        }

        output += "</ul>"
        console.log(output);
        $("#goalsList").html(output);
        $("#goalListView").listview().trigger("create");
    }
}

let editGoal = function(goalIndex){
    $("#popupBasic").popup("open");
    selectedGoalIndex = goalIndex;
}

let parseGoal = function(goalText) {
    console.log(goalText);
    let goalDate = new Date(goalText.date);
    let month = goalDate.getMonth();
    let day = goalDate.getDate();
    let year = goalDate.getFullYear();
    let text = goalText.goalText;
    let out = (month+1) + "/" + day + "/" + year +  "<br/>";
    out += "<h2>" + text + "</h2>";
    return out;
}

let saveGoal = function(){
    console.log("saveGoal()");
    let goalText = document.getElementById("goal").value;
    let theGoal = new Goal(Date.now(),goalText, "incomplete" );
    allGoals.push(theGoal);
    localStorage.setItem("goals", JSON.stringify(allGoals));
    getGoals();
    $("#goal").val("");
}

let newDay = function(){
    allGoals = [];
    localStorage.setItem("goals", JSON.stringify(allGoals));
    $("#goalListView").html("");

}

let btnGoalSave = $("#btnSave");
let btnNewDay = $("#btnNewDay");
$("#btnSave").bind("click", saveGoal);
$("#btnNewDay").bind("click", newDay);

