import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './filter.css';

/**
 * The component to sort sample data
 *
 * @className SortComponent
 * @extends {Component}
 * @param {Object} event - event
 */
class FilterComponent extends Component {
    /**
     * constructor for FilterComponent
     * @param  {Object} props - props
     */
    constructor(props) {
        super(props);
        this.selectField = React.createRef();
        this.selectedOperation = React.createRef();
        this.selectedValue = React.createRef();
        this.fieldArray = ['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'];
        this.state = {
            selectedField: null,
            selectedOperation: null,
            selectedvalue: null
        };
    }

    /**
     * function to set selection state
     *
     * @param  {Object} event - selection event
     */
    setSelection = (event) => {
        this.setState({
            selectedField: event.target.value
        });
    }

    /**
     * function to set operation event
     *
     * @param  {Object} event - Object Event
     */
    setOperation = (event) => {
        this.setState({
            selectedOperation: event.target.value
        });
    }

    /**
     * function to set selected value
     *
     * @param  {Object} event - set selected value
     */
    setValue = (event) => {
        this.setState({
            selectedvalue: event.target.value
        });
    }

    /**
     * function to filter chart
     *
     * @param  {string} =>{this.props.filter(this.state.selectedField
     * @param  {string} this.state.selectedOperation - selected Operation
     * @param  {string} this.state.selectedvalue - selected value
     */
    filterChart = () => {
        this.props.filter(this.state.selectedField, this.state.selectedOperation, this.state.selectedvalue);
    }

    /**
     * function to reset filtering
     *
     */
    resetFiltering = () => {
        this.selectField.current.selectedIndex = 0;
        this.selectedOperation.current.selectedIndex = 0;
        this.selectedValue.current.value = '';
        this.props.clearFilter();
        this.setState({
            selectedField: null,
            selectedOperation: null,
            selectedvalue: null
        });
        setTimeout(() => {
            this.props.render();
        }, 500);
    }

    /**
     * Renders the component.
     *
     * @return {Component} Component jsx.
     * @memberof FilterComponent
     */
    render() {
        return (
            <div className="filter-component">
                <div className="row filter-body">
                    <div className="dropdown filter-dropdown">
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
                    <div className="dropdown filter-dropdown">
                        <select
                            ref={this.selectedOperation}
                            id="callType"
                            name="callType"
                            className="form-control"
                            onChange={event => this.setOperation(event)}
                        >
                            <option value="" selected disabled hidden>Select an Operation</option>
                            <option value="lessThan">Less Than</option>
                            <option value="greaterThan">Greater Than</option>
                            <option value="equalTo">Equal To</option>
                            <option value="greaterThanEqualTo">Greater Than Equal To</option>
                            <option value="lessThanEqualTo">Less Than Equal To</option>
                        </select>
                    </div>
                    <div className="input-group value-input">
                        <input
                            ref={this.selectedValue}
                            type="text"
                            className="form-control"
                            onChange={event => this.setValue(event)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="close filter-close"
                        aria-label="Close"
                        onClick={this.resetFiltering}
                    >
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
                    <button
                        type="button"
                        className="btn btn-primary btn-filter"
                        onClick={this.filterChart}
                    >
                Filter
                    </button>
                </div>
            </div>
        );
    }
}

FilterComponent.propTypes = {
    filter: PropTypes.func.isRequired,
    clearFilter: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired
};


export default FilterComponent;
