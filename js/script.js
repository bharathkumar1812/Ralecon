//////////////////////////////// nav-scroll-animation /////////////////////////
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
    } else {
        $('.nav').removeClass('affix');
    }
});

//////////////////////////////// happ-client slider start /////////////////////////

function init_class(current, last, class_nm) {
    if (jQuery('.industries-listing.slick-slider').length) {
        var currentItem = current;
        var last_item = last - 1;
        if (currentItem >= 1 && currentItem != last_item) {
            class_nm.addClass("init-slide");
        }
        if (jQuery(class_nm).find(".slick-slide[data-slick-index='" + last_item + "']").attr('aria-hidden') != 'true') {
            class_nm.addClass("init-slide-last");
            class_nm.removeClass("init-slide");
        } else {
            // class_nm.removeClass("init-slide");
            class_nm.removeClass("init-slide-last");
        }
    }
}

//////////////////////////////// happ-client slider previous next button function /////////////////////////
var $sliderNav = true;
    function slider_nav(){
        if ($(".slider.slick-slider").length) {
            if ($($sliderNav)) {
                $(".slider.slick-slider").append("<span class='next-slide'></span>");
                $(".slider.slick-slider").prepend("<span class='previous-slide'></span>");
                $sliderNav = false;
            }
            
            var dots_width = $(".slider .slick-dots li").outerWidth();
            var dots_left_position = $(".slider .slick-dots li").first().position().left;
            var nav_left_position = (dots_left_position - dots_width);
            var nav_right_position = (dots_left_position - dots_width) - 6; 

            $(".slider .previous-slide").css({left: nav_left_position +'px'});   
            $(".slider .next-slide").css({right: nav_right_position +'px'});

            $(".slider .next-slide").click(function(){
                $(this).parents(".slider.slick-slider").slick('slickNext');
            });
            $(".slider .previous-slide").click(function(){
                $(this).parents(".slider.slick-slider").slick('slickPrev');
            });
        }
    }

$(function() {

        //for slick slider
        $('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            centerMode: true,
            arrows: false,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        centerMode: false,
                    }
                  }
              ],
        })
        .on("swipe", function(event) {
                var currentSlideIndex = jQuery('.industries-listing .slick-current').attr('data-slick-index');
                var last_item = jQuery('.industries-listing .slick-slide').length;
                var _currentclass = jQuery(".industries-listing");
                init_class(currentSlideIndex, last_item, _currentclass);
            });

//////////////////////////////// happ-client slider dot /////////////////////////

        $(".slider .slick-dots").append("<li class='animated-dot'><li>");
        $(".slider .slick-dots li.animation-dot").next("li").remove() 
  
        $(".slick-dots .animated-dot").click(function() {
            $(this).toggleClass("play");
            if ($(this).hasClass("play")) {
                isPause = true;
                $(this).css('background-image', 'url(https://icons.veryicon.com/png/o/file-type/linear-icon-2/pause-34.png)');
                $('.slider').slick('slickPause');
                $bar.css({
                    width: 100 + "%"
                });
            } else {
                isPause = false;
                $(this).css('background-image', '');
                $('.slider').slick('slickPlay');
            }
        });


        var time = 2;
        var $bar,
            isPause,
            tick,
            percentTime;
//////////////////////////////// happ-client slider progress bar////////////////
        $bar = $('.slider-progress .progress');

        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 10);
        }
        function interval() {
            if ($(".slick-dots .animated-dot").hasClass("play")) {
                isPause = true;
            }
            if (isPause === false) {
                percentTime += 1 / (time + 0.1);
                $bar.css({
                    width: percentTime + "%"
                });

                if (percentTime >= 100) {
                    $(".slider").slick('slickNext');
                    startProgressbar();
                }
            }
        }
//////////////////////////////// happ-client slider progress bar function /////////////////////////
        function resetProgressbar() {
            $bar.css({
                width: 0 + '%'
            });
            clearTimeout(tick);
        }

        startProgressbar();

        $(".slider").on("beforeChange", function() {
            resetProgressbar();
            startProgressbar();
            $bar.css({
                width: 100 + "%"
            });
        });
  
    slider_nav();

    });
//////////////////////////////// happ-client slider end /////////////////////////
//////////////////////////////// faq start end /////////////////////////
$(".accordion-wrapper .btn-wrapper button").click(function () {
    $(this).parent().siblings().slideToggle("slide");
    $(this).parent().parent().toggleClass("active");
    $(this).parent().parent().siblings().removeClass("active");
    $(this)
      .parent()
      .parent()
      .siblings()
      .children(".collepsing-div")
      .slideUp("medium");
  });
//////////////////////////////// faq end /////////////////////////
//////////////////////////// counter start  ////////////////////////////////////////
gsap.utils.toArray(".counts").forEach(element => {
    let clean = v => (v + "").replace(/[^\d\.-]/gi, ""), // get rid of anything except numbers and periods
        num = clean(element.getAttribute("data-number")),
        decimals = (num.split(".")[1] || "").length,
        proxy = {val: parseFloat(clean(element.innerText)) || 0};
    gsap.to(proxy, {
      val: +num,
      duration: 2,
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none none"
      },
      onUpdate: () => element.innerText = formatNumber(proxy.val, decimals)
    });
  });
  
  function formatNumber(value, decimals) {
    let s = (+value).toLocaleString('en-US').split(".");
    return decimals ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals) : s[0];
  }
/////////////////////////////////////////// counter end ////////////////////////////////////

$('#show-slow').click(function() {
    $('#show-slow').hide(0);
    $('#hide-slow').show(0);
});
$('#hide-slow').click(function() {
    $('#show-slow').show(0);
    $('#hide-slow').hide(0);
});
