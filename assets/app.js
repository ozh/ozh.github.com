var start_angle = 0;
	
$(document).ready(function($) {
	get_repos();

	
	// bind resize with place_divs
});

function get_repos(){
	// https://api.github.com/users/ozh/repos
	// http://127.0.0.1/repos.json.php
    $.getJSON('http://127.0.0.1/repos.json.php?user=leo', function( repos ){
		$('#num-repos').text( repos.length );
		
		$.each(repos, function (i, repo) {
			var lang = '';
			if( repo.language != null ){
				repo.language = repo.language.replace( '+', 'plus' );
				console.log( repo.language );
				lang = '<span class="repo_details repo_lang '+repo.language+'">' + repo.language + '</span>';
			}
			var $item = $('<div class="repo" id="repo_'+i+'"/>');
			var $link = $('<a class="box '+repo.language+'" href="' + repo.html_url + '" />');
			$link.append('<h2 class="name '+repo.language+'"><p>' + repo.name + '</p></h2>');
			$link.append('<span class="repo_details repo_stars">' + repo.watchers + ' &#9733;</span>' + lang + '</p>');
			$link.append('<span class="repo_details repo_desc">' + repo.description + '</span>');
			$link.appendTo($item);
			$item.appendTo('#clock');
			
		});
		
		place_divs();

	});

}

function place_divs(){
	// Resize clock
	var clock_w = parseInt( Math.min( $(window).height(), $(window).width() ) * 0.7 ) + 'px';
	$('#clock').css( {width: clock_w, height: clock_w } );

	// Place divs
	var elems = $('div.repo');
	var increase = Math.PI * 2 / elems.length;
	var x = 0, y = 0, angle = start_angle;
	
	// Get clock width, top, left, border
	var c_w = $('#clock').css('width').replace('px', '');
	var c_t = $('#clock').offset().top;
	var c_l = $('#clock').offset().left;
	var c_b = parseInt( $('#clock').css('border-left-width') );

	// Get numbers & center div width & height
	var num_w = $('div.repo').width();
	var num_h = $('div.repo').height();
	var center_w = $('#center').width();
	var center_h = $('#center').height();

	// Position divs on #clock
	for (var i = 0; i < elems.length; i++) {
		var elem = elems[i];
		x = parseInt( c_w / 2 ) * Math.cos(angle) + parseInt( c_l + c_w / 2 + c_b - num_w / 2 ) ;
		y = parseInt( c_w / 2 ) * Math.sin(angle) + parseInt( c_t + c_w / 2 + c_b - num_h / 2 ) ;
		$(elem).css( {position:'absolute', left:x+'px', top:y+'px'} );
		angle += increase;
	}
	
	// Place #center
	$('#center').css( {
		top:  parseInt( c_w / 2 + c_t / 2 - 2*c_b - center_w ) + 'px',
		left: parseInt( c_w / 2 + c_l / 2 - c_b / 2 - center_h / 2) + 'px',
		'margin-top':  parseInt( c_w / 2 - center_h / 2 ) + 'px',
		'margin-left': parseInt( c_w / 2 - center_w / 2 ) + 'px'
	} );
}

// Shuffle array
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
