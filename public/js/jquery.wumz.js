(function($) {
    $.fn.active_textarea = function(config) {
        var width = "100%";
    
        if(config["width"]){
            width = config.width;
        }

        this.each(function() {
            var container = $(this);
            
            var value = container.html();
            container.html('<div>'+value+'</div>'+'<textarea>'+value+'</textarea>');
            
            var a = container.children('div');
            var b = container.children('textarea');

            container.css({
                "width": width,
                "box-sizing": "border-box",
                "padding": "6px 4px 6px 4px"
            });

            var inner_width = container.width();
            a.css({
                "box-sizing": "border-box",
                "font-size": "16px",
                "outline": "none",
                "width": inner_width+"px",
                // "background-color": "red",
                "line-height":"18px",
                "font-family": 'STKaiti, 楷体'
            });

            b.css({
                "box-sizing": "border-box",
                "font-size": "16px",
                "border": "none",
                "outline": "none",
                "resize": "none",
                "display": "none",
                "width": inner_width+"px",
                "margin": 0,
                "padding": 0,
                // "background-color": "blue",
                "line-height":"18px",
                "font-family": 'STKaiti, 楷体'
            });

            container.mouseover(function(){
                $(this).css({
                    'outline':'1px solid rgba(0,0,0,.2)',
                    'cursor':'text'
                });
            });

            container.mouseout(function(){
                $(this).css({
                    'outline':'0px',
                    'cursor':'default'
                });
            });

            a.click(function(){
                var _this = $(this);
                var _this_b = _this.siblings("textarea");

                if(_this_b.css('display')=='none'){
                    //
                    _this.css({'display':'none'});
                    //
                    _this_b.val(_this.html());
                    _this_b.css({
                        'display': 'block',
                        'height': _this.height()
                    });

                    _this_b.focus();
                }
            });

            b.focusout(function(){
                var _this = $(this);
                var _this_a = _this.siblings("div");
                //
                _this_a.html(_this.val());
                //
                _this_a.css({'display':'block'});
                _this.css({'display':'none'});

                //
                // container.css({
                //     'top': 384 - $(".sender-address").height()
                // });
            });

        });

        return this;
    };
})(jQuery);