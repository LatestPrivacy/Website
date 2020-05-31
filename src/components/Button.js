import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Style from './Button.module.scss'
import Arrow from '../assets/images/arrow-right.svg'
import Love from '../assets/images/ico-love.svg'

class Button extends Component {
    render() {
        return (
            <>
                {
                    this.props.type === "line" ?
                    (
                        <Link to={this.props.url} className={`button ${Style.buttonLine}`} target={this.props.target}>
                            <span>{this.props.value}</span>
                            <img src={Love} alt="Love" className="love" />
                        </Link>
                    ) : (
                        <Link to={this.props.url} className={`button ${Style.button}`} target={this.props.target}>
                            <span>{this.props.value}</span>
                            <img src={Arrow} alt="arrow" className="arrow" />
                        </Link>
                    )
                }
                
            </>
        );
    }
}

export default Button;

Button.defaultProps = {
    url: "#",
    target: "_self"
}