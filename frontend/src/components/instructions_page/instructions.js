import React from 'react';
import './instructions.scss';
import piglet from '../../assets/images/instructions/piggy.png';
import tree from '../../assets/images/instructions/tree.png';
import deposit from '../../assets/images/instructions/deposit.png';
import hTerminal from '../../assets/images/instructions/hTerminal.png';
import trap from '../../assets/images/instructions/trap.png';
import wolf from '../../assets/images/instructions/wolf.png';
import pigletdead from '../../assets/images/instructions/pigletdead.png';
import teleporter from '../../assets/images/instructions/teleporter.png';
import hourglass from '../../assets/images/instructions/hourglass.png';
import { Link } from 'react-router-dom';
import io from "socket.io-client";
import SoloGameCanvas from '../solo/solo';
import axios from 'axios';

class Instructions extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            inGame: false,
            pickedMap: {}
        }
        this.piglet = new Image();
        this.piglet.src = 'https://i.imgur.com/f0z68qE.png';
        this.demoGame = this.demoGame.bind(this);
        this.socket = process.env.NODE_ENV === 'production' ? io() : io("http://localhost:5000");
        this.backToInstructions = this.backToInstructions.bind(this);
    }

    componentDidMount(){
        axios.get('/api/maps/')
            .then(maps => {
                this.setState({
                    pickedMap: maps.data[0]
                })
            })
    }

    backToInstructions(){
        this.setState({
            inGame: false
        })
    }

    demoGame(type){
        if (type === "wolf"){
            this.socket.emit('soloPlayerReady', this.state.pickedMap, true)
        } else {
            this.socket.emit('soloPlayerReady', this.state.pickedMap, false)
        }
        this.setState({
            inGame: true
        })
    }

    render() {
        if (this.state.inGame){
            return (
                <div>
                    <SoloGameCanvas
                        socket={this.socket}
                        backToInstructions={this.backToInstructions}
                        map={this.state.pickedMap}
                        myId={this.socket.id}
                    />
                </div>
            )
        } else {
            return (
                <div className="instructions-page">
                    <div className="display-row">
                        <div className="player-card">
                            <div className="card-title">The Piglets</div>
                            <div className="instruction-row">
                                As a piglet your job is to gather apples and flee from the big bad wolf
                            <img ref="piglet" alt="" src={piglet} />
                            </div>
                            <div className="instruction-row">
                                <img ref="tree" alt="" src={tree} />
                                Trees can be harvested for delicious apples using alt click
                        </div>
                            <div className="instruction-row">
                                Apples can be placed at deposits using alt click.  Place enough apples to win!
                            <img ref="deposit" alt="" src={deposit} />
                            </div>
                            <div className="instruction-row">
                                <img ref="hTerminal" alt="" src={hTerminal} />
                                Alternatively, piglets can read the books around the map by standing on top of them to win.
                        </div>
                            <div className="instruction-row">
                                Spend food to place traps which temporarily stop the wolf in his tracks using alt click.
                            <img ref="trap" alt="" src={trap} />
                            </div>
                        </div>
                        <div className="player-card">
                            <div className="card-title">The Wolf</div>
                            <div className="instruction-row">
                                As a wolf your job is to hunt down the piglets before they gather enough apples to win
                            <img ref="wolf" alt="" src={wolf} />
                            </div>
                            <div className="instruction-row">
                                <img ref="pigletdead" width="45px" alt="" src={pigletdead} />
                                Use your powerful blade to cut down piglets where they stand
                        </div>
                            <div className="instruction-row">
                                Teleporters allow you to move quickly around the map
                            <img ref="teleporter" alt="" src={teleporter} />
                            </div>
                            <div className="instruction-row">
                                <img ref="hourglass" width="50px" height="50px" alt="" src={hourglass} />
                                Time is on your side--if the piglets don't gather enough apples before time runs out, you win!
                        </div>
                        <div className="map-editor-menu-save-wrapper">
                            <button onClick={() => this.demoGame("wolf")}> Demo Game As Wolf</button>
                        </div>
                        <div className="map-editor-menu-save-wrapper">
                            <button onClick={() => this.demoGame("pig")}> Demo Game As Pig</button>
                        </div>
                            
                            

                        </div>
                        <div className="player-card">
                            <div className="card-title">About</div>
                            <div className="about-row">
                                Big Bad Wolf is a fullstack MERN app making extensive use of MongoDB, Express, Node.js
                                and React/Redux.  Multiplayer and lobby are implemented using WebSockets.  The game and map
                                editor are rendered using Canvas.js.  The unbelievably talented developers who created this project
                                are:
                        </div>
                            <div className="about-row">
                                <a href="https://github.com/kenhufford" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/kenneth-hufford-b09a324b/" target="_blank">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                Kenny Hufford
                        </div>
                            <div className="about-row">
                                <a href="https://github.com/MortezaR" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/morteza-r-5b616292/" target="_blank">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                Morteza Rohaninejad
                        </div>
                            <div className="about-row">
                                <a href="https://github.com/novirius" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/david-chin-504269106/" target="_blank">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                David Chin
                        </div>
                            <div className="about-row">
                                <a href="https://github.com/mboo1" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/michael-booe-42448313/" target="_blank">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                Michael Booe
                        </div>
                        </div>
                    </div>
                    {/* <img src='https://i.imgur.com/f0z68qE.png'></img> */}
                </div>

            )
        }
        
    }
}

export default Instructions