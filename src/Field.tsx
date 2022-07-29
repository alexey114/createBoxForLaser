import React, { useState, useEffect } from 'react'
import './Field.css'
import './Button.css'

interface ICoordinate {
  x: number,
  y: number
}

function Field() {

  let [windowSize, setWindowSize] = useState<number[]>([500, 500])           //Отслеживание размера окна браузера

  // let [recalculateButton, setRecalculateButton] = useState<boolean>(false)

  let [widthBox, setWidthBox] = useState<number>(0)                          //ширина коробки
  let [heightBox, setHeightBox] = useState<number>(0)                        //высота коробки
  let [depthBox, setDepthBox] = useState<number>(0)                          //глубина коробки
  let [wallThickness, setWallThickness] = useState<number>(0);               //ширина материала

  let [widthTooth, setWidthTooth] = useState<number>(0);                       //ширина зубца

  const padding = 20;                                                        //отступ от края поля

  let [coordinateFrontWall, setCoordinateFrontWall] = useState<ICoordinate[]>([])  //массив с координатами фронтальной стенки
  let [coordinateBackWall, setCoordinateBackWall] = useState<ICoordinate[]>([])    //массив с координатами задней стенки
  let [coordinateLeftWall, setCoordinateLeftWall] = useState<ICoordinate[]>([])    //массив с координатами левой стенки
  let [coordinateRightWall, setCoordinateRightWall] = useState<ICoordinate[]>([])  //массив с координатами правой стенки
  let [coordinateBottomWall, setCoordinateBottomWall] = useState<ICoordinate[]>([])//массив с координатами нижней стенки
  let [coordinateUpWall, setCoordinateUpWall] = useState<ICoordinate[]>([])        //массив с координатами верхней стенки

  let [coordinateToothWall, setCoordinateToothWall] = useState<ICoordinate[]>([])  //массив с координатами стенки с зубцами

  let frontWall: string = ""                                      //фронтальная стенка
  let backWall: string = ""                                       //задняя стенка
  let leftWall: string = ""                                       //левая стенка
  let rightWall: string = ""                                      //правая стенка
  let bottomWall: string = ""                                     //нижняя стенка
  let upWall: string = ""                                         //крышка

  let toothWall: string = ""                                      //c зубцами

  let numberTeethHeight = ((heightBox - wallThickness * 2) / widthTooth) * 2
  let numberTeethDepth = ((depthBox - wallThickness * 2) / widthTooth) * 2
  let numberTeethWidth = ((widthBox - wallThickness * 2) / widthTooth) * 2

  //ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ РАЗМЕРА ОКНА БРАУЗЕРА ДЛЯ ПОСЛЕДУЮЩЕЙ АДАПТАЦИИ SVG ПОЛЯ ПОД НЕГО

  useEffect(() => {
    function changeWindow() {
      setWindowSize([window.innerWidth - 50, window.innerHeight - 200])
      console.log("window", window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", changeWindow);
    changeWindow()
    return () => window.removeEventListener("resize", changeWindow);

  }, [])

  // Получение данных из input (высота, ширина и глубина)

  function defineWidth(event: any) {
    let width = event.target.value
    setWidthBox(width)
    clearingArray()
  }
  function defineHeight(event: any) {
    let height = event.target.value
    setHeightBox(height)
    clearingArray()
  }
  function defineDepth(event: any) {
    let depth = event.target.value
    setDepthBox(depth)
    clearingArray()
  }
  function defineThickness(event: any) {
    let thickness = event.target.value
    setWallThickness(thickness)
    clearingArray()
  }
  function defineTooth(event: any) {
    let tooth = event.target.value
    setWidthTooth(tooth)
    clearingArray()
  }

  //ЗАПИСЬ КООРДИНАТ В МАССИВЫ по каждой стороне

  //Лицевая стенка с учетом зубьев

  function setFrontCoordinateWall() {
    if (widthTooth === 0 || widthTooth === null) {
      let size = [...coordinateFrontWall]
      size.push({ x: padding, y: padding })
      size.push({ x: padding, y: +heightBox + padding - (wallThickness * 2) })
      size.push({ x: +widthBox + padding - (wallThickness * 2), y: +heightBox + padding - (wallThickness * 2) })
      size.push({ x: +widthBox + padding - (wallThickness * 2), y: padding })
      size.push({ x: padding, y: padding })
      setCoordinateFrontWall(size)
    } else {
      let sizeTopRight = []
      let sizeBottomLeft = []


      // Front-Left

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding, y: padding })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding, y: padding + +widthTooth })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding, y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding, y: padding + (widthTooth * Math.ceil(i / 2)) })
        }
      }

      // Front-Top

      for (let i = 0; i < numberTeethWidth - 1; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding, y: padding })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +widthTooth, y: padding })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +wallThickness })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +wallThickness })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding })
        }
      }

      // Front-Right

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 3), y: padding })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 3), y: padding + +widthTooth })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 3), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 2), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 2), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + +heightBox - (wallThickness * 3), y: padding + (widthTooth * Math.ceil(i / 2)) })
        }
      }

      // Front-Bottom

      for (let i = 0; i < numberTeethHeight - 1; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding, y: padding + +heightBox - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +widthTooth, y: padding + +heightBox - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 3) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 3) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 2) })
        }
      }

      let reversed = sizeBottomLeft.reverse()
      let size = [...coordinateToothWall, ...sizeTopRight, ...reversed]
      setCoordinateFrontWall(size)
    }
  }

  //Задняя сторона с учетом зубьев

  function setBackCoordinateWall() {
    if (widthTooth === 0 || widthTooth === null) {
      let size = [...coordinateBackWall]
      size.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding })
      size.push({ x: padding + +widthBox + (widthBox * 0.1), y: +heightBox + padding - (wallThickness * 2) })
      size.push({ x: padding + +widthBox - (wallThickness * 2) + (+widthBox * 1.1), y: +heightBox + padding - (wallThickness * 2) })
      size.push({ x: padding + +widthBox - (wallThickness * 2) + (+widthBox * 1.1), y: padding })
      size.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding })
      setCoordinateBackWall(size)
    } else {

      let sizeTopRight = []
      let sizeBottomLeft = []

      // Back-Left

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding + +widthTooth })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness + +widthBox + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness + +widthBox + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        }
      }

      // Back-Bottom

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +widthTooth + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 3) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 3) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) })
        }
      }

      // Back-Top

      for (let i = 0; i < numberTeethWidth - 1; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +widthBox + (widthBox * 0.1), y: padding })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +widthTooth + +widthBox + (widthBox * 0.1), y: padding })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +wallThickness })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding + +wallThickness })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +widthBox + (widthBox * 0.1), y: padding })
        }
      }

      // Back-Right

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 3) + (widthBox * 0.1), y: padding })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 3) + (widthBox * 0.1), y: padding + +widthTooth })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 3) + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 2) + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 2) + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + +widthBox * 2 - (wallThickness * 3) + (widthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) })
        }
      }

      let reversed = sizeBottomLeft.reverse()
      let size = [...coordinateToothWall, ...sizeTopRight, ...reversed] // 
      setCoordinateBackWall(size)
    }
  }

  //Левая сторона с учётом зубьев

  function setLeftCoordinateWall() {

    if (widthTooth === 0 || widthTooth === null) {

      let size = [...coordinateLeftWall]
      size.push({ x: padding, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      size.push({ x: padding, y: padding + (heightBox * 2) + (heightBox * 0.1) - (wallThickness * 4) })
      size.push({ x: padding + +depthBox, y: padding + (heightBox * 2) + (heightBox * 0.1) - (wallThickness * 4) })
      size.push({ x: padding + +depthBox, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      size.push({ x: padding, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      setCoordinateLeftWall(size)

    } else {

      let sizeTopRight = []
      let sizeBottomLeft = []

      // Left-Left

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding, y: padding + +widthTooth + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Left-Top

      for (let i = 0; i < numberTeethDepth; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +widthTooth, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +wallThickness + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +wallThickness + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Left-Right

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +depthBox, y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +depthBox, y: padding + +widthTooth + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + +depthBox, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + +depthBox - +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + +depthBox - +wallThickness, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + +depthBox, y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Left-Bottom

      for (let i = 0; i < numberTeethDepth; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding, y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +widthTooth, y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 3) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 3) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      let reversed = sizeBottomLeft.reverse()
      let size = [...coordinateToothWall, ...sizeTopRight, ...reversed]
      setCoordinateLeftWall(size)
    }
  }

  //Правая сторона с учётом зубьев

  function setRightCoordinateWall() {

    if (widthTooth === 0 || widthTooth === null) {

      let size = [...coordinateRightWall]
      size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (heightBox * 2) + (heightBox * 0.1) - (wallThickness * 4) })
      size.push({ x: padding + +depthBox + (depthBox * 1.1), y: padding + (heightBox * 2) + (heightBox * 0.1) - (wallThickness * 4) })
      size.push({ x: padding + +depthBox + (depthBox * 1.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
      setCoordinateRightWall(size)

    } else {

      let sizeTopRight = []
      let sizeBottomLeft = []

      // Right-Left

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +widthTooth + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + +wallThickness + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Right-Top

      for (let i = 0; i < numberTeethDepth; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +widthTooth + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +wallThickness + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +wallThickness + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Right-Right

      for (let i = 0; i < numberTeethHeight; i++) {
        if (i === 0) {
          sizeTopRight.push({ x: padding + +depthBox + +depthBox + (depthBox * 0.1), y: padding + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeTopRight.push({ x: padding + +depthBox + +depthBox + (depthBox * 0.1), y: padding + +widthTooth + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeTopRight.push({ x: padding + +depthBox + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeTopRight.push({ x: padding + +depthBox - +wallThickness + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeTopRight.push({ x: padding + +depthBox - +wallThickness + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeTopRight.push({ x: padding + +depthBox + +depthBox + (depthBox * 0.1), y: padding + (widthTooth * Math.ceil(i / 2)) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      // Right-Bottom

      for (let i = 0; i < numberTeethDepth; i++) {
        if (i === 0) {
          sizeBottomLeft.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i === 1) {
          sizeBottomLeft.push({ x: padding + +widthTooth + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 1) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 === 0 && i % 4 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 3) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 2 !== 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 3) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        } else if (i % 4 === 0) {
          sizeBottomLeft.push({ x: padding + (widthTooth * Math.ceil(i / 2)) + +depthBox + (depthBox * 0.1), y: padding + +heightBox - (wallThickness * 2) + +heightBox + (heightBox * 0.1) - (wallThickness * 2) })
        }
      }

      let reversed = sizeBottomLeft.reverse()
      let size = [...coordinateToothWall, ...sizeTopRight, ...reversed]
      setCoordinateRightWall(size)
    }
  }

  //Нижняя стенка

  function setBottomCoordinateWall() {
    let size = [...coordinateBottomWall]
    size.push({ x: padding, y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    size.push({ x: padding, y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) + +widthBox - (wallThickness * 4) })
    size.push({ x: padding + +depthBox, y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) + +widthBox - (wallThickness * 4) })
    size.push({ x: padding + +depthBox, y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    size.push({ x: padding, y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    setCoordinateBottomWall(size)
  }

  //Верхняя стенка

  function setUpCoordinateWall() {
    let size = [...coordinateUpWall]
    size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) + +widthBox - (wallThickness * 4) })
    size.push({ x: padding + +depthBox + (depthBox * 1.1), y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) + +widthBox - (wallThickness * 4) })
    size.push({ x: padding + +depthBox + (depthBox * 1.1), y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    size.push({ x: padding + +depthBox + (depthBox * 0.1), y: padding + (widthBox * 2) + (widthBox * 0.1 * 2) - (wallThickness * 4) })
    setCoordinateUpWall(size)
  }

  // function setToothCoordinateWall() {

  // }

  //Очищение массива от координат при вводе новых данных

  function clearingArray() {
    setCoordinateFrontWall([])
    setCoordinateBackWall([])
    setCoordinateLeftWall([])
    setCoordinateRightWall([])
    setCoordinateBottomWall([])
    setCoordinateUpWall([])
    setCoordinateToothWall([])
  }

  //ПОСТРОЕНИЕ СТЕНОК ИЗ ШИРИНЫ, ВЫСОТЫ и ГЛУБИНЫ

  function createArrayCoordinate(event: any) {


    if (widthBox === undefined || widthBox === 0) {
      alert("Заполните ширину")
    } else if (heightBox === undefined || heightBox === 0) {
      alert("Заполните высоту")
    } else if (depthBox === undefined || depthBox === 0) {
      alert("Заполните глубину")
    } else {
      setFrontCoordinateWall()
      setBackCoordinateWall()
      setLeftCoordinateWall()
      setRightCoordinateWall()
      setBottomCoordinateWall()
      setUpCoordinateWall()
      // setToothCoordinateWall()
    }
  }

  // Составление линий path
  function createLinePath(element: ICoordinate, index: number) {
    let pointM = "M"
    let pointL = "L"
    return (((index === 0) ? pointM : pointL) + (element.x + " " + element.y))
  }

  let paintLinePath = () => {
    frontWall += coordinateFrontWall.map(createLinePath).join(" ") + "Z"
    backWall += coordinateBackWall.map(createLinePath).join(" ") + "Z"
    leftWall += coordinateLeftWall.map(createLinePath).join(" ") + "Z"
    rightWall += coordinateRightWall.map(createLinePath).join(" ") + "Z"
    bottomWall += coordinateBottomWall.map(createLinePath).join(" ") + "Z"
    upWall += coordinateUpWall.map(createLinePath).join(" ") + "Z"
    toothWall += coordinateToothWall.map(createLinePath).join(" ")
  }

  paintLinePath()

  return (

    <div className='fieldsContainer' style={{ width: windowSize[0], height: windowSize[1] }}>
      <div className='fieldsSVG'>
        <svg width={widthBox * 3.2} height={heightBox * 3.2} xmlns="http://www.w3.org/2000/svg">
          <path d={frontWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
          <path d={backWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
          <path d={leftWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
          <path d={rightWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
          <path d={bottomWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
          <path d={upWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />

          <path d={toothWall} stroke="#FF0000" fill="none" stroke-width="0.3" vector-effect="non-scaling-stroke" />
        </svg>
      </div>

      <div className='buttonBox'>

        <div style={{ margin: 10 }}>
          <label htmlFor="width" style={{ padding: 15 }}>width (mm)</label>
          <input type="number" id="width" onChange={defineWidth} />
        </div>
        <div style={{ margin: 10 }}>
          <label htmlFor="height" style={{ padding: 15 }}>height (mm)</label>
          <input type="number" id="height" onChange={defineHeight} />
        </div>
        <div style={{ margin: 10 }}>
          <label htmlFor="depth" style={{ padding: 15 }}>depth (mm)</label>
          <input type="number" id="depth" onChange={defineDepth} />
        </div>
        <div style={{ margin: 10 }}>
          <label htmlFor="thickness" style={{ padding: 15 }}>thickness (mm)</label>
          <input type="number" id="thickness" onChange={defineThickness} />
        </div>
        <div style={{ margin: 10 }}>
          <label htmlFor="tooth" style={{ padding: 15 }}>tooth (mm)</label>
          <input type="number" id="tooth" onChange={defineTooth} />
        </div>

        <button className="recalculate" onClick={(event) => createArrayCoordinate(event)}> Пересчитать </button>
        <br />
      </div>
    </div>
  )
}

export default Field

//ЗАДАЧИ:
// 1.

//Варианты

//Пытался сделать формирование зубьев от центра

// let widthFront = widthBox - (wallThickness*2)
// let numberTooth = widthFront/widthTooth

// console.log(widthFront)

// for(let i=0; i<numberTooth+1;i++){
//   if(i===0){
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2, y:padding + +heightBox - (wallThickness * 3)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2, y:padding + +heightBox - (wallThickness * 3)})
//   } else if (i === 1) {
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2, y:padding + +heightBox - (wallThickness * 3)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2, y:padding + +heightBox - (wallThickness * 3)})
//     console.log({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2, y:padding + +heightBox - (wallThickness * 3)})
//   } else if (i === 2) {
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2, y:padding + +heightBox - (wallThickness * 2)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2, y:padding + +heightBox - (wallThickness * 2)})
//     console.log('i % 2 === 0 && i % 4 !== 0')
//   } else if (i % 4 === 1) {
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2 - widthTooth*Math.floor(i / 2), y:padding + +heightBox - (wallThickness * 3)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2 + widthTooth*Math.floor(i / 2), y:padding + +heightBox - (wallThickness * 3)})
//     console.log('i % 4 === 1')
//   } else if (i % 2 === 0 && i % 4 !== 0) {
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2 - widthTooth*Math.floor(i/3), y:padding + +heightBox - (wallThickness * 2)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2 + widthTooth*Math.floor(i/3), y:padding + +heightBox - (wallThickness * 2)})
//     console.log('i % 2 === 0 && i % 4 !== 0')
//   } else if (i % 2 !== 0) {
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2 - widthTooth*Math.floor(i / 2), y:padding + +heightBox - (wallThickness * 2)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2 + widthTooth*Math.floor(i / 2), y:padding + +heightBox - (wallThickness * 2)})
//     console.log('i % 2 !== 0')
//   } else if (i % 4 === 0){
//     bottomLeft.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 - widthTooth/2 - widthTooth*Math.floor(i / 2.2), y:padding + +heightBox - (wallThickness * 3)})
//     bottomRight.push({x:padding + +widthBox + widthBox*0.1 + widthFront/2 + widthTooth/2 + widthTooth*Math.floor(i / 2.2), y:padding + +heightBox - (wallThickness * 3)})
//     console.log('i % 4 === 0')
//   } 
// }