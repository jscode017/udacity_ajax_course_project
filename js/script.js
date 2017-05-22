
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
	var streetStr=$("#street").val();
	var cityStr=$("#city").val();
	var address=streetStr+", "+cityStr;
	$greeting.text("so you want to live at"+address+"?");
	var address_url='http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
    // load streetview
	$body.append('<img class="bgimg" src="'+address_url+'">');
    // YOUR CODE GOES HERE!
var nytimesurl="https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+'&sort=newest&api-key=5c2e5e53702143e0a3d80ecacd770f9c';
$.getJSON(nytimesurl,function(data){
	$nytHeaderElem.text("New York Times article about"+cityStr);
	articles=data.response.docs;
	
	for(var i=0;i<articles.length;i++)
	{
		
		$nytElem.append('<li class="article">'+'<a href="'+articles[i].web_url+'">'+
		articles[i].headline.main+'<\a>'+'<p>'+articles[i].snippet+'</p>'+'</li>');
	}
}   ).error(function(e)
{
	$nytHeaderElem.text("New York Times articles can't be loaded");
});
var wikiTimeout=setTimeout(function()
{
	$wikiElem.text("wiki_request time out");
},8000 );
var wikiUrl='https://en.wikipedia.org/w/api.php?action=opensearch&search=' +cityStr+'&titles=Main%20Page&prop=revisions&rvprop=content&format=json&callback=wikiCallback';
$.ajax(
{
	url:wikiUrl,
	dataType:"jsonp",
	success:function(response)
	{
		var articleurls=response[1];
		for(var i=0;i<articleurls.length;i++)
		{
			$wikiElem.append('<li>'+'<a href="https://en.wikipedia.org/wiki/'+articleurls[i]+'">'+articleurls
			+'</a>'+'</li>');
		}
		clearTimeout(wikiTimeout);
	}
	
});
   return false;
};

$('#form-container').submit(loadData);
