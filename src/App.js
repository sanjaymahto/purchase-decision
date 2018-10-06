import React, { Component } from 'react';
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
      filteringRootData: null,
      chartCanvas: null,
      canvasRootData: null,
      tableCanvas: null,
      prevState: null
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
    
   //setting state for the previous chart
   this.setState({
       prevState: {
           field: field,
           operation: operation,
           value:value
       }
   }) 
  
  // load data and schema from constants file
  const data = DATA;
  const schema = SCHEMA;

 // Retrieves the DataModel from muze namespace. Muze recognizes DataModel as a first class source of data.
 let DataModel = muze.DataModel;

 //to set the rootData 
 let rootData = new DataModel(data, schema);

 //sorting function to sort chart
 const select = DataModel.Operators.select;

    switch(operation) {
        case 'lessThan' : 
        rootData = rootData.select((fields, i) => fields[field].value < value);
        break;
        case 'greaterThan' : 
        rootData = rootData.select((fields, i) => fields[field].value > value);
        break;
        case 'equalTo' : 
        rootData = rootData.select((fields, i) => fields[field].value == value);
        break;
        case 'lessThanEqualTo' : 
        rootData = rootData.select((fields, i) => fields[field].value <= value);
        break;
        case 'greaterThanEqualTo' : 
        rootData = rootData.select((fields, i) => fields[field].value >= value);
        break;
        default : 
        rootData = rootData;
        break;
    }

    if(rootData.getData().data.length === 0) {
        alert('field with this value is not present in the chart!');
    }

        //setting the state
        this.setState({
            prevState: {
            field: field,
            operation: operation,
            filterValue: value.split('.')[0],
            filterAppendValue: '.'+value.split('.')[1]
            },
            rootData: rootData
        });
        // Create an environment for future rendering
        const env = muze();
        // Create an instance of canvas which houses the visualization
        const canvas = env.canvas();

        canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs']) 
        .columns(['Maker'])
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
 * @param  {string} operationh
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
        rootData = rootData.select((fields, i) => fields[field].value < value);
        break;
        case 'greaterThan' : 
        rootData = rootData.select((fields, i) => fields[field].value > value);
        break;
        case 'equalTo' : 
        rootData = rootData.select((fields, i) => fields[field].value == value);
        break;
        case 'lessThanEqualTo' : 
        rootData = rootData.select((fields, i) => fields[field].value <= value);
        break;
        case 'greaterThanEqualTo' : 
        rootData = rootData.select((fields, i) => fields[field].value >= value);
        break;
        default : 
        rootData = rootData;
        break;
    }

    if(rootData.getData().data.length === 0) {
        alert('field with this value is not present in the chart!');
    }

    canvas = canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'])
        .columns(['Weight_in_lbs', 'Miles_per_Gallon', 'Horsepower'])
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
    prevState:null,
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

    //storing root data for filter purpose
    this.setState({
        filteringRootData: dm
    })
  
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
        canvasRootData: crosstabData,
        filteringRootData: crosstabData
    })

    // Create an environment for future rendering
    let env = muze();
    // Get a canvas instance from Muze where the chart will be rendered.
    let canvas = env.canvas();

    canvas = canvas
        .rows(['Horsepower', 'Miles_per_Gallon', 'Weight_in_lbs'])
        .columns(['Weight_in_lbs', 'Miles_per_Gallon', 'Horsepower'])
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

       setTimeout(()=> {
           if(this.state.prevState){
        this.clearComponent.current.selectField.current.value = this.state.prevState.field || '';
        this.clearComponent.current.selectedOperation.current.value = this.state.prevState.operation || '';
        this.clearComponent.current.selectedValue.current.value = this.state.prevState.filterValue;
        this.clearComponent.current.selectedAppendValue.current.value = this.state.prevState.filterAppendValue;

        //setting state in the filter component
         this.clearComponent.current.state.selectedField = this.state.prevState.field;
         this.clearComponent.current.state.selectedOperation = this.state.prevState.operation;
         this.clearComponent.current.state.selectedValue = this.state.prevState.filterValue;
         this.clearComponent.current.state.selectedAppendValue = this.state.prevState.filterValue + this.state.prevState.filterAppendValue;
           }
       },500);


      
       //to reset the filter component
    //    this.clearCompareComponent.current.resetFiltering();
       

    } else {
       $('#chart-container').hide("slide", {direction: "left" }, 1000);

       this.setState({
           showModal: true
       });

     //to reset the filter component
    //  this.clearComponent.current.resetFiltering();        

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
        <a href="https://github.com/sanjaymahto/purchase-decision" target="_blank">
        <img style={{position: 'absolute', top: '-16px', right: '-20px', border: 0}} src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub" />
        </a>
        <div className="github-ribbon">
        <a className="github-ribbon__link" href="https://charts.com" title="Fork me on GitHub" target="_blank">Go to charts.com</a>
        </div>
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
                        filteringRootData={this.state.filteringRootData}
                        filter={this.filterComparedChart}
                        clearFilter={this.clearCompareFilter}
                        render={this.renderChartComp}
                    />
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col-2">
                        {/* <SortingComponent 
                        sort={this.sortedChart}
                        clearSort={this.clearSort}
                        render={this.renderChart}/> */}
                    </div>
                    <div className="col-8">
                    <FilterComponent
                        ref={this.clearComponent}
                        filteringRootData={this.state.filteringRootData}
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
