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
                                <div className="splom-placeholder">
                                    <svg width="1000" height="700">
                                        <line
                                            x1="20"
                                            y1="20"
                                            x2="20"
                                            y2="670"
                                            style={{ stroke: '#3E3E3F', strokeWidth: 2 }}
                                        />
                                        <rect
                                            x="50"
                                            y="20"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="360"
                                            y="20"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="670"
                                            y="20"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="50"
                                            y="230"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="360"
                                            y="230"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="670"
                                            y="230"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="50"
                                            y="440"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="360"
                                            y="440"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <rect
                                            x="670"
                                            y="440"
                                            width="300"
                                            height="200"
                                            style={{ fill: '#757679', fillOpacity: 0.1, strokeOpacity: 0.9 }}
                                        />
                                        <line
                                            x1="10"
                                            y1="655"
                                            x2="1000"
                                            y2="655"
                                            style={{ stroke: '#3E3E3F', strokeWidth: 2 }}
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div id="table-body" className="card-body" />
                            <p className="table-para">
                                Please select point to create Table
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CompareComponent;
