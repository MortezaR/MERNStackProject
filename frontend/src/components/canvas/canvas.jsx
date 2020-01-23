import React from 'react';
import './canvas.scss';
import foodIcon from '../../assets/images/food_icon.png'
import rockIcon from '../../assets/images/rock_icon.png'
import houseIcon from '../../assets/images/house_icon.png'

const GAME_DIMENSIONX = 5000;
const GAME_DIMENSIONY = 5500;

class Canvas extends React.Component {
  constructor (props) {
      super(props)
      this.canvas = null;
      this.ctx = null;
      this.state = {
        positionX: 750,
        positionY: 350,
        canvas: this.refs.canvas,
        rockCount: 0,
        foodCount: 0,
        foods: {},
        rocks: {},
        houses: {},
        radius: 70

      };
      this.getCursorPosition = this.getCursorPosition.bind(this);
      this.intersectRect = this.intersectRect.bind(this);
  }
  componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d")
        
  }

  // isBetween = (target, start, end) => {
  //     return start <= target && end >= target ? true : false;
  // }
  // getDir = (sX,sY,eX,eY) => {
  //     let rX = eX - sX;
  //     let rY = eY - sY;
  //     let mag = Math.sqrt(rX*rX + rY*rY);
  //     return [rX/mag, rY/mag];
  // }
  // calcHitBox = (dir, hitBoxSize, sX, sY) =>{
  //     let [dirX, dirY] = dir;
  //     let [hbW, hbH] =  hitBoxSize;
  //     let p1 = [sX - dirY * (hbW / 2), sY + dirX * (hbW / 2)];
  //     let p4 = [sX + dirY * (hbW / 2), sY - dirX * (hbW / 2)];
  //     let p2 = [p1[0] + dirX * hbH, p1[1] + dirY * hbH ];
  //     let p3 = [p4[0] + dirX * hbH, p4[1] + dirY * hbH ];
  //     return [p1,p2,p3,p4];
  // }
  // findLine = (firstX, firstY, secondX, secondY) => {
  //   let a = secondY - firstY;
  //   let b = firstX - secondX;
  //   let c = a * (secondX) + b * (secondY);
  //   return { a: a, b: b, c: -c };
  // }
  // isInside = (tX, tY, coord) => {
  //     let [p1, p2, p3, p4] = coord;
  //     let l1 = this.findLine(p1[0], p1[1], p2[0], p2[1]);
  //     let l2 = this.findLine(p2[0], p2[1], p3[0], p3[1]);
  //     let l3 = this.findLine(p3[0], p3[1], p4[0], p4[1]);
  //     let l4 = this.findLine(p4[0], p4[1], p1[0], p1[1]);
  //     let l1LT = tY >= (-(l1.a * tX) - l1.c) / l1.b ? true : false;
  //     let l2LT = tY >= (-(l2.a * tX) - l2.c) / l2.b ? true : false;
  //     let l3LT = tY >= (-(l3.a * tX) - l3.c) / l3.b ? true : false;
  //     let l4LT = tY >= (-(l4.a * tX) - l4.c) / l4.b ? true : false;
  //     console.log(l1LT + l3LT, l2LT + l4LT)
  //     console.log(l1, l2, l3, l4)
  //     return l1LT + l3LT === 1 && l2LT + l4LT === 1 ? true : false;
  // }

  // hitBoxTouch = (coord1, coord2) => {
  //   let retVal = false;
  //   coord1.forEach(coord => {
  //       if(this.isInside(coord[0], coord[1]), coord2){
  //           retVal = true;
  //           return retVal;
  //       }
  //   })
  //   coord2.forEach(coord => {
  //       if(this.isInside(coord[0], coord[1]), coord1){
  //           retVal = true;
  //           return retVal;
  //       }
  //   })
  //   return retVal;
  // }

  intersectRect(clickX, clickY, r2) {
    return !(r2.x-150 > clickX+70 || 
             r2.x+150 < clickX-70 || 
             r2.y-130 > clickY+70 ||
             r2.y+130 < clickY-70);
  }

  getCursorPosition(event) {
      const rect = this.canvas.getBoundingClientRect()
      const canvasx = event.clientX - rect.left
      const canvasy = event.clientY - rect.top
      console.log("x: " + canvasx + " y: " + canvasy)
      switch(this.props.clickEffect) {
        case 'remove':
            Object.keys(this.state.rocks).forEach(rockKey => {
              if (Math.sqrt((canvasx-this.state.rocks[rockKey].x)*(canvasx-this.state.rocks[rockKey].x) + (canvasy-this.state.rocks[rockKey].y)*(canvasy-this.state.rocks[rockKey].y)) < this.state.radius) {
                this.setState({
                  rocks: Object.assign({}, this.state.rocks, {[rockKey]: {x: -10000000000000000000000000000, y: -1000000000000000000000000}})
                })
              }
            })
            Object.keys(this.state.foods).forEach(foodKey => {
              if (Math.sqrt((canvasx-this.state.foods[foodKey].x)*(canvasx-this.state.foods[foodKey].x) + (canvasy-this.state.foods[foodKey].y)*(canvasy-this.state.foods[foodKey].y)) < this.state.radius) {
                this.setState({
                  foods: Object.assign({}, this.state.foods, {[foodKey]: {x: -10000000000000000000000000000, y: -1000000000000000000000000}})
                })
              }
            })
            break;
        case 'obstacle':
          if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
              console.log('overlapped')
              this.props.handleOverlap();
              break;
          }
          else {
            this.setState({
              rocks: Object.assign({}, this.state.rocks, {[this.state.rockCount]: {x: canvasx, y: canvasy}}),
              rockCount: this.state.rockCount + 1
            })
            break;
          }
        case 'food':
          if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
            console.log('overlapped')
            this.props.handleOverlap();
            break;
          }
          else {
            this.setState({
              foods: Object.assign({}, this.state.foods, {[this.state.foodCount]: {x: canvasx, y: canvasy}}),
              foodCount: this.state.foodCount + 1
            })
            break;
          }
        case 'house':
          this.setState({
            houses: Object.assign({}, this.state.houses, {[0]: {x: canvasx, y: canvasy}}),
          })
          break;
        default:
          return null;
      }
  }

    render() {
      // debugger;

      if (this.ctx) {
        this.ctx.clearRect(0,0,GAME_DIMENSIONX, GAME_DIMENSIONY);

        Object.values(this.state.rocks).forEach(rock => {
          this.ctx.drawImage(this.refs.rockIcon, 0, 0, 135, 135, rock.x-60, rock.y-60, 135, 135);
        })

        Object.values(this.state.foods).forEach(food => {
          this.ctx.drawImage(this.refs.foodIcon, 0, 0, 135, 135, food.x-60, food.y-60, 135, 135);
        })
        Object.values(this.state.houses).forEach(house => {
          this.ctx.drawImage(this.refs.houseIcon, 0, 0, 300, 260, house.x-150, house.y-130, 300, 260);
        })
      }
        return(
          <div className="testsize">

            <canvas id="canvas" onKeyPress={this.handleKey} onClick={this.getCursorPosition} ref="canvas" className={this.props.clickEffect} width={5000} height={5500} />

            <img ref="foodIcon" alt ="" src={foodIcon} className="hidden" />
            <img ref="rockIcon" alt ="" src={rockIcon} className="hidden" />
            <img ref="houseIcon" alt ="" src={houseIcon} className="hidden" />
         </div> 
        )
      }
    }

export default Canvas