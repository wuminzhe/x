

(function($){
    var show_out = function(target){
        target.css({
            'outline':'1px solid #ccc',
            'cursor':'text'
        });

        var words_left = target.siblings(".words-left");
        if(words_left){
            words_left.css("display", "block");
        }
    };

    var hide_out = function(target){
        target.css({
            'outline':'0px',
            'cursor':'default'
        });

        var words_left = target.siblings(".words-left");
        if(words_left){
            words_left.css("display", "none");
        }
    }



    $.fn.editable = function(config){
        config = $.extend( {padding: "4px", limit: null, counter_place: "bottom"}, config);

        this.each(function(){
            var _this = $(this);
            _this.html('<div class="content">'+_this.html()+'</div>');
            var target = _this.children('.content');

            if(config.limit){
                var num = target.text().length;
                var words_left_num = config.limit - num;
                if(config.counter_place=="bottom"){
                    _this.append('<div class="words-left">'+words_left_num+'</div>');
                }else{
                    _this.prepend('<div class="words-left">'+words_left_num+'</div>');
                }
                
                var words_left = _this.children(".words-left");
                words_left.css({
                    "float": "right",
                    "background-color":"#ccc",
                    "color":"white",
                    "padding":"2px 6px 1px 5px",
                    "margin": "0 6px 0 0",
                    "display": "none",
                    "font-size": "16px"
                });
                target.css("clear", "both");
            }

            target.css({
                "outline": "none",
                "width": "100%",
                "padding": _this.css("padding"),
                "box-sizing": _this.css("box-sizing")
            });

            _this.css({
                "padding": "0"
            });



            target.click(function(){
                $(this).attr("contenteditable", true);
                $(this).focus();
            });

            target.mouseover(function(){
                show_out($(this));
            });

            target.mouseout(function(){
                if(!$(this).attr("contenteditable")){
                    hide_out($(this));
                }
            });
            
            target.blur(function(){
                $(this).removeAttr("contenteditable");
                hide_out($(this));
            });
            
            
            if(config.limit){
                target.keyup(function(e){
                    var words_left = config.limit - $(this).text().length;
                    if(words_left>=0){
                        $(this).siblings(".words-left").html(words_left);
                    }else{
                        $(this).siblings(".words-left").html("超过"+(-words_left));
                    }
                    
                });

            }
            
        });
        
        return this;
    };
    
})(jQuery);
