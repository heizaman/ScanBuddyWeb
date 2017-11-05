$(document).ready(function () {
	getDetails();
});


function getDetails() {
	$.ajax({
		type: "GET",
		url: API_URL + 'complaint/' + addressid,
		success: function(response) {
			console.log(response);
			if(response.status == 'success') {
				showInfo(response.info);
			}
			else {
				alert(response.message || "Error!");
				window.location.replace('/');
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}


function showInfo(info) {
	$("#objname").html(info[0].objname);
	$("#objno").html(info[0].objno);
	$("#department").html(info[0].department);
	$("#address").html(info[0].address);
	$("#links").html(`
		<span class="logo">
            <a href="`+info[0].website+`" target="_blank"><img src="http://navigatebydesign.com/wp-content/uploads/2015/06/grey_new_seo2-04-512.png" id="web"></a></span>
            <span class="logo">
            <a href="`+info[0].fblink+`" target="_blank">
            <img src="https://www.shareicon.net/download/2015/09/23/106006_logo_512x512.png" id="fb"></a></span>
            <span class="logo" >
            <a href="`+info[0].instalink+`" target="_blank">    
            <img src="http://pluspng.com/img-png/instagram-png-instagram-logo-512.png" id="insta"></a></span>
            <span class="logo">
            <a href="`+info[0].twitterlink+`" target="_blank"><img src="https://s3.amazonaws.com/rsportz-production/file_assets/attachments/000/006/534/original/Twitter-Logo-Wallpaper-8.png" id="twitter"></a>
        </span>
    `);

	var historyhtml = ``;

	for (var i = info.length - 1; i >= 0; i--) {
		historyhtml += `<p>` + info[i].complaint + ` registered at ` + info[i].timestamp + `.</p><br /><br />`;
	}

	$("#history").html(historyhtml);
}