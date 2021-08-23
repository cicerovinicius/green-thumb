window.$ = window.jQuery = require("jquery");
require("slick-carousel");

const app = {
    breakpoints: {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 991px)',
        desktop: '(min-width: 992px)'
    },

    plugins: {
        slick: {
            slidePlants:  function(enabled){
				if(enabled){
					if($('#results-area').hasClass('slick-initialized')){
						$('#results-area').slick('reinit');
					}else{
						$('#results-area').slick({
                            centerMode: true,
                            autoplay: false,
                            dots: false,
                            infinite: false,
                            mobileFirst: true,
                            arrows: false,
                            autoplaySpeed: 8000,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            speed: 500,
							responsive: [{
								breakpoint: 768,
								settings: 'unslick'
							}]
						});
					}
				}
            },
        }
    },
    
    functions: {
        selectList: function(){
            $('.select-box.open').on('click', function(e){
                e.stopPropagation();
                $(this).removeClass('open');
            });
            
            $('.select-label-list .select-label').on('click', function(){
                $(this).parent('.select-box').removeClass('open');
            });
            
            $(document).on('click', function(e) {
                var target = e.target;
                if ( (!$(target).is('.select-box') && !$(target).parents().is('.select-box')) || $(target).is('.select-box.open')) {
                    $('.select-box').removeClass('open');
                }else{
                    if ($(target).is('.select-text') || $(target).is('.select-option')){
                        if (!$(target).parents('.select-box').hasClass('open')){
                            $(target).parents('.select-box').addClass('open');
                        }
                    }
                }
            });

            app.functions.onSelectChange();
        },

        onSelectChange: function(){
            $('input.select-radio').on('change', function() {
                let sun = $('input[name="sun"]:checked').val(),
                    pets = $('input[name="pets"]:checked').val(),
                    water = $('input[name="water"]:checked').val();
    
                if(sun == 'unselected' && pets == 'unselected' && water == 'unselected'){
                    $('#results').addClass('hidden');
                    $('#no-results').removeClass('hidden');
                    document.getElementById('results-area').innerHTML = "";
                }else{
                    let data = {
                        sun: (sun == 'unselected')? 'no' : sun, 
                        pets: (pets == 'unselected')? 'false' :pets, 
                        water: (water == 'unselected')? 'regularly' :water
                    };
                    app.functions.loadPlants(data);
                    $('#no-results').addClass('hidden');
                    $('#results').removeClass('hidden');
                }
            });
        },
        
        loadPlants: function(data){
            let sun = data.sun || 'no',
                pets = data.pets || 'false',
                water = data.water || 'regularly';
            let request = new XMLHttpRequest();
            
            request.open('get', 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun='+ sun +'&water='+ water +'&pets='+ pets);
            request.onload = () => {
                const json = JSON.parse(request.responseText);

                if(json.status && json.status === 404){
                    $('#no-results').removeClass('hidden');
                    $('#results').addClass('hidden');
                    document.getElementById('results-area').innerHTML = "";
                }else{
                    document.getElementById('results-area').innerHTML = app.functions.showPlants(json);
                }
                app.functions.activeSlider();
            }
            request.send(null);
        },
        
        showPlants: function(data){
            let plantsList = '';
            let featuredPlants = '';
            
            for (let i = 0; i < data.length; i++) {
                let plant = '<li class="result"><div class="wrap">';
                
                if(data[i].staff_favorite){
                    plant += '<span class="favorite">&#10024; Staff favorite</span>';
                }

                plant += '<div class="img"><img src="' + data[i].url + '" alt="plant" title="green thumb" /></div>'
                + '<h2 class="name" title="' + data[i].name + ' | green thumb">'+ data[i].name + '</h2>'
                + '<div class="price-types">'
                + '<span class="price">$' + data[i].price + '</span>'
                + '<ul class="types">'
                + '<li class="type dog" data-status="' + data[i].toxicity + '" title="'+ ((data[i].toxicity)? 'toxic' : 'non-toxic') +'"></li>'
                + '<li class="type sunlight" data-status="' + data[i].sun + '" title="' + data[i].sun + ' sunlight"></li>'
                + '<li class="type water" data-status="' + data[i].water + '" title="water ' + data[i].water + '"></li>'
                + '</ul></div>'
                + '</div></li>';

                if(data[i].staff_favorite){
                    featuredPlants += plant;
                }else{
                    plantsList += plant;
                }
            }
            plantsList = featuredPlants + plantsList;
            return plantsList;
        },

        activeSlider: function(){
            if(app.functions.checkDevice('mobile')){
				app.plugins.slick.slidePlants(true);
			}else{
				app.plugins.slick.slidePlants(false);
			}

			$(window).on('resize', function() {
				if(app.functions.checkDevice('mobile')){
					app.plugins.slick.slidePlants(true);
				}else{
					app.plugins.slick.slidePlants(false);
				}
			});
        },

        smoothAncora: function (){
			$(".anchor").on('click', function(event){
                let hash = $(this).attr('data-scroll-to');
                $('html, body').animate({
                    scrollTop: ($(hash).offset().top)
                }, 800, function(){
                    window.location.hash = hash;
                });
            });
        },

        checkDevice: function(device) {
            device = app.breakpoints[device];
            return window.matchMedia(device).matches ? true : false;
        },
    },
    
    init: function(){
        $(document).ready(function () {
            app.functions.smoothAncora();
            app.functions.selectList();
        });
    }
}

window.app = app;
app.init();