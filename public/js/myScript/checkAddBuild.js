function checkValue(){
    var buildID = document.getElementsByName("buildID")[0].value;
    var Size = document.getElementsByName("Room").length;
    var correct = 0;

    if(buildID == ""){
        document.getElementById("txtBuildID").innerHTML = "* กรุณากรอกข้อมูล";
    }else{
        document.getElementById("txtBuildID").innerHTML = "";
        correct++;
    }

    for (let i = 0; i < Size; i++) {
        var Room = document.getElementsByName("Room")[i].value;
        if(Room == ""){
            document.getElementsByName("txtRoom")[i].innerHTML = "* กรุณากรอกข้อมูล"
        }else{
            document.getElementsByName("txtRoom")[i].innerHTML = ""
            correct++;
        }
    }

    for (let i = 0; i < Size; i++) {
        var type = document.getElementsByName("type")[i].value;
        if(type == ""){
            document.getElementsByName("txtType")[i].innerHTML = "* กรุณากรอกข้อมูล"
        }else{
            document.getElementsByName("txtType")[i].innerHTML = ""
            correct++;
        }
    }

    for (let i = 0; i < Size; i++) {
        var maxStudent = document.getElementsByName("maxStudent")[i].value;
        if(maxStudent == ""){
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "* กรุณากรอกข้อมูล"
        }else if(maxStudent != parseInt(maxStudent)){
            document.getElementsByName("txtMaxStudent")[i].innerHTML = "* ความจุห้อง ต้องเป็นตัวเลขเท่านั้น";
        }else{
            document.getElementsByName("txtMaxStudent")[i].innerHTML = ""
            correct++;
        }
    }
    var pass = 1+(3*Size);
    if(correct == pass){
        document.getElementById("addBuild").submit(); 
    }
    
}