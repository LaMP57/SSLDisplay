chrome.tabs.query({active:true, currentWindow: true}, function (tabs){
	var tab = tabs[0];
	if(tab.url.indexOf("https")===0){
		var url = new URL(tab.url)
		var domain = url.hostname
		if (url.port != "") {
			var port = url.port
		} else {
			var port = "443"
		}
		$.get(
			"https://cert.catbox.io/api/v1/query",
			{domain: domain, port: port},
			function(data) {
				document.getElementById('subjectCN').innerHTML = data.Subject.CN;
				document.getElementById('issuerCN').innerHTML = data.Issuer.CN;
				document.getElementById('issuerO').innerHTML = data.Issuer.O;
				document.getElementById('notBefore').innerHTML = data.NotBefore;
				document.getElementById('notAfter').innerHTML = data.NotAfter;
				document.getElementById('SAN').innerHTML = data.AltName;
				document.getElementById('algorithm').innerHTML = data.Algorithm;
				document.getElementById('SN').innerHTML = data.SN;
				document.getElementById('SHA256').innerHTML = '<a href="https://censys.io/certificates/' + data.SHA256 + '">' + data.SHA256.substring(0, 29) + '...</a>';
				document.getElementById('subjectO').innerHTML = data.Subject.O;
				if (data.Subject.O == "") {
				    document.getElementById('subjectOLine').style.display = 'none';
				}
			},
			"json"
		);
	};
});

$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
});