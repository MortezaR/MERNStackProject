import React from 'react';
import './signup_modal.scss'

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleDemo(e) {
    e.preventDefault();
    e.stopPropagation();
    const user = {username: 'chris', password: 'chris123'}
    this.props.processForm(user)
  }

  render() {
    return (
        <div className="signup-container">
            <div className="signup-sm-container">
                <div className="signup-sm-wrapper">
                    <a className="signup-sm">
                    <i className="fab fa-google"></i> Sign up with Google
                    </a>
                </div>
                <div className="signup-sm-wrapper">
                    <a className="signup-sm">
                    <i className="fab fa-facebook-square"></i> Sign up with Facebook
                    </a>
                </div>
            </div>
            <div className="signup-divider-container">
                <div className="signup-divider-border">
                    <hr className="signup-divider-line" /> 
                </div>
                <div className="signup-divider-label-wrapper">
                    <p>OR EMAIL</p>
                </div>
                <div className="signup-divider-border">
                    <hr className="signup-divider-line" /> 
                </div>
            </div>
            <form onSubmit={this.handleSubmit} className="signup-form">
                <label className="signup-form-birthday-container" htmlFor="">
                    <legend className="signup-form-birthday-label">
                        <span>
                            Birthday
                        </span>
                    </legend>
                    <div className="signup-birthday-dropdown-container">
                        {/* <div className="signup-birthday-dropdown-month-wrapper"> */}
                            <select className="signup-birthday-dropdown-month">
                                <option defaultValue disabled>Month</option>
                                <option value="january">January</option>
                                <option value="february">February</option>
                                <option value="march">March</option>
                                <option value="april">April</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                                <option value="july">July</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="october">October</option>
                                <option value="november">November</option>
                                <option value="december">December</option>
                            </select>
                        {/* </div> */}
                        {/* <div className="signup-birthday-dropdown-day-wrapper"> */}
                            <select className="signup-birthday-dropdown-day">
                                <option value="-1" defaultValue disabled>Day</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        {/* </div> */}
                        {/* <div className="signup-birthday-dropdown-year-wrapper"> */}
                            <select className="signup-birthday-dropdown-year">
                                <option value="-1" defaultValue disabled>Year</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2016</option>
                                <option>2015</option>
                                <option>2014</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2011</option>
                                <option>2010</option>
                                <option>2009</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>2006</option>
                                <option>2005</option>
                                <option>2004</option>
                                <option>2003</option>
                                <option>2002</option>
                                <option>2001</option>
                                <option>2000</option>
                                <option>1999</option>
                                <option>1998</option>
                                <option>1997</option>
                                <option>1996</option>
                                <option>1995</option>
                                <option>1994</option>
                                <option>1993</option>
                                <option>1992</option>
                                <option>1991</option>
                                <option>1990</option>
                                <option>1989</option>
                                <option>1988</option>
                                <option>1987</option>
                                <option>1986</option>
                                <option>1985</option>
                                <option>1984</option>
                                <option>1983</option>
                                <option>1982</option>
                                <option>1981</option>
                                <option>1980</option>
                                <option>1979</option>
                                <option>1978</option>
                                <option>1977</option>
                                <option>1976</option>
                                <option>1975</option>
                                <option>1974</option>
                                <option>1973</option>
                                <option>1972</option>
                                <option>1971</option>
                                <option>1970</option>
                                <option>1969</option>
                                <option>1968</option>
                                <option>1967</option>
                                <option>1966</option>
                                <option>1965</option>
                                <option>1964</option>
                                <option>1963</option>
                                <option>1962</option>
                                <option>1961</option>
                                <option>1960</option>
                                <option>1959</option>
                                <option>1958</option>
                                <option>1957</option>
                                <option>1956</option>
                                <option>1955</option>
                                <option>1954</option>
                                <option>1953</option>
                                <option>1952</option>
                                <option>1951</option>
                                <option>1950</option>
                                <option>1949</option>
                                <option>1948</option>
                                <option>1947</option>
                                <option>1946</option>
                                <option>1945</option>
                                <option>1944</option>
                                <option>1943</option>
                                <option>1942</option>
                                <option>1941</option>
                                <option>1940</option>
                                <option>1939</option>
                                <option>1938</option>
                                <option>1937</option>
                                <option>1936</option>
                                <option>1935</option>
                                <option>1934</option>
                                <option>1933</option>
                                <option>1932</option>
                                <option>1931</option>
                                <option>1930</option>
                                <option>1929</option>
                                <option>1928</option>
                                <option>1927</option>
                                <option>1926</option>
                                <option>1925</option>
                                <option>1924</option>
                                <option>1923</option>
                                <option>1922</option>
                                <option>1921</option>
                                <option>1920</option>
                                <option>1919</option>
                                <option>1918</option>
                                <option>1917</option>
                                <option>1916</option>
                                <option>1915</option>
                                <option>1914</option>
                                <option>1913</option>
                                <option>1912</option>
                                <option>1911</option>
                                <option>1910</option>
                                <option>1909</option>
                                <option>1908</option>
                                <option>1907</option>
                                <option>1906</option>
                                <option>1905</option>
                                <option>1904</option>
                                <option>1903</option>
                                <option>1902</option>
                                <option>1901</option>
                                <option>1900</option>
                                <option>1899</option>
                                <option>1898</option>
                                <option>1897</option>
                                <option>1896</option>
                                <option>1895</option>
                                <option>1894</option>
                                <option>1893</option>
                                <option>1892</option>
                                <option>1891</option>
                            </select>
                        {/* </div> */}
                    </div>
                </label>
                <div className="signup-form-field-container">
                    <legend className="signup-form-field-label">
                        <span>
                            Username
                        </span>
                    </legend>
                    <div className="signup-form-input-wrapper">
                        <input 
                          className="signup-form-input" 
                          type="text"
                          placeholder="david123"
                          value={this.state.username}
                          onChange={this.update('username')}
                        />
                    </div>
                </div>
                <div className="signup-form-field-container">
                    <legend className="signup-form-field-label">
                        <span>
                            Email
                        </span>
                    </legend>
                    <div className="signup-form-input-wrapper">
                        <input 
                          className="signup-form-input" 
                          type="text"
                          placeholder="coolemail@gmail.com"
                          value={this.state.email}
                          onChange={this.update('email')} 
                    />
                    </div>
                </div>
                <div className="signup-form-field-container">
                    <legend className="signup-form-field-label">
                        <span>
                            Password
                        </span>
                    </legend>
                    <div className="signup-form-input-wrapper">
                        <input 
                          className="signup-form-input" 
                          type="password"
                          placeholder="●●●●●●●●●●"
                          value={this.state.password}
                          onChange={this.update('password')}
                    />
                    </div>
                </div>
                <div className="signup-form-submit">
                    <button id="signup-submit" type="submit" value="Sign up">Sign up</button>
                </div>
            </form>
        </div>
    );
  }
}

export default SignupModal;
