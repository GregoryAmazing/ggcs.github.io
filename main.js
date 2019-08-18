$.ajax({
	type:"GET", 
	url: "https://api.github.com/repos/romanovsky-g/romanovsky-g.github.io/contents/", 
	success: function(data) {
		  $("body").append(JSON.stringify(data));
	    }, 
	error: function(jqXHR, textStatus, errorThrown) {
		  alert(jqXHR.status);
	    },
     dataType: "jsonp"
  });​​​​​​​​​​​​​​​