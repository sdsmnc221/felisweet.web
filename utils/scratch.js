import Brush from '../static/images/noel-brush.png'
import Marie from '../static/images/noel-marie-1.png'

function Scratch(canvas, bg, instruction, gsap) {
  var isDrawing, lastPoint
  var canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    ctx = canvas.getContext('2d'),
    image = new Image(),
    brush = new Image()

  ctx.imageSmoothingEnabled = false

  // base64 Workaround because Same-Origin-Policy
  image.src = Marie
  image.onload = function () {
    drawImageScaled(image)
    // Show the form when Image is loaded.
    bg.style.visibility = 'visible'
  }
  brush.src = Brush

  canvas.addEventListener('mousedown', handleMouseDown, false)
  canvas.addEventListener('touchstart', handleMouseDown, false)
  canvas.addEventListener('mousemove', handleMouseMove, false)
  canvas.addEventListener('touchmove', handleTouchMove, false)
  canvas.addEventListener('mouseup', handleMouseUp, false)
  canvas.addEventListener('touchend', handleMouseUp, false)

  function drawImageScaled(img) {
    var canvas = ctx.canvas
    var hRatio = canvas.width / img.width
    var vRatio = canvas.height / img.height
    var ratio = Math.min(hRatio, vRatio)
    var centerShift_x = (canvas.width - img.width * ratio) / 2
    var centerShift_y = (canvas.height - img.height * ratio) / 2
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    )
  }

  function distanceBetween(point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    )
  }

  function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y)
  }

  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) {
      stride = 1
    }

    var pixels = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
      pdata = pixels.data,
      l = pdata.length,
      total = l / stride,
      count = 0

    // Iterate over all pixels
    for (var i = (count = 0); i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++
      }
    }

    return Math.round((count / total) * 100)
  }

  function getMouse(e, canvas) {
    var offsetX = 0,
      offsetY = 0,
      mx,
      my

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft
        offsetY += canvas.offsetTop
      } while ((canvas = canvas.offsetParent))
    }

    mx = (e.pageX || e.touches[0].clientX) - offsetX
    my = (e.pageY || e.touches[0].clientY) - offsetY

    return { x: mx, y: my }
  }

  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0
    if (filledInPixels > 50) {
      gsap.to(canvas, { opacity: 0, duration: 1.6, ease: 'circ.in' })
      gsap.to(instruction, {
        opacity: 0,
        scale: 0,
        ease: 'circ.in',
        duration: 1.2,
      })
    }
  }

  function handleMouseDown(e) {
    isDrawing = true
    lastPoint = getMouse(e, canvas)
  }

  function handleMouseMove(e) {
    if (!isDrawing) {
      return
    }

    e.preventDefault()

    // var currentPoint = getMouse(e, canvas),
    //   dist = distanceBetween(lastPoint, currentPoint),
    //   angle = angleBetween(lastPoint, currentPoint),
    //   x,
    //   y

    // for (var i = 0; i < dist; i++) {
    //   x = lastPoint.x + Math.sin(angle) * i - 25
    //   y = lastPoint.y + Math.cos(angle) * i - 25
    //   ctx.globalCompositeOperation = 'destination-out'
    //   ctx.drawImage(brush, e.screenX, e.screenY)
    // }

    scratch()

    // ctx.globalCompositeOperation = 'destination-out'
    // ctx.drawImage(
    //   brush,
    //   e.clientX - canvasWidth / 2,
    //   e.clientY - canvasHeight / 2,
    //   brush.width * 4,
    //   brush.height * 4
    // )

    // // lastPoint = currentPoint
    // handlePercentage(getFilledInPixels(12))
  }

  function handleTouchMove(e) {
    if (!isDrawing) {
      return
    }

    e.preventDefault()

    scratch()

    // var currentPoint = getMouse(e, canvas),
    //   dist = distanceBetween(lastPoint, currentPoint),
    //   angle = angleBetween(lastPoint, currentPoint),
    //   x,
    //   y

    // for (var i = 0; i < dist; i++) {
    //   x = lastPoint.x + Math.sin(angle) * i - 25
    //   y = lastPoint.y + Math.cos(angle) * i - 25
    //   ctx.globalCompositeOperation = 'destination-out'
    //   ctx.drawImage(brush, e.screenX, e.screenY)
    // }

    // ctx.globalCompositeOperation = 'destination-out'
    // ctx.drawImage(
    //   brush,
    //   e.targetTouches[0].clientX - canvasWidth / 2,
    //   e.targetTouches[0].clientY - canvasHeight / 2,
    //   brush.width * 4,
    //   brush.height * 4
    // )

    // // lastPoint = currentPoint
    // handlePercentage(getFilledInPixels(12))
  }

  function scratch() {
    move()
  }

  function handleMouseUp(e) {
    isDrawing = false
  }

  6

  let coordX = 0 // Moving from the left side of the screen
  let coordY = 0 // Moving in the center

  function move() {
    // Move step = 20 pixels
    if (coordX < canvasWidth) {
      coordX += brush.width
    } else {
      coordX = 0
      coordY += brush.height
    }

    ctx.globalCompositeOperation = 'destination-out'
    ctx.drawImage(brush, coordX, coordY, brush.width * 4, brush.height * 4)

    // lastPoint = currentPoint
    handlePercentage(getFilledInPixels(72))
    // Create new mouse event
    // let ev = new MouseEvent("mousemove", {
    //     view: window,
    //     bubbles: true,
    //     cancelable: true,
    //     clientX: coordX,
    //     clientY: coordY
    // });

    // // Send event
    // document.querySelector('Put your element here!').dispatchEvent(ev);
    // If the current position of the fake "mouse" is less than the width of the screen - let's move
    if (coordX < canvasWidth && coordY < canvasHeight) {
      setTimeout(() => {
        move()
      }, 640)
    }
  }
}

export default Scratch
