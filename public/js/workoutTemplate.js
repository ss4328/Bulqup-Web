console.log("WorkoutTemplate.js connected")

function levelchanged(elem, count){
    console.log("Levelchanged called." + " LevelchangedElem: " + elem.id + ", count: " + count);
    
    var repIDElem = $('#repcountID');
    
    repIDElem.text((parseInt(count))/5);
}