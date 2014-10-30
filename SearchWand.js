 function showpics(){
  var searchItem= $('#box').val();
  
  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
        format: 'json',
        method: 'flickr.photos.search',
        api_key: 'aaef7ba49ed66ee692bbe39db50697ed',
        tags: ''+ searchItem,
        tagmode: 'all',
        per_page: perpage,
        page: currentPage
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
}).done(function (data) {
		
		// IF AJAX CALLS IS SUCCESSFUL
	
	 if(data.stat!="fail") {	
	
$("#container").hide().html(data).fadeIn('slow');

// LOOP THROUGH THE RESULT

$.each(data.photos.photo, function (index, photo) {
	
	//BUILD THE URL OF THE PHOTO
	
    var    url = 'https://farm' + photo.farm + '.static.flickr.com/' +
            photo.server + '/' + photo.id + '_' + photo.secret+'_m_d.jpg';
       
   // CREATE DIV <IMG/> TO DISPLAY PHOTO 	
                 
            $("<img/>").attr("src", url).appendTo("#container");

    }); 
    setTimeout(function(){ showImg($('#container'))}, 100);
     }
 
 else {$("#container").empty();}
 
 });
}

function showImg(el)
{
    el.fadeIn('slow');
    if(el.next().is('a'))
    {
        setTimeout(function(){ showImg(el.next())}, 100);
    }
    
     Tooltip();
     
}  // END OF showpics()

var perpage=50;
var currentPage=1;


$(window).scroll(function() {
	
   if ($(window).scrollTop() == $(document).height()-$(window).height()){
   		 
          showpics();
          currentPage++;
        }
        
    });
    
     // FUNCTION FOR TOOLTIP
    
function Tooltip() {

$('img').hover(function(){
        // Hover over code
       
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip').css({ top: mousey, left: mousex })
});
}
