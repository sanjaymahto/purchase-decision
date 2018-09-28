import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { DATA } from '../constants';
import './sort.css';

/* global document */

/**
 * The component to sort sample data
 *
 * @class SortComponent
 * @extends {Component}
 * @param {Object} event - event
 */
class SortComponent extends Component {
    /**
     * constructor for SortComponent
     * @param  {Object} props - props
     */
    constructor(props) {
        super(props);
        this.radio = React.createRef();
        this.selectField = React.createRef();
        this.fieldArray = ['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'];
        this.state = {
            sortValue: null,
            selectedField: null,
        };
    }

    /**
     * function to set the sorting data in state.
     * @param  {Object} event - event
     */
    setSorting = (event) => {
        this.setState({
            sortValue: event.target.value
        });
    }

    /**
     * function to set the selected field data in state
     *
     * @param  {Object} event - event
     */
    setSelection = (event) => {
        this.setState({
            selectedField: event.target.value
        });
    }

    /**
     * function to reset the sorting data.
     */
    resetSorting = () => {
        this.selectField.current.selectedIndex = 0;
        document.getElementById('Asc').checked = false;
        document.getElementById('Desc').checked = false;
        this.props.clearSort();
        this.setState({
            sortValue: null,
            selectedField: null,
        });
        setTimeout(() => {
            this.props.render();
        }, 500);
    }

    /**
     * function to sort the rendered chart.
     */
    sortChart = () => {
        this.props.sort(this.state.selectedField, this.state.sortValue);
    }

    /**
     * Renders the component.
     *
     * @return {Component} Component jsx.
     * @memberof SortComponent
     */
    render() {
        return (
            <div className="sort-component">
                <p className="filter-paragraph">SORT</p>
                <div className="row filter-body-sort">
                    <div className="dropdown sort-dropdown">
                        <select
                            ref={this.selectField}
                            id="callType"
                            name="callType"
                            className="form-control"
                            onChange={event => this.setSelection(event)}
                        >
                            <option value="" selected disabled hidden>Select a field</option>
                            {this.fieldArray.map(x => <option value={x} key={x}>{x}</option>)};
                        </select>
                    </div>
                    <div
                        className="form-check sort-radio"
                        ref={this.radio}
                        onChange={event => this.setSorting(event)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sort-radio"
                            id="Asc"
                            value="1"
                        />
                        <p className="sorting-radio-para">Asc.</p>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sort-radio"
                            id="Desc"
                            value="-1"
                        />
                        <p className="sorting-radio-para">Desc.</p>
                    </div>
                    <button type="button" className="close sort-close" aria-label="Close" onClick={this.resetSorting}>
                        <svg
                            className="close-icon"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 455.111 455.111"
                            xmlSpace="preserve"
                        >
                            <circle style={{ fill: '#E24C4B' }} cx="227.556" cy="227.556" r="227.556" />
                            <path
                                style={{ fill: '#D1403F' }}
                                d="M455.111,227.556c0,125.156-102.4,227.556-227.556,227.556c-72.533,
                                0-136.533-32.711-177.778-85.333 c38.4,31.289,88.178,49.778,142.222,
                                49.778c125.156,0,227.556-102.4,
                                227.556-227.556c0-54.044-18.489-103.822-49.778-142.222
                                C422.4,91.022,455.111,155.022,455.111,227.556z"
                            />
                            <path
                                style={{ fill: '#FFFFFF' }}
                                d="M331.378,331.378c-8.533,8.533-22.756,8.533-31.289,
                                0l-72.533-72.533l-72.533,72.533
                                c-8.533,8.533-22.756,8.533-31.289,0c-8.533-8.533-8.533-22.756,
                                0-31.289l72.533-72.533l-72.533-72.533
                                c-8.533-8.533-8.533-22.756,0-31.289c8.533-8.533,
                                22.756-8.533,31.289,0l72.533,72.533l72.533-72.533
                                c8.533-8.533,22.756-8.533,31.289,0c8.533,8.533,
                                8.533,22.756,0,31.289l-72.533,72.533l72.533,72.533
                                C339.911,308.622,339.911,322.844,331.378,331.378z"
                            />
                        </svg>
                    </button>
                    <button type="button" className="btn btn-primary btn-sort" onClick={this.sortChart}>Sort</button>
                </div>
            </div>
        );
    }
}

SortComponent.propTypes = {
    sort: PropTypes.func.isRequired,
    clearSort: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired
};


export default SortComponent;
