root = exports ? this
class root.Postcard
  constructor: (@domId, @layout_json, @s=1/2, @orientation=0) ->
    @zoomStep = 1.1
    #
    #@layout = JSON.parse(@layout_json)
    @layout = eval('('+this.layout_json+')')
    #
    @imageList = new Array()

    #
    root.s = @
    @timeoutIds = new Array()

    @_initCard()
    @_initImages()
    @_initBackground()
#    @_initFloatImages()
    @_initMasks()
    @_initMaterials()
    @_initCovers()

    # @_initTexts()

  toJson: ->
    jsonObject = new Object()
    if @orientation==1
      jsonObject['background'] = 'http://pic.52mxp.com/backgrounds/white_1500x1000.png'
    else
      jsonObject['background'] = 'http://pic.52mxp.com/backgrounds/white_1000x1500.png'
    jsonObject['images'] = []
    @_eachAreas (i, left, top, width, height)=>
      img = $('#img'+i)
      image = @imageList[i]

      position = img.position()

      if position.left >= 0
        _x = left+position.left
      else
        _x = left

      if position.top >= 0
        _y = top+position.top
      else
        _y = top

      if position.left >= 0 and position.top >= 0
        crop = null
      else if position.left >= 0 and position.top < 0
        crop = 'x'+height/image.scale+'p0p'+(-position.top/image.scale)
      else if position.left < 0 and position.top >= 0
        crop = width/image.scale+'x'+'p'+(-position.left/image.scale)+'p0'
      else
        crop = width/image.scale+'x'+height/image.scale+'p'+(-position.left/image.scale)+'p'+(-position.top/image.scale)

      if (src = img.attr('src')) != '/img/img0.png'
        image_json = {
          'x':_x/@s,
          'y':_y/@s,
          'src':src,
          'scale':(image.scale*100)/@s+'%'
        }
        if crop!=null
          image_json['crop'] = crop
        jsonObject['images'].push(image_json)


    jsonObject['images'].push({
      'x':0,
      'y':0,
      'src':@layout.background
    })

    @_eachMaterials (i, src, left, top, width, height)=>
      material = $('#material'+i)
      jsonObject['images'].push({
        'x':material.position().left/@s,
        'y':material.position().top/@s,
        'src':src
      })

    JSON.stringify(jsonObject,null,4)

  _initCard: ->
    @card = $('#'+@domId)
    width = 1000
    height = 1500
    if @orientation==1
      width = 1500
      height = 1000
    @card.css({
      'width': width*@s+'px',
      'height': height*@s+'px',
      'position':'relative',
      'overflow':'hidden',
      'background': 'url(/img/bg.png)'
#              ,
#      'box-shadow': '3px 3px 10px 0 #aaa'
    })

  _initImages: ->
    @_eachAreas (i, left, top, width, height)=>
      @card.append('<div id="restrict'+i+'"><img id="img'+i+'" src="/img/img0.png" /></div>')
      img = $('#img'+i)
      img.css('position', 'absolute')
      $('#restrict'+i).css({
        'position':'absolute',
        'width':width+'px',
        'height':height+'px',
        'left':left+'px',
        'top':top+'px',
#        'background-color':'rgba(111,111,111,0)',
        'overflow':'hidden'
      })
      #, 'width':img.width(), 'height':img.height()
      @imageList[i] = {'id':'img'+i, 'i':i, 'scale':1, 'current':(i==0 ? true : false)}
      return
    return

  # _initTexts: ->
  #   @_eachTextAreas (i, left, top, width, height)=>
  #     @card.append('<div id="text'+i+'">文字定义和用法 font-size 属性可设置字体的尺寸。 说明 该属性设置元素的字体大小。注意，实际上它设置的是字体中字符框的高度；实际的字符字形可能比这些框高或矮。</div>')
  #     $('#text'+i).css({
  #       'position':'absolute',
  #       'width':width+'px',
  #       'height':height+'px',
  #       'left':left+'px',
  #       'top':top+'px',
  #       'background-color':'rgba(111,111,111,1)',
  #       'overflow':'hidden',
  #       'font-family':'STKaiti',
  #       'font-size': 37*@s+'px'
  #     })

  _initBackground: ->
    @card.append('<img id="background" src="'+@layout.background+'"/>');
    width = 1000
    height = 1500
    if @orientation==1
      width = 1500
      height = 1000
    $('#background').css({
      'position':'absolute',
      'width':width*@s+'px',
      'height':height*@s+'px',
      'left':'0',
      'top':'0'
    })

  _initFloatImages: ->
    @_eachAreas (i, left, top, width, height)=>
      img = $('#img'+i)
      @card.append('<img id="floatimg'+i+'" src="/img/img'+i+'.png" />')
      floatimg = $('#floatimg'+i)
      floatimg.css({
        'opacity': 0,
        'position':'absolute'
      })

  _initMasks: ->
    @_eachAreas (i, left, top, width, height)=>
      @card.append('<div id="mask'+i+'"></div>')
      mask = $('#mask'+i)
      mask.css({
        'position':'absolute',
        'width':width+'px',
        'height':height+'px',
        'left':left+'px',
        'top':top+'px',
        'background':'url(/img/img0.png)'
#        'background-color':'rgba(111,111,111,0)'
      })
      @_addMoveSupport(i, left, top)
      #
      @_addZoomButtons(i, left, top, width, height)
      mask.on 'mouseover', (e)=>
        @_showZoomButtons(i)
        mask.css({cursor:'move'})
      mask.on 'mouseout', (e)=>
        @_hideZoomButtons(i)
        mask.css({cursor:'default'})
      mask.on 'scroll', (e)=>
        alert('hello')

  _addZoomButtons: (i, left, top, width, height)->
    @card.append('<img id="zoomin'+i+'" src="/img/zoomin.png"/>')
    @card.append('<img id="zoomout'+i+'" src="/img/zoomout.png"/>')
    zoomin = $('#zoomin'+i)
    zoomout = $('#zoomout'+i)
    if left < 0
      l = 5
    else
      l = left + 5
    if top < 0
      t = 5
    else
      t = top + 5

    zoomin.css({
      'position':'absolute',
      'left':(l+5)+'px',
      'top':(t+5)+'px',
      'width':'32px',
      'height':'32px',
      'visibility':'hidden'
    })
    zoomout.css({
      'position':'absolute',
      'left':(l+5+40)+'px',
      'top':(t+5)+'px',
      'width':'32px',
      'height':'32px',
      'visibility':'hidden'
    })
    zoomin.click (e)=>
      @zoom_in(i, left, top, width, height)
    zoomout.click (e)=>
      @zoom_out(i, left, top, width, height)
    zoomin.on 'mouseover', (e)=>
      @_showZoomButtons(i)
    zoomout.on 'mouseover', (e)=>
      @_showZoomButtons(i)
    zoomin.on 'mouseout', (e)=>
      @_hideZoomButtons(i)
    zoomout.on 'mouseout', (e)=>
      @_hideZoomButtons(i)

  _initMaterials: ->
    @_eachMaterials (i, src, left, top, width, height)=>
      @card.append('<img id="material'+i+'" src="'+src+'" />')
      material = $('#material'+i)
      material.css({
        'position':'absolute',
        'width':width+'px',
        'height':height+'px',
        'left':left+'px',
        'top':top+'px'
      })
      @_addMoveSupportToMaterial(i)

  _initCovers: ->
    @_eachAreas (i, left, top, width, height)=>
      @card.append('<div id="cover'+i+'"><img id="cover_img'+i+'" src="/img/addphoto.png" /></div>')
      cover = $('#cover'+i)
      cover.css({
      'position':'absolute',
      'width':width+'px',
      'height':height+'px',
      'left':left+'px',
      'top':top+'px'
#                ,
#      'background-color':'rgba(111,111,111,0)'
      })
      coverImg = $('#cover_img'+i)
      coverImg.css('padding-left', (width/2-21)+'px')
      coverImg.css('padding-top', (height/2-21)+'px')


  _eachAreas: (cb)->
    for i in [0 ... @layout.areas.length]
      area = @layout.areas[i]
      left = (area.x - area.w/2)*@s
      top = (area.y - area.h/2)*@s
      width = area.w*@s
      height = area.h*@s
      cb(i, left, top, width, height)
    return

  # _eachTextAreas: (cb)->
  #   for i in [0 ... @layout.text_areas.length]
  #     text_area = @layout.text_areas[i]
  #     left = (text_area.x - text_area.w/2)*@s
  #     top = (text_area.y - text_area.h/2)*@s
  #     width = text_area.w*@s
  #     height = text_area.h*@s
  #     cb(i, left, top, width, height)
  #   return

  _eachMaterials: (cb)->
    for i in [0 ... @layout.materials.length]
      material = @layout.materials[i]
      if material['type'] == '2'
        src = material['src']
        left = (material.x - material.w/2)*@s
        top = (material.y - material.h/2)*@s
        width = material.w*@s
        height = material.h*@s
        cb(i, src, left, top, width, height)
    return

  _addMoveSupport: (i, left, top)->
    img = $("#img"+i)
#    floatImg = $("#floatimg"+i)
    mask = $("#mask"+i)
    zoomin = $('#zoomin'+i)
    zoomout = $('#zoomout'+i)
    mask.bind 'movestart', (e)=>
      img.ox = img.position().left
      img.oy = img.position().top
      @_showZoomButtons(i)
      @_setCurrentImage(i)
      #
      #img.css('opacity', 0.6)
#      @card.css({'overflow':'visible'})
#      floatImg.css('opacity', 0.4)
#      floatImg.css('left', (img.position().left+left) + 'px')
#      floatImg.css('top', (img.position().top+top) + 'px')
#      floatImg.css('width', img.width() + 'px')
#      floatImg.css('height', img.height() + 'px')
      #
#      @_addMaskBorder(i)
      e.stopPropagation()
    mask.bind 'move', (e)=>
      img.css('left', (img.ox + e.distX) + 'px')
      img.css('top', (img.oy + e.distY) + 'px')
      #
#      floatImg.css('left', (img.position().left+left) + 'px')
#      floatImg.css('top', (img.position().top+top) + 'px')
      #
      e.stopPropagation()
    mask.bind 'moveend', (e)=>
      @_kickback(img, img.width(), img.height(), mask.width(), mask.height())
      #
#      @_kickback(floatImg, img.width(), img.height(), mask.width(), mask.height())
#      floatImg.css('opacity', 0)
#      @card.css({'overflow':'hidden'})
      #img.css('opacity', 1)
      #
      e.stopPropagation()

#     mask.bind 'click', (e)=>
#       @_setCurrentImage(i)
# #      @_addMaskBorder(i)
#       e.stopPropagation()

  _showZoomButtons: (i)->
    zoomin = $('#zoomin'+i)
    zoomout = $('#zoomout'+i)
    if zoomin.css('visibility') == 'hidden'
      zoomin.css({'visibility':'visible'})
    if zoomout.css('visibility') == 'hidden'
      zoomout.css({'visibility':'visible'})

  _hideZoomButtons: (i)->
    zoomin = $('#zoomin'+i)
    zoomout = $('#zoomout'+i)
    if zoomin.css('visibility') == 'visible'
      zoomin.css({'visibility':'hidden'})
    if zoomout.css('visibility') == 'visible'
      zoomout.css({'visibility':'hidden'})

  _addMoveSupportToMaterial: (i)->
    img = $("#material"+i)
    img.bind 'movestart', (e)=>
      img.ox = img.position().left
      img.oy = img.position().top
      e.stopPropagation()
    img.bind 'move', (e)=>
      img.css('left', (img.ox + e.distX) + 'px')
      img.css('top', (img.oy + e.distY) + 'px')
      e.stopPropagation()
    img.bind 'moveend', (e)=>
      e.stopPropagation()

    img.bind 'mouseover', (e)=>
      position = img.position()
      width = img.width()
      height = img.height()
      newWidth = width*1.1
      newHeight = height*1.1
      img.css({
        width: newWidth+'px',
        height: newHeight+'px',
        left: position.left-(newWidth-width)/2+'px',
        top: position.top-(newHeight-height)/2+'px',
        cursor:'move'
      })

    img.bind 'mouseout', (e)=>
      position = img.position()
      width = img.width()
      height = img.height()
      newWidth = width/1.1
      newHeight = height/1.1
      img.css({
        width: newWidth+'px',
        height: newHeight+'px',
        left: position.left+(width-newWidth)/2+'px',
        top: position.top+(height-newHeight)/2+'px',
        cursor:'default'
      })

  _addMaskBorder: (index)->
    @_eachAreas (i, left, top, width, height)=>
      mask = $("#mask"+i)
      mask.css({
        'border':'0px dashed #ffff99'
      })

    $("#mask"+index).css({
      'border':'1px dashed #ffff99'
    })

  _kickback: (img, width, height, img_window_width, img_window_height) ->
    if width > img_window_width
      if img.position().left>0
        img.css('left', '0px')
      dx = width-img_window_width
      if img.position().left < -dx
        img.css('left', -dx+'px')
    else
      if img.position().left<0
        img.css('left', '0px')
      dx = img_window_width-width
      if img.position().left > dx
        img.css('left', dx+'px')

    if height > img_window_height
      if img.position().top>0
        img.css('top', '0px')
      dy = height-img_window_height
      if img.position().top < -dy
        img.css('top', -dy+'px')
    else
      if img.position().top<0
        img.css('top', '0px')
      dy = img_window_height-height
      if img.position().top > dy
        img.css('top', dy+'px')

  _setCurrentImage: (i)->
    for j in [0 ... @imageList.length]
      @imageList[j]['current'] = false
    @imageList[i]['current'] = true


  _getCurrentImage: ->
    for j in [0 ... @imageList.length]
      if @imageList[j]['current'] == true
        return @imageList[j]


  zoomin: ->
    image = @_getCurrentImage()
    image['scale'] = image['scale'] * @zoomStep
    img = $('#'+image['id'])
    img.css({'width':img.width()*@zoomStep, 'height':img.height()*@zoomStep})

  zoomout: ->
    image = @_getCurrentImage()
    if image['scale']>1
      image['scale'] = image['scale'] / @zoomStep
      img = $('#'+image['id'])
      img.css({'width':img.width()/@zoomStep, 'height':img.height()/@zoomStep})

  _zoom: (img, width, height, imageLeft, imageTop, imageWidth, imageHeight, scale)->
    newImageWidth = imageWidth * scale
    newImageHeight = imageHeight * scale
    #
    ratioX = (-imageLeft+width/2)/imageWidth
    ratioY = (-imageTop+height/2)/imageHeight
    changeX = Math.abs(newImageWidth-imageWidth) * ratioX
    changeY = Math.abs(newImageHeight-imageHeight) * ratioY

    #
    if scale > 1
      prefix = -1
    else
      prefix = 1
    newImageLeft = imageLeft + prefix * changeX
    newImageTop = imageTop + prefix * changeY

    #return {'width':newImageWidth, 'height':newImageHeight, 'left':newImageLeft, 'top':newImageTop}
    img.css({
      'width':newImageWidth+'px',
      'height':newImageHeight+'px',
      'left':newImageLeft+'px',
      'top':newImageTop+'px'
    })

  zoom_in: (i, left, top, width, height)->
    image = @imageList[i]
    image['scale'] = image['scale'] * @zoomStep
    img = $('#'+image['id'])
    position = img.position()
    @_zoom(img, width, height, position.left, position.top, img.width(), img.height(), @zoomStep)

  zoom_out: (i, left, top, width, height)->
    image = @imageList[i]
#    if image['scale']>1
    image['scale'] = image['scale'] / @zoomStep
    img = $('#'+image['id'])
    position = img.position()
    @_zoom(img, width, height, position.left, position.top, img.width(), img.height(), 1/@zoomStep)

    mask = $("#mask"+i)
    @_kickback(img, img.width(), img.height(), mask.width(), mask.height())

  addImage: (i, url)->
    img = $("#img"+i)
    img.attr('src', url)
#    floatImg = $("#floatimg"+i)
#    floatImg.attr('src', url)
    cover = $('#cover'+i)
    cover.remove()


  onAreaClick: (cb)->
    for i in [0 ... @imageList.length]
      cover = $('#cover'+i)
      cover.click (e)->
        cb(parseInt(e.currentTarget.id.substr(5, 6)), e)