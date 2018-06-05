/* global $ */

// function submitDataToDB(){
	
// 	// var data = new FormData();
// 	// data.append('user', 'person');
// 	// data.append('pwd', 'password');
// 	// data.append('organization', 'place');
// 	// data.append('requiredkey', 'key');
	
// 	var http = new XMLHttpRequest();
// 	var url = "/populateTables";
// 	var params = "lorem=ipsum&name=binny";
// 	http.open("POST", url, true);
	
// 	//Send the proper header information along with the request
// 	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
// 	http.onreadystatechange = function() {//Call a function when the state changes.
// 	    if(http.readyState == 4 && http.status == 200) {
// 	        alert(http.responseText);
// 	    }
// 	    else{
// 	    	alert('error');
// 	    }
// 	}
// 	http.send(params);
// }	
	
	// alert("HEY!");
	// var URL = '/populateTables';
	// var name = $('#workoutName').val();
	// $.ajax({
	// 	type: 'POST',
 //       url: URL,
 //       dataType: 'html',
 //       data: 
 //       {
 //           'name': name,
 //       },
 //       success: function(msg) {
 //           alert('success');
 //       },
 //       error: function(xhr, ajaxOptions, thrownError) {
 //           console.log(thrownError);
 //           console.log(xhr.responseText);
 //           alert('Error while connecting to the server!' + name);
 //       }
	// });
//}