import React, { Component } from 'react';
import SortingComponent from './sort/index';
import FilterComponent from './filter/index';
import CompareComponent from './compare/index';
import { DATA, SCHEMA } from './constants';
import { selectedFields, updateTableView, dataconverter } from './utils';
import './App.css';

/* global muze */
/* eslint require-jsdoc: 0 */
/* eslint-disable */
/* eslint no-tabs: 0 */
/**
 * The component to render chart
 *
 * @className App
 * @extends {Component}
 */
class App extends Component {
  /**
   * constructor for App component
   * 
   * @param  {Object} props - component props
   */
constructor(props) {
    super(props);
    this.clearComponent = React.createRef();
    this.clearCompareComponent = React.createRef();
    this.state = {
      sortState: null,
      filterState: null,
      showModal: false,
      rootData: null,
      chartCanvas: null,
      canvasRootData: null,
      tableCanvas: null
    };
}

/**
 * function to be called on mount of the component
 * 
 */
componentDidMount() {
    this.renderChart(); //to render charts
}
    
/**
 * function to sort the rendered chart
 * @param  {string} field 
 * @param  {string} sortValue
*/
sortedChart = (field, sortValue) => {
    
   //defining root Data
    let rootData;   

  // load data and schema from constants file
    const data = DATA;
    const schema = SCHEMA;

  // Retrieves the DataModel from muze namespace. Muze recognizes DataModel as a first class source of data.
    let DataModel = muze.DataModel;
 
  // Create an instance of DataModel using the data and schema.
    if(this.state.rootData !== null){
        rootData = this.state.rootData;
    } else {
        rootData = new DataModel(data, schema);
    }

 //sorting function to sort chart
 const sort = DataModel.Operators.sort;
 
        if(sortValue){
            if(sortValue == '-1'){
                rootData = rootData.sort([
                [field, 'desc']
                ]);
                } else {
                    rootData = rootData.sort([
                    [field, 'asc']
                ]);
            }
        }

        //Setting the state of sorted data
        this.setState({
            sortState: {
            sortfield: field,
            sortValue: sortValue
            },
            rootData: rootData
        });

    // Create an environment for future rendering
    const env = muze();
        
    // Create an instance of canvas which houses the visualization
        const canvas = env.canvas();

        canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs']) // Horsepower goes in Y aix
        .columns(['Maker']) // Year goes in X axis
        .data(rootData)
        .config({autoGroupBy: {disabled: true}})
        .width(1000)
        .height(600)
        .mount('#chart-container') // Set the chart mount point

        this.setState({
            chartCanvas:canvas
        });
}

/**
 * function to filter the chart
 * @param  {string} field
 * @param  {string} operation
 * @param  {string} Value
 */
filterChart = (field, operation, value) => {
    
  //defining rootData
  let rootData;
  
  // load data and schema from constants file
  const data = DATA;
  const schema = SCHEMA;

 // Retrieves the DataModel from muze namespace. Muze recognizes DataModel as a first class source of data.
 let DataModel = muze.DataModel;

 // Create an instance of DataModel using the data and schema.
 if(this.state.rootData !== null){
    rootData = this.state.rootData;
 } else {
    rootData = new DataModel(data, schema);
 }

 //sorting function to sort chart
 const select = DataModel.Operators.select;

    switch(operation) {
        case 'lessThan' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value < value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value < value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value < value);
        break;
        case 'greaterThan' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value > value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value > value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value > value);
        break;
        case 'equalTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value == value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value == value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value == value);
        break;
        case 'lessThanEqualTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value <= value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value <= value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value <= value);
        break;
        case 'greaterThanEqualTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value >= value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value >= value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value >= value);
        break;
        default : 
        rootData = rootData;
        break;
    }

    //setting the state
    this.setState({
        filterState: {
        filterField: field,
        filterOperation: operation,
        filterValue: value
        },
        rootData: rootData
    });
        // Create an environment for future rendering
        const env = muze();
        // Create an instance of canvas which houses the visualization
        const canvas = env.canvas();

        canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs']) // Horsepower goes in Y aix
        .columns(['Maker']) // Year goes in X axis
        .data(rootData)
        .width(1000)
        .height(600)
        .mount('#chart-container') // Set the chart mount point

        this.setState({
            chartCanvas:canvas
        });

}

/**
 * function to filter the compared chart
 *
 * @param  {string} field
 * @param  {string} operation
 * @param  {string} value
 */
filterComparedChart = (field, operation, value) => {

    // blocking table-para div paragraph
    document.getElementsByClassName('table-para')[0].style.display = 'block';

    // to remove any table if already present with the updated one
    if (document.getElementsByClassName('tableStyle')[0]) {
        document.getElementsByClassName('tableStyle')[0].remove();
    }

    // Retrieves the DataModel from muze namespace. Muze recognizes DataModel as a first class source of data.
    let DataModel = muze.DataModel;
    // Create an instance of DataModel using the data and schema.
    let rootData = this.state.canvasRootData;

    // Create an environment for future rendering
    let env = muze();
    // Get a canvas instance from Muze where the chart will be rendered.
    let canvas = env.canvas();

        //sorting function to sort chart
    const select = DataModel.Operators.select;

    switch(operation) {
        case 'lessThan' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value < value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value < value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value < value);
        break;
        case 'greaterThan' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value > value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value > value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value > value);
        break;
        case 'equalTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value == value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value == value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value == value);
        break;
        case 'lessThanEqualTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value <= value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value <= value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value <= value);
        break;
        case 'greaterThanEqualTo' : 
        if(field === 'Horsepower')
        rootData = rootData.select((fields, i) => fields.Horsepower.value >= value);
        if(field === 'Miles_per_Gallon')
        rootData = rootData.select((fields, i) => fields.Miles_per_Gallon.value >= value);
        if(field === 'Weight_in_lbs')
        rootData = rootData.select((fields, i) => fields.Weight_in_lbs.value >= value);
        break;
        default : 
        rootData = rootData;
        break;
    }

    canvas = canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'])
        .columns(['Miles_per_Gallon', 'Horsepower', 'Weight_in_lbs'])
        .data(rootData)
        .height(700)
        .width(1000)
        .detail(['Name']) // Show all the data point
        .mount(document.getElementById('compare-chart-container'));

         //defining object for selected data.
         let selectedData = {};
        
         // brush effect in SPLOM Chart
         const SpawnableSideEffect = muze.SideEffects.standards.SpawnableSideEffect;
 
         muze.ActionModel.for(canvas)
             .mapSideEffects({
                 brush: ['table']
             })
             .registerSideEffects(
                 class Table extends SpawnableSideEffect {
                     static formalName () {
                         return 'table';
                     }
                     apply (selectionSet) {
                         const model = selectionSet.mergedEnter.model;
                         const unitId = this.firebolt.context.id();
                         selectedData[unitId] = model;
                         let data = updateTableView(selectedData);
                         dataconverter(data);
                     }
                 });
}

/**
 * function to clear the sort state
 */
clearSort = () => {
  this.setState({
    sortState: null,
    rootData: null
  });
}

/**
 * function to clear the filter state
 */
clearFilter = () => {
  this.setState({
    filterState: null,
    rootData: null
  });
}

/**
 * function to clear the filter state
 */
clearCompareFilter = () => {

    // blocking table-para div paragraph
    document.getElementsByClassName('table-para')[0].style.display = 'block';

    // to remove any table if already present with the updated one
    if (document.getElementsByClassName('tableStyle')[0]) {
        document.getElementsByClassName('tableStyle')[0].remove();
    }

    this.setState({
      filterState: null,
      rootData: null
    });
}

/**
 * function to render the chart
 */
renderChart = () => {
    
    if(this.state.sortState !== null) {
        this.sortedChart(this.state.sortState.sortfield,
        this.state.sortState.sortValue);
    } else {
        if(this.state.filterState !== null){
            this.filterChart(this.state.filterState.filterField, 
            this.state.filterState.filterOperation, 
            this.state.filterState.filterValue);
        } else {

    // load data and schema from url
     const data = DATA;
     const schema = SCHEMA;

    // Create an instance of DataModel using the data and schema.
    let dm = new muze.DataModel(data, schema);
  
  	// Create an environment for future rendering
    const env = muze();
    // Create an instance of canvas which houses the visualization
    const canvas = env.canvas();

	canvas
    .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs']) // Horsepower goes in Y aix
    .columns(['Maker']) // Year goes in X axis
    .data(dm)
    .width(1000)
    .height(600)
    .mount('#chart-container') // Set the chart mount point

    // setting chartCanvas State
    this.setState({
            chartCanvas:canvas
        });

        }
    }
}

/**
* function to render a SPLOM chart from the given values
* @param  {Array} fields - charting field array
*/
renderChartComp = () => {

    document.getElementsByClassName('splom-placeholder')[0].style.display = 'none';

    // Defining variable - Canvas instance of rendered chart 
    const crosstab = this.state.chartCanvas;

    // defining variable to get the selected point from SPLOM chart
    const crosstabData = selectedFields(crosstab);

    // storing crosstab data in the state
    this.setState({
        canvasRootData: crosstabData
    })

    // Create an environment for future rendering
    let env = muze();
    // Get a canvas instance from Muze where the chart will be rendered.
    let canvas = env.canvas();

    canvas = canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'])
        .columns(['Miles_per_Gallon', 'Horsepower', 'Weight_in_lbs'])
        .data(crosstabData)
        .height(700)
        .width(1000)
        .detail(['Name']) // Show all the data point
        .mount(document.getElementById('compare-chart-container'));

        //defining object for selected data.
        let selectedData = {};
        
        // brush effect in SPLOM Chart
        const SpawnableSideEffect = muze.SideEffects.standards.SpawnableSideEffect;

        muze.ActionModel.for(canvas)
            .mapSideEffects({
                brush: ['table']
            })
            .registerSideEffects(
                class Table extends SpawnableSideEffect {
                    static formalName () {
                        return 'table';
                    }
                    apply (selectionSet) {
                        const model = selectionSet.mergedEnter.model;
                        const unitId = this.firebolt.context.id();
                        selectedData[unitId] = model;
                        let data = updateTableView(selectedData);
                        dataconverter(data);
                    }
                });

}

/**
 * function to toggle modal
 */
toggleModal = () => {
   
    if(this.state.showModal) {
       $('#chart-container').show("slide", { direction: "right" }, 1000);
       this.setState({
           showModal: false
       });
       //to reset the filter component
       this.clearCompareComponent.current.resetFiltering();
       

    } else {
       $('#chart-container').hide("slide", {direction: "left" }, 1000);

       this.setState({
           showModal: true
       });

     //to reset the filter component
     this.clearComponent.current.resetFiltering();        

        //render the compare chart
       setTimeout(() => {this.renderChartComp()},700);
    }
}

/**
 * function to go back to the back page
 */
backPage = () => {
    this.toggleModal();
}

/**
 * Renders the component.
 *
 * @return {Component} Component jsx.
 * @memberof App
 */
render() {
    return (
        <div className="App">
            <div className="container">
                { this.state.showModal ?
                <div className="row">
                    <div className="col-4">
                        <div className="back-icon">
                            <svg
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                viewBox="0 0 76 76"
                                xmlSpace="preserve"
                                onClick={this.backPage}
                            >
                                <g>
                                    <g>
                                        <polygon
                                            style={{ fill: '#030104' }}
                                            points="39.414,0 39.418,19.137 74.5,19.133
                                        74.5,56.898 39.414,56.898 39.418,76 1.5,37.998"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="col-8">
                    <FilterComponent
                        ref={this.clearCompareComponent}
                        filter={this.filterComparedChart}
                        clearFilter={this.clearCompareFilter}
                        render={this.renderChartComp}
                    />
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col-4">
                        <SortingComponent 
                        sort={this.sortedChart}
                        clearSort={this.clearSort}
                        render={this.renderChart}/>
                    </div>
                    <div className="col-8">
                    <FilterComponent
                        ref={this.clearComponent}
                        filter={this.filterChart}
                        clearFilter={this.clearFilter}
                        render={this.renderChart}/>
                    </div>
                </div>
                }
                <div className="row">
                    <div className="col-12 chart-body">
                        <div className="card mb-3">
                            <div className="card-body">
                            <div id="chart-container"/>
                                {
                                    this.state.showModal ?
                                    <CompareComponent
                                    toggle={this.toggleModal} />:
                                    null  
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.showModal ? 
                    null :
                <button type="button" className="btn btn-primary" onClick={this.toggleModal}>Compare</button>
                }
            </div>
        </div>
    );
}

}

export default App;
