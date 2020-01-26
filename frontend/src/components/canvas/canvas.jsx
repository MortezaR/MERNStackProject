import React from 'react';
import './canvas.scss';
import foodIcon from '../../assets/images/food_icon.png'
import rockIcon from '../../assets/images/rock_icon.png'
import houseIcon from '../../assets/images/house_icon.png'
import worldMap from '../../assets/images/worldmap1.png';
import TopNavContainer from '../top_nav/top_nav_container.js';
import MapEditorMenu from '../map_editor_menu/map_editor_menu_container';
import Sound from 'react-sound';
import worldMusic from '../../assets/sound/gflop.mp3';
import axios from 'axios';


const GAME_DIMENSIONX = 5000;
const GAME_DIMENSIONY = 5000;

class Canvas extends React.Component {
  constructor (props) {
      super(props)
      this.canvas = this.refs.canvas;
      this.ctx = null;
      this.image = new Image();
      this.image.src = worldMap;
      this.state = {
        canvas: this.refs.canvas,
        rockCount: 0,
        foodCount: 0,
        foods: {},
        rocks: {},
        houses: {},
        radius: 70,
        imgLoaded: false,
        title: '',
        url: '',
        mapId: '',
        clickEffect: 'obstacle',
        hidden: 'hidden'

      };
      this.getCursorPosition = this.getCursorPosition.bind(this);
      this.intersectRect = this.intersectRect.bind(this);
      this.callbackTest = this.callbackTest.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleClickEffect = this.handleClickEffect.bind(this);
      this.handleOverlap = this.handleOverlap.bind(this);
  }
  componentDidMount() {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext("2d")
    this.ctx.drawImage(this.image, 0, 0);
    axios.get(`/api/maps/${this.props.mapId}`)
    .then(map => {
      console.log(map)
      this.setState({
        rockCount: map.data.objects.rockCount,
        foodCount: map.data.objects.foodCount,
        foods: map.data.objects.foods,
        rocks: map.data.objects.rocks,
        houses: map.data.objects.houses,
        title: map.data.title,
        url: map.data.url
      })
    })
  }

  handleOverlap() {
    this.setState({
      hidden: 'fadein'
    })
    setTimeout(()=>this.setState({
      hidden: 'fadeout'
    }), 2000)
  }

  handleClickEffect(clickEffect) {
    this.setState({
        clickEffect: clickEffect
    })
  }

  handleSave (title, url) {
    return e => {
      e.preventDefault();
      const map = {
        user: this.props.currentUser.id,
        title: title,
        url: url,
        objects: {
            rockCount: this.state.rockCount,
            foodCount: this.state.foodCount,
            foods: this.state.foods,
            rocks: this.state.rocks,
            houses: this.state.houses
        }
    }
    axios.post('/api/maps/', map)
    }
  }

  callbackTest () {
    this.setState({
      imgLoaded: true
    })
  }

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
      switch(this.state.clickEffect) {
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
              this.handleOverlap();
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
            this.handleOverlap();
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

      if (this.ctx) {
        this.ctx.clearRect(0,0,GAME_DIMENSIONX, GAME_DIMENSIONY);

        this.ctx.drawImage(this.image, 0, 0);

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
            <TopNavContainer 
              clickEffect={this.props.clickEffect} 
              handleClickEffect={this.props.handleClickEffect}
              rockCount={this.state.rockCount}
              foodCount={this.state.foodCount}
              foods={this.state.foods}
              rocks={this.state.rocks}
              houses={this.state.houses}
              title={this.state.title}
              url={this.state.url}
              mapId={this.props.mapId}
            />
            <canvas id="canvas" onKeyPress={this.handleKey} onClick={this.getCursorPosition} ref="canvas" className={this.state.clickEffect} width={5000} height={5000} />

            <img ref="foodIcon" alt="" src={foodIcon} className="hidden" />
            <img ref="rockIcon" alt="" src={rockIcon} className="hidden" />
            <img ref="houseIcon" alt="" src={houseIcon} className="hidden" />
            <img ref="worldMap" alt="" onLoad={this.callbackTest} src={worldMap} className="hidden" />
            <div className={`overlap ${this.state.hidden}`}>
                  <span>Cannot place object on starting position</span>
            </div>
            <MapEditorMenu handleClickEffect={this.handleClickEffect} handleSave={this.handleSave}/>
         </div> 
        )
      }
    }

export default Canvas