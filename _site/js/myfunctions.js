function myChange(){

}

$('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    console.log($anchor.attr('href'))
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
});

console.log('This one!')
