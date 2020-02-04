import React from 'react';
import './canvas.scss';
import foodIcon from '../../assets/images/food_icon.png'
import rockIcon from '../../assets/images/rock_icon.png'
import teleporterIcon from '../../assets/images/teleporter_icon.png'
import destinationIcon from '../../assets/images/destination_icon.png'
import hTerminalIcon from '../../assets/images/hTerminal_icon.png'
import depositIcon from '../../assets/images/deposit_icon.png'
import houseIcon from '../../assets/images/house_icon.png'


import worldMap from '../../assets/images/worldmap1.png';
import TopNavContainer from '../top_nav/top_nav_container.js';
import MapEditorMenuContainer from '../map_editor_menu/map_editor_menu_container';
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
        teleporterCount: 0,
        hTerminalCount: 0,
        depositCount: 0,
        foods: {},
        rocks: {},
        teleporters:{},
        hTerminals: {},
        deposits: {},
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

    //This will axios call based on url
    //If url is undefined, then error in console but nothing breaks
    if (this.props.mapId) {
      axios.get(`/api/maps/${this.props.mapId}`)
      .then(map => {
        this.setState({
          rockCount: map.data.objects.rockCount,
          foodCount: map.data.objects.foodCount,
          foods: map.data.objects.foods,
          rocks: map.data.objects.rocks,
          teleporters: map.data.objects.teleporters,
          hTerminals: map.data.objects.hTerminals,
          deposits: map.data.objects.deposits,
          houses: map.data.objects.houses,
          title: map.data.title,
          url: map.data.url
        })
      })
    }
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
            teleporterCount: this.state.teleporterCount,
            hTerminalCount: this.state.hTerminalCount,
            depositCount: this.state.depositCount,
            foods: this.state.foods,
            rocks: this.state.rocks,
            teleporters: this.state.teleporters,
            hTerminals: this.state.hTerminals,
            deposits: this.state.deposits,
            houses: this.state.houses
        }
    }
      if (this.props.mapId) {
        axios.put(`/api/maps/${this.props.mapId}`, map)
      }
      else {
        axios.post('/api/maps/', map)
      }
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
            Object.keys(this.state.teleporters).forEach(teleporterKey => {
              if (Math.sqrt((canvasx-this.state.teleporters[teleporterKey].x)*(canvasx-this.state.teleporters[teleporterKey].x) + (canvasy-this.state.teleporters[teleporterKey].y)*(canvasy-this.state.teleporters[teleporterKey].y)) < this.state.radius) {
                this.setState({
                  teleporters: Object.assign({}, this.state.teleporters, {[teleporterKey]: {x: -10000000000000000000000000000, y: -1000000000000000000000000, newX: -1000000000000000000000000, newY: -1000000000000000000000000}})
                })
              }
            })
            Object.keys(this.state.hTerminals).forEach(hTerminalKey => {
              if (Math.sqrt((canvasx-this.state.hTerminals[hTerminalKey].x)*(canvasx-this.state.hTerminals[hTerminalKey].x) + (canvasy-this.state.hTerminals[hTerminalKey].y)*(canvasy-this.state.hTerminals[hTerminalKey].y)) < this.state.radius) {
                this.setState({
                  hTerminals: Object.assign({}, this.state.hTerminals, {[hTerminalKey]: {x: -10000000000000000000000000000, y: -1000000000000000000000000}})
                })
              }
            })
            Object.keys(this.state.deposits).forEach(depositKey => {
              if (Math.sqrt((canvasx-this.state.deposits[depositKey].x)*(canvasx-this.state.deposits[depositKey].x) + (canvasy-this.state.deposits[depositKey].y)*(canvasy-this.state.deposits[depositKey].y)) < this.state.radius) {
                this.setState({
                  deposits: Object.assign({}, this.state.deposits, {[depositKey]: {x: -10000000000000000000000000000, y: -1000000000000000000000000}})
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
        case 'teleporter':
          if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
            console.log('overlapped')
            this.handleOverlap();
            break;
          }
          else {
            this.setState({
              teleporters: Object.assign({}, this.state.teleporters, {[this.state.teleporterCount]: {x: canvasx, y: canvasy}}),
              clickEffect: 'destination'
            })
            break;
          }
        case 'destination':
            if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
              console.log('overlapped')
              this.handleOverlap();
              break;
            }
            else {
              let newState = Object.assign({}, this.state.teleporters);
              let indexed = Object.assign({}, this.state.teleporters[this.state.teleporterCount], {newX: canvasx, newY: canvasy})
              newState[this.state.teleporterCount] = indexed;
              // console.log(indexed)
              // indexed = {[this.state.teleporterCount]: indexed};
              console.log(indexed)
              console.log(`before ${this.state.teleporters}`)
              this.setState({
                teleporters: newState,
                teleporterCount: this.state.teleporterCount + 1,
                clickEffect: 'teleporter'
              })
              console.log(this.state.teleporters)
              break;
            }
        case 'hTerminal':
          if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
            console.log('overlapped')
            this.handleOverlap();
            break;
          }
          else {
            this.setState({
              hTerminals: Object.assign({}, this.state.hTerminals, {[this.state.hTerminalCount]: {x: canvasx, y: canvasy}}),
              hTerminalCount: this.state.hTerminalCount + 1
            })
            break;
          }
        case 'deposit':
          if (this.state.houses[0] && this.intersectRect(canvasx, canvasy, this.state.houses[0])) {
            console.log('overlapped')
            this.handleOverlap();
            break;
          }
          else {
            this.setState({
              deposits: Object.assign({}, this.state.deposits, {[this.state.depositCount]: {x: canvasx, y: canvasy}}),
              depositCount: this.state.depositCount + 1
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
        Object.values(this.state.teleporters).forEach(teleporter => {
          this.ctx.drawImage(this.refs.teleporterIcon, 0, 0, 135, 135, teleporter.x-60, teleporter.y-60, 135, 135);
          this.ctx.drawImage(this.refs.destinationIcon, 0, 0, 135, 135, teleporter.newX-60, teleporter.newY-60, 135, 135);
          console.log(this.state.teleporters)
        })
        Object.values(this.state.hTerminals).forEach(hTerminal => {
          this.ctx.drawImage(this.refs.hTerminalIcon, 0, 0, 135, 135, hTerminal.x-60, hTerminal.y-60, 135, 135);
        })
        Object.values(this.state.deposits).forEach(deposit => {
          this.ctx.drawImage(this.refs.depositIcon, 0, 0, 135, 135, deposit.x-60, deposit.y-60, 135, 135);
        })
        Object.values(this.state.houses).forEach(house => {
          this.ctx.drawImage(this.refs.houseIcon, 0, 0, 300, 260, house.x-150, house.y-130, 300, 260);
        })
      }
        return(
          <div className="testsize">
            
            <canvas id="canvas" onKeyPress={this.handleKey} onClick={this.getCursorPosition} ref="canvas" className={this.state.clickEffect} width={5000} height={5000} />

            <img ref="foodIcon" alt="" src={foodIcon} className="hidden" />
            <img ref="rockIcon" alt="" src={rockIcon} className="hidden" />
            <img ref="houseIcon" alt="" src={houseIcon} className="hidden" />
            <img ref="teleporterIcon" alt="" src={teleporterIcon} className="hidden" />
            <img ref="destinationIcon" alt="" src={destinationIcon} className="hidden" />
            <img ref="hTerminalIcon" alt="" src={hTerminalIcon} className="hidden" />
            <img ref="depositIcon" alt="" src={depositIcon} className="hidden" />
            <img ref="worldMap" alt="" onLoad={this.callbackTest} src={worldMap} className="hidden" />
            <div className={`overlap ${this.state.hidden}`}>
                  <span>Cannot place object on starting position</span>
            </div>
            <MapEditorMenuContainer title={this.state.title} url={this.state.url} handleClickEffect={this.handleClickEffect} handleSave={this.handleSave}/>
         </div> 
        )
      }
    }

export default Canvas