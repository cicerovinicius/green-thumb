window.$ = window.jQuery = require("jquery");

const app = {
    breakpoints: {
        mobile: '(max-width: 767px)',
        tablet: '(min-width: 768px) and (max-width: 991px)',
        desktop: '(min-width: 992px)'
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
        },
        
        loadPlants: function(data){
            let sun = data.sun || 'no',
                pets = data.pets || 'false',
                water = data.water || 'regularly';
            let request = new XMLHttpRequest();
            
            request.open('get', 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun='+ sun +'&water='+ water +'&pets='+ pets);
            request.onload = () => {
                console.log(JSON.parse(request.responseText));
                const json = JSON.parse(request.responseText);
                // document.getElementById('results-area').innerHTML = showPlants(json);
                document.getElementById('results-area').innerHTML = app.functions.showPlants(json);
                // document.getElementById('results-area').innerHTML = json;
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
                + '<li class="type dog" data-status="' + data[i].toxicity + '"></li>'
                + '<li class="type sunlight" data-status="' + data[i].sun + '"></li>'
                + '<li class="type water" data-status="' + data[i].water + '"></li>'
                + '</ul></div>'
                + '</div></li>';
                // plantsList += plant;

                if(data[i].staff_favorite){
                    featuredPlants += plant;
                }else{
                    plantsList += plant;
                }
            }
            plantsList = featuredPlants + plantsList;
            return plantsList;
        }
    },
    
    init: function(){
        console.log('init');
        $(document).ready(function () {
            app.functions.selectList();
        });
    }
}

window.app = app;
app.init();
