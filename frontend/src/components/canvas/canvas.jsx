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
        radius: 100

      };
      this.getCursorPosition = this.getCursorPosition.bind(this);
  }
  componentDidMount() {
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext("2d")
        
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
            this.setState({
              rocks: Object.assign({}, this.state.rocks, {[this.state.rockCount]: {x: canvasx, y: canvasy}}),
              rockCount: this.state.rockCount + 1
            })
            break;
        case 'food':
            this.setState({
              foods: Object.assign({}, this.state.foods, {[this.state.foodCount]: {x: canvasx, y: canvasy}}),
              foodCount: this.state.foodCount + 1
            })
            break;
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