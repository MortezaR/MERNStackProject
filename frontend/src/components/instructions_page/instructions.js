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

class Instructions extends React.Component {
    constructor(props) {
        super(props)
        this.piglet = new Image();
        this.piglet.src = 'https://i.imgur.com/f0z68qE.png';

    }

    render() {
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
                            Trees can be harvested for delicious apples
                        </div>
                        <div className="instruction-row">
                            Apples can be placed at deposits.  Place enough apples to win!
                            <img ref="deposit" alt="" src={deposit} />
                        </div>
                        <div className="instruction-row">
                            <img ref="hTerminal" alt="" src={hTerminal} />
                            Alternatively, piglets can hack all of the terminals scattered around the map to win
                        </div>
                        <div className="instruction-row">
                            Spend food to place traps which temporarily stop the wolf in his tracks
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
                    </div>
                    <div className="player-card">
                        <div className="card-title">About</div>
                        <div className="about-row">
                            Big Bad Wolf is a fullstack MERN app making extensive use of MongoDB, Express, Node.js
                            and React/Redux.  Multiplayer and lobby are implemented using WebSockets.  The game and map
                            editor are rendered using Canvas.js.  The unbelievably talented developers who created this project
                            are: 
                        </div>
                        <div className="divider"></div>
                        <div className="about-row">
                            <a href="https://github.com/kenhufford" target="_blank">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/kenneth-hufford-b09a324b/" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            Kenny Hufford
                        </div>
                        <div className="divider"></div>
                        <div className="about-row">
                            <a href="https://github.com/MortezaR" target="_blank">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/morteza-r-5b616292/" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            Morteza Rohaninejad
                        </div>
                        <div className="divider"></div>
                        <div className="about-row">
                            <a href="https://github.com/novirius" target="_blank">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/david-chin-504269106/" target="_blank">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            David Chin
                        </div>
                        <div className="divider"></div>
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

export default Instructions