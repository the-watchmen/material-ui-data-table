import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Table, {TableBody, TableCell, TableHead, TableRow, TableSortLabel} from 'material-ui/Table'
import {withStyles} from 'material-ui/styles'
import debug from 'debug'
import _ from 'lodash'
import createUltimatePagination from '@watchmen/react-ultimate-pagination-material-ui'

const dbg = debug('lib:material-ui-data-table')

const Pager = createUltimatePagination()

const styles = theme => {
  dbg('theme=%o', theme)
  const space2 = theme.spacing.unit * 2
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
      padding: space2
    },
    text: {
      padding: [space2, space2, space2, space2 * 2]
    }
  }
}

class dataTable extends Component {
  getOnSort = field => () => {
    const {sort} = this.props.page.query
    const isAscending = sort.field === field && sort.isAscending ? false : true
    dbg('on-sort: field=%o, isAscending=%o, props=%o', field, isAscending, this.props)
    this.props.onSort({field, isAscending})
  }

  render() {
    dbg('render: props=%o', this.props)
    const {columns, page, classes, noRecordsFound} = this.props
    const {query, data} = page
    const sortField = _.get(query, 'sort.field')
    const isAscending = _.get(query, 'sort.isAscending')

    const head = (
      <TableHead>
        <TableRow>
          {columns.map(column => {
            return (
              <TableCell key={column.id} numeric={column.numeric} padding={column.padding}>
                <TableSortLabel
                  active={sortField === column.id}
                  direction={isAscending ? 'asc' : 'desc'}
                  onClick={this.getOnSort(column.id)}
                >
                  {column.label || column.id}
                </TableSortLabel>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )

    const body = (
      <TableBody>
        {data &&
          data.map(row => {
            return (
              <TableRow key={row.ssn}>
                {columns.map(column => {
                  return (
                    <TableCell
                      key={`${row.ssn}:${column.id}`}
                      numeric={column.numeric}
                      disablePadding={column.disablePadding}
                    >
                      {row[column.id]}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
      </TableBody>
    )

    return (
      data &&
      (data.length ? (
        <div className={classes.root}>
          <div className={classes.table}>
            <Table>
              {head}
              {body}
            </Table>
          </div>
          <div className={classes.pager}>
            <Pager
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
              onChange={this.props.onPage}
            />
          </div>
        </div>
      ) : (
        noRecordsFound || (
          <Typography className={classes.text} type="subheading" gutterBottom>
            No Results Found
          </Typography>
        )
      ))
    )
  }

  static propTypes = {
    onSort: PropTypes.func.isRequired,
    onPage: PropTypes.func.isRequired,
    page: PropTypes.shape({
      data: PropTypes.array,
      query: PropTypes.shape({
        offset: PropTypes.integer,
        limit: PropTypes.integer,
        sort: PropTypes.shape({
          field: PropTypes.string,
          isAscending: PropTypes.boolean
        })
      })
    }).isRequired,
    columns: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    // eslint-disable-next-line react/require-default-props
    noRecordsFound: PropTypes.element
  }
}

export default withStyles(styles)(dataTable)
