import React, { Component } from 'react';

import './compare.css';

/**
 * The component to sort sample data
 *
 * @class CompareComponent
 * @extends {Component}
 * @param {Object} event - event
 */
class CompareComponent extends Component {
    /**
     * Renders the component.
     *
     * @return {Component} Component jsx.
     * @memberof SortComponent
     */
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div id="compare-chart-container" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div id="table-body" className="card-body" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CompareComponent;
