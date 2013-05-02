(function($){
    $.fn.postcard_b = function(config){
        config = $.extend( { s: 1/3 }, config );
        var width = 1500;
        var height = 1000;

        this.each(function(){
            var _this = $(this);
            
            _this.css({
                "position": "relative",
                "width": width * config.s + "px",
                "height": height * config.s + "px"
            });

            //
            _this.append('<img class="background" src="./img/nopost.png" alt="" />');
            _this.children(".background").css({
                "width": width * config.s + "px",
                "height": height * config.s + "px"
            });


            //
            _this.append(
                '<div class="receiver-postcode">'+
                    '<div class="c-1">2</div>'+
                    '<div class="c-2">1</div>'+
                    '<div class="c-3">0</div>'+
                    '<div class="c-4">0</div>'+
                    '<div class="c-5">1</div>'+
                    '<div class="c-6">2</div>'+
                '</div>'
            );
            _receiver_postcode = _this.children(".receiver-postcode");
            _receiver_postcode.css({
                "position": "absolute",
                "width": (620*config.s)+"px",
                "height": (126*config.s)+"px",
                "left": (106*config.s)+"px",
                "top": (74*config.s)+"px"
            });
            _receiver_postcode.children('[class*="c-"]').css({
                "position": "absolute",
                "font-size": (65*config.s)+"px",
                "width": (68*config.s)+"px",
                "top": (22*config.s)+"px",
                "padding-left": (18*config.s)+"px",
                "padding-top": (8*config.s)+"px",
                "border":"none",
                "outline": "none"
            });
            _receiver_postcode.children('.c-1').css({"left": (24*config.s)+"px"});
            _receiver_postcode.children('.c-2').css({"left": (124*config.s)+"px"});
            _receiver_postcode.children('.c-3').css({"left": (224*config.s)+"px"});
            _receiver_postcode.children('.c-4').css({"left": (326*config.s)+"px", "width":(66*config.s)+"px"});
            _receiver_postcode.children('.c-5').css({"left": (426*config.s)+"px", "width":(66*config.s)+"px"});
            _receiver_postcode.children('.c-6').css({"left": (526*config.s)+"px", "width":(66*config.s)+"px"});

            //
            _this.append('<div class="blessings">传说中的不打不相识很</div>');
            var _blessings = _this.children(".blessings");
            _blessings.css({
                "position": "absolute",
                "top": (210*config.s)+"px",
                "left": (104*config.s)+"px",
                "width": (640*config.s)+"px",
                "padding": (12*config.s)+"px",
                "font-size": (37*config.s)+"px",
                "box-sizing": "border-box"
            });
            _blessings.editable({
                limit: 140
            });

            //
            _this.append('<div class="sender-address">江西抚州临川区东华理工大学</div>');
            var _sender_address = _this.children(".sender-address");
            _sender_address.css({
                "position": "absolute",
                "left": (824*config.s)+"px",
                "bottom": (212*config.s)+"px",
                "width": (600*config.s)+"px",
                "padding": (8*config.s)+"px",
                "font-size": (32*config.s)+"px",
                "box-sizing": "border-box"
            });
            _sender_address.editable({
                limit: 20,
                counter_place: "top"
            });

            //
            _this.append('<div class="receiver-box"><div class="receiver">王五</div></div>');
            var _receiver_box = _this.children(".receiver-box");
            _receiver_box.css({
                "position": "absolute",
                "left": (824*config.s)+"px",
                "bottom": (332*config.s)+"px",
                "width": (600*config.s)+"px",
                "text-align": "center"
            });
            _receiver_box.children(".receiver").css({
                "box-sizing": "border-box",
                "font-size": (50*config.s)+"px",
                "padding": (8*config.s)+"px"
            });
            _receiver_box.children(".receiver").editable({
                limit: 10,
                counter_place: "top"
            });

            //
            _this.append('<div class="receiver-address">江苏无锡江阴市颐新华都37幢202室</div>');
            var _receiver_address = _this.children(".receiver-address");
            _receiver_address.css({
                "box-sizing": "border-box",
                "font-size": (32*config.s)+"px",
                "position": "absolute",
                "left": (824*config.s)+"px",
                "bottom": (452*config.s)+"px",
                "width": (600*config.s)+"px",
                "padding": (8*config.s)+"px"
            });
            _receiver_address.mouseover(function(){
                $(this).css({
                    'outline':'1px solid #ccc',
                    'cursor':'pointer'
                });
            });
            _receiver_address.mouseout(function(){
                if(_receiver_address_dialog.css('display')=='none'){
                    $(this).css({
                        'outline':'0px',
                        'cursor':'default'
                    });
                }
            });
            _receiver_address.click(function(){
                if(_receiver_address_dialog.css('display')=='none'){
                    _receiver_address_dialog.slideDown();
                }else{
                    _receiver_address_dialog.slideUp();
                }
            });

            _this.append('<div class="receiver-address-dialog"></div>');
            var _receiver_address_dialog = _this.children(".receiver-address-dialog");
            _receiver_address_dialog.css({
                "width": "400px",
                "background-color": "whitesmoke",
                "padding": "8px",
                "position": "absolute",
                "left": (822*config.s)+"px", 
                "top": (552*config.s)+"px",
                "display": "none"
            });
            _receiver_address_dialog.address({
                ok: function(address, postcode){
                    _receiver_address.html(address);

                    //
                    for(var i=0;i<postcode.length;i++){
                        _receiver_postcode.children('.c-'+(i+1)).html(postcode.charAt(i));
                    }

                    _receiver_address.css({
                        'outline':'0px',
                        'cursor':'default'
                    });
                },
                cancel: function(){
                    _receiver_address.css({
                        'outline':'0px',
                        'cursor':'default'
                    });
                }
            });



        });

        return this;
    };
})(jQuery);