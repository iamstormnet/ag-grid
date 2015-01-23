define(["./constants"], function(constants) {

    var DEFAULT_ROW_HEIGHT = 30;

    function GridOptionsWrapper(gridOptions) {
        this.gridOptions = gridOptions;
        this.setupDefaults();
    }

    GridOptionsWrapper.prototype.isGroupDefaultExpanded = function() {
        return this.gridOptions.groupDefaultExpanded === true;
    };

    GridOptionsWrapper.prototype.getGroupKeys = function() {
        return this.gridOptions.groupKeys;
    };

    GridOptionsWrapper.prototype.getAggFunction = function() {
        return this.gridOptions.aggFunction;
    };

    GridOptionsWrapper.prototype.getAllRows = function() {
        return this.gridOptions.rowData;
    };

    GridOptionsWrapper.prototype.isGroupUseEntireRow = function() {
        return this.groupUseEntireRow===true;
    };

    GridOptionsWrapper.prototype.isAngularCompile = function() {
        return this.angularCompile===true;
    };

    GridOptionsWrapper.prototype.getColumnDefs = function() {
        return this.gridOptions.columnDefs;
    };

    GridOptionsWrapper.prototype.isColumDefsPresent = function() {
        return this.gridOptions.columnDefs && this.gridOptions.columnDefs.length!=0;
    };

    GridOptionsWrapper.prototype.setupDefaults = function() {
        if (!this.gridOptions.rowHeight) {
            this.gridOptions.rowHeight = DEFAULT_ROW_HEIGHT;
        }
    };

    GridOptionsWrapper.prototype.ensureEachColHasSize = function () {
        this.gridOptions.columnDefs.forEach(function (colDef) {
            if (!colDef.width || colDef.width < 10) {
                colDef.actualWidth = constants.MIN_COL_WIDTH;
            } else {
                colDef.actualWidth = colDef.width;
            }
        });
    };

    GridOptionsWrapper.prototype.getTotalUnpinnedColWidth = function() {
        var widthSoFar = 0;
        var pinnedColCount = this.getPinnedColCount();

        this.gridOptions.columnDefs.forEach(function(colDef, index) {
            if (index>=pinnedColCount) {
                widthSoFar += colDef.actualWidth;
            }
        });

        return widthSoFar;
    };

    GridOptionsWrapper.prototype.getPinnedColCount = function() {
        if (this.gridOptions.pinnedColumnCount) {
            //in case user puts in a string, cast to number
            return Number(this.gridOptions.pinnedColumnCount);
        } else {
            return 0;
        }
    };

    GridOptionsWrapper.prototype.getRowHeight = function() {
        return this.gridOptions.rowHeight;
    };

    return GridOptionsWrapper;

});