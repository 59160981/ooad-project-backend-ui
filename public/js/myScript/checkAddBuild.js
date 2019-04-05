function checkValue(){
    var buildID = document.getElementsByName("buildID")[0].value;
    var correct = 0;

    if(buildID == ""){
        document.getElementById("txtBuildID").innerHTML = "* กรุณากรอกข้อมูล";
        document.getElementById("txtAlertBuildID").innerHTML = "";
    }else{
        document.getElementById("txtBuildID").innerHTML = "";
        correct++;
    }

    if(correct == 1){
        document.getElementById("addBuild").submit(); 
    }
    
}