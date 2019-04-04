
function checkValue() {
    var buildID = document.getElementsByName("buildID")[0].value;
    var correct = 0;

    // checkNull
    if (buildID == "") {
        document.getElementById("txtbuildID").innerHTML = "* กรุณากรอกข้อมูล";
    }else{
        document.getElementById("txtbuildID").innerHTML = "";
        correct++;
    }
    if(correct==1){
        document.getElementById("editBuild").submit();    
    }
}
