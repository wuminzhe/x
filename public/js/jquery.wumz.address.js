(function($){
    $.fn.address = function(config){

        this.each(function(){
            var _this = $(this);
            _this.append(
                '<div class="address-selector">'+
                '    <select id="receiver_province"></select>'+
                '    <div class="label">省</div>'+
                '    <select id="receiver_city"></select>'+
                '    <div class="label">市</div>'+
                '    <select id="receiver_county"></select>'+
                '    <div class="label last">区</div>'+
                '</div>'+
                
                '<div class="text" style="margin-top:6px;display:none">'+
                '    <input type="text" placeholder="邮政编码" id="receiver_postcode">'+
                '</div>'+

                '<div class="text" style="margin-top:6px;margin-bottom:8px">'+
                '    <input type="text" placeholder="地址" id="receiver_address_detail">'+
                '</div>'+

                '<input id="confirm_receiver_address_select" type="button" value="确定" class="btn" style="width:120px">'+
                '<input id="cancel_receiver_address_select" type="button" value="取消" class="btn pink" style="width:80px">'
            );

            var _address_selector = _this.children(".address-selector");
            var _text = _this.children(".text");
            var _btn = _this.children(".btn");
            var _pink = _this.children(".pink");

            _address_selector.css({
                "background": "white",
                "overflow": "hidden",
                "border": "3px solid #ddd"
            });

            _address_selector.children("select").css({
                "background": "transparent",
                "padding-left": "10px",
                "height": "40px",
                "line-height": "40px",
                "-webkit-appearance": "none",
                "outline": "none",
                "border": "0",
                "float": "left",
                "width": "27%"
            });

            _address_selector.children(".label").css({
                "text-align": "left",
                "width": "20px",
                "height": "30px",
                "line-height": "30px",
                "border-right": "1px solid #ccc",
                "float": "left",
                "margin": "5px 0",
                "color": "#aaa"
            });

            _address_selector.children(".last").css({
                "border-right": "0px",
                "float": "right"
            });

            _text.css({
                "border": "3px solid #ddd",
                "padding": "0 10px",
                "background-color": "white"
            });

            _text.children("input").css({
                "outline": "none",
                "box-sizing": "content-box",
                "background": "transparent",
                "border": "0",
                "padding": "0",
                "height": "40px",
                "width": "100%"
            });

            _btn.css({
                "color": "white",
                "height": "40px",
                "padding": "0 10px 0 10px",
                "border": "0px solid #509be2",
                "background-color": "#61b6f7"
            });

            _pink.css({
                "border": "0px solid #e25550",
                "background-color": "#f76561"
            });

            zipcode('receiver_province', 'receiver_city', 'receiver_county', 'receiver_postcode');

            _this.find('.text').focusin(function(e){
                $(this).css('border', '3px solid #5E844F');
            });

            _this.find('.text').focusout(function(e){
                $(this).css('border', '3px solid #ddd');
            });

            _this.find('.address-selector').focusin(function(e){
                $(this).css('border', '3px solid #5E844F');
            });

            _this.find('.address-selector').focusout(function(e){
                $(this).css('border', '3px solid #ddd');
            });

            _this.children('.btn').mousedown(function(){
                $(this).css('background-color', '#95ccff');
            });

            _this.children('.btn').mouseup(function(){
                $(this).css('background-color', '#61b6f7');
            });

            _this.children('.pink').mousedown(function(){
                $(this).css('background-color', '#ff7975');
            });

            _this.children('.pink').mouseup(function(){
                $(this).css('background-color', '#f76561');
            });

            _this.children('#cancel_receiver_address_select').click(function(){
                _this.slideUp();
                config.cancel();
            });

            _this.children('#confirm_receiver_address_select').click(function(){
                var receiver_province = $('#receiver_province').val();
                var receiver_city = $('#receiver_city').val();
                var receiver_county = $('#receiver_county').val();
                receiver_county = receiver_county==null ? '' : receiver_county;
                var receiver_address_detail = $('#receiver_address_detail').val();
                _this.slideUp(); 
                config.ok(receiver_province+receiver_city+receiver_county+receiver_address_detail, $('#receiver_postcode').val());
                
            });
        });
    };
    
})(jQuery);