'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require('material-ui/Table');

var _Table2 = _interopRequireDefault(_Table);

var _styles = require('material-ui/styles');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactUltimatePaginationMaterialUi = require('@tony-kerz/react-ultimate-pagination-material-ui');

var _reactUltimatePaginationMaterialUi2 = _interopRequireDefault(_reactUltimatePaginationMaterialUi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dbg = (0, _debug2.default)('lib:material-ui-data-table');

var Pager = (0, _reactUltimatePaginationMaterialUi2.default)();

var styles = function styles(theme) {
  dbg('theme=%o', theme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    table: {
      overflowX: 'auto',
      borderBottom: [1, 'solid', 'gainsboro']
    },
    pager: {
      alignSelf: 'center',
      padding: 10
    }
  };
};

var dataTable = function (_Component) {
  _inherits(dataTable, _Component);

  function dataTable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, dataTable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = dataTable.__proto__ || Object.getPrototypeOf(dataTable)).call.apply(_ref, [this].concat(args))), _this), _this.getOnSort = function (field) {
      return function () {
        var sort = _this.props.page.query.sort;

        var isAscending = sort.field === field && sort.isAscending ? false : true;
        dbg('on-sort: field=%o, isAscending=%o, props=%o', field, isAscending, _this.props);
        _this.props.onSort({ field: field, isAscending: isAscending });
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(dataTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      dbg('render: props=%o', this.props);
      var _props = this.props,
          columns = _props.columns,
          page = _props.page,
          classes = _props.classes;
      var query = page.query,
          data = page.data;

      var sortField = _lodash2.default.get(query, 'sort.field');
      var isAscending = _lodash2.default.get(query, 'sort.isAscending');

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          'div',
          { className: classes.table },
          _react2.default.createElement(
            _Table2.default,
            null,
            _react2.default.createElement(
              _Table.TableHead,
              null,
              _react2.default.createElement(
                _Table.TableRow,
                null,
                columns.map(function (column) {
                  return _react2.default.createElement(
                    _Table.TableCell,
                    {
                      key: column.id,
                      numeric: column.numeric,
                      disablePadding: column.disablePadding
                    },
                    _react2.default.createElement(
                      _Table.TableSortLabel,
                      {
                        active: sortField === column.id,
                        direction: isAscending ? 'asc' : 'desc',
                        onClick: _this2.getOnSort(column.id)
                      },
                      column.label || column.id
                    )
                  );
                }, this)
              )
            ),
            _react2.default.createElement(
              _Table.TableBody,
              null,
              data && data.map(function (row) {
                return _react2.default.createElement(
                  _Table.TableRow,
                  { key: row.ssn },
                  columns.map(function (column) {
                    return _react2.default.createElement(
                      _Table.TableCell,
                      {
                        key: row.ssn + ':' + column.id,
                        numeric: column.numeric,
                        disablePadding: column.disablePadding
                      },
                      row[column.id]
                    );
                  })
                );
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: classes.pager },
          _react2.default.createElement(Pager, {
            currentPage: page.currentPage,
            totalPages: page.totalPages,
            boundaryPagesRange: 1,
            siblingPagesRange: 1,
            hidePreviousAndNextPageLinks: false,
            hideFirstAndLastPageLinks: false,
            hideEllipsis: false,
            onChange: this.props.onPage
          })
        )
      );
    }
  }]);

  return dataTable;
}(_react.Component);

dataTable.propTypes = {
  onSort: _propTypes2.default.func.isRequired,
  onPage: _propTypes2.default.func.isRequired,
  page: _propTypes2.default.shape({
    data: _propTypes2.default.array,
    query: _propTypes2.default.shape({
      offset: _propTypes2.default.integer,
      limit: _propTypes2.default.integer,
      sort: _propTypes2.default.shape({
        field: _propTypes2.default.string,
        isAscending: _propTypes2.default.boolean
      })
    })
  }).isRequired,
  columns: _propTypes2.default.array.isRequired,
  classes: _propTypes2.default.object.isRequired
};
exports.default = (0, _styles.withStyles)(styles)(dataTable);