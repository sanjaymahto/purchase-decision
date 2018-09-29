/* global muze document */
/* eslint no-unused-vars:0 */
/**
 * function to return the selected field data in SPLOM chart
 *
 *@param {Object} canvasInstance - canvas Instance of bar chart
 @return {Object} modified RootData
 */
export function selectedFields(canvasInstance) {
    // Array of selected fields
    let selectedModels = [];
    canvasInstance.composition().visualGroup.matrixInstance().value.each((cell) => {
        const firebolt = cell.valueOf().firebolt();
        const entryExitSet = cell.valueOf().firebolt()._entryExitSet;
        const selectedModel = entryExitSet.select.mergedEnter.model;
        selectedModels.push(selectedModel.project(selectedModel.getSchema().filter(d => d.type === 'dimension')
                        .map(d => d.name)));
    });

    return canvasInstance.composition().visualGroup.data().select(fields => selectedModels.some((model) => {
        let dataObj = model.getData();
        let { data } = dataObj;
        return dataObj.data.some((d, rIdx) => dataObj.schema.every((i, cIdx) =>
            fields[i.name].value === data[rIdx][cIdx]));
    }));
}

/**
 * function to create datamodel from the selected points in the brush region in SPLOM chart
 *
 * @param  {Object} dm1 - Object 1
 * @param  {Object} dm2 - Object 2
 * @return {Object}  modified DataModel
 */
const concatModels = (dm1, dm2) => {
    const dataObj1 = dm1.getData();
    const dataObj2 = dm2.getData();
    const data1 = dataObj1.data;
    const data2 = dataObj2.data;
    const schema1 = dataObj1.schema;
    const schema2 = dataObj2.schema;
    const tuples1 = {};
    const tuples2 = {};
    const commonTuples = {};
    for (let i = 0; i < data1.length; i++) {
        for (let ii = 0; ii < data2.length; ii++) {
            const row1 = data1[i];
            const row2 = data2[ii];
            const dim1Values = row1.filter((d, idx) => schema1[idx].type === 'dimension');
            const dim2Values = row2.filter((d, idx) => schema2[idx].type === 'dimension');
            const allDimSame = dim1Values.every(value => dim2Values.indexOf(value) !== -1);
            if (allDimSame) {
                const key = dim1Values.join();
                !commonTuples[key] && (commonTuples[key] = {});
                row1.forEach((value, idx) => {
                    commonTuples[key][schema1[idx].name] = value;
                });
                row2.forEach((value, idx) => {
                    commonTuples[key][schema2[idx].name] = value;
                });
            } else {
                const dm1Key = dim1Values.join();
                const dm2Key = dim2Values.join();
                if (!commonTuples[dm1Key] && !commonTuples[dm2Key]) {
                    !tuples1[dm1Key] && (tuples1[dm1Key] = {});
                    !tuples2[dm2Key] && (tuples2[dm2Key] = {});
                    row1.forEach((value, idx) => {
                        tuples1[dm1Key][schema1[idx].name] = value;
                    });
                    row2.forEach((value, idx) => {
                        tuples2[dm2Key][schema2[idx].name] = value;
                    });
                }
            }
        }
    }


    // Retrieves the DataModel from muze namespace. Muze recognizes DataModel as a first class source of data.
    let { DataModel } = muze;

    const commonSchema = [...schema1, ...schema2.filter(s2 => schema1.findIndex(s1 => s1.name === s2.name) === -1)];
    const dataArr = [...Object.values(tuples1), ...Object.values(tuples2), ...Object.values(commonTuples)];
    return new DataModel(dataArr, commonSchema);
};

/**
 * function to export the datamodel for the selected points from the SPLOM chart
 *
 * @param  {Object} selectedData - Object for the selected Data
 * @return {Object} model
 */
export function updateTableView (selectedData) {
    let model = null;
    Object.values(selectedData).forEach((dataModel) => {
        if (model !== null) {
            model = concatModels(dataModel, model);
        } else {
            model = dataModel;
        }
    });
    return model;
}

/**
* This function is used to print the data in table format.
*
* @param {data} data in JSON format.
* @param {config} config The config object.
*
*/
function printTable(data) {
    if (data.length > 0) {
        document.getElementsByClassName('table-para')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('table-para')[0].style.display = 'block';
    }
    // to remove any table if already present with the updated one
    if (document.getElementsByClassName('tableStyle')[0]) {
        document.getElementsByClassName('tableStyle')[0].remove();
    }
    // EXTRACTING THE VALUE FOR HTML HEADER.
    let col = [];
    for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATING DYNAMIC TABLE.
    let table = document.createElement('table');
    table.classList.add('tableStyle');

    // CREATING HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    let tr = table.insertRow(-1); // TABLE ROW.

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement('th'); // TABLE HEADER.
        th.innerText = col[i];
        tr.appendChild(th);
    }

    // ADDING JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            const val = data[i][col[j]];
            const tabCell = tr.insertCell(-1);
            tabCell.innerText = (typeof val === 'undefined' ? '' : val);
        }
    }

    const tableElem = document.getElementById('table-body');
    tableElem.appendChild(table);
}

/**
 * function to convert the tree data to flat data
 * @param {Object} dataModel - tree data of selected fields
 */
export function dataconverter(dataModel) {
    let dataObj = dataModel.getData();
    let { data } = dataObj;
    let { schema } = dataObj;

    let dataArray = [];

    for (let i = 0; i < data.length; i += 1) {
        let tuple = data[i];
        let temp = {};
        for (let j = 0; j < tuple.length; j += 1) {
            let { name } = schema[j];
            let value = tuple[j];
            temp[name] = value;
        }
        dataArray.push(temp);
    }
    printTable(dataArray);
}
