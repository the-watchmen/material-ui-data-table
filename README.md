# material-ui-data-table

material-ui table with sorting and pagination goodness

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Build Status](https://travis-ci.org/the-watchmen/material-ui-data-table.svg?branch=master)](https://travis-ci.org/the-watchmen/material-ui-data-table)
[![npm version](https://img.shields.io/npm/v/@watchmen/material-ui-data-table.svg)](https://img.shields.io/npm/v/@watchmen/material-ui-data-table.svg)

## usage

```js
import React from 'react'
import Paper from 'material-ui/Paper'
import DataTable from '@watchmen/material-ui-data-table'

const columns = [
  {id: 'ssn'},
  {id: 'fullName'},
  {id: 'firstName'},
  {id: 'lastName'},
  {id: 'dateOfBirth', label: 'birth date'},
  {id: 'phoneNumber'},
  {id: 'address'},
  {id: 'city'},
  {id: 'state'},
  {id: 'zip'}
]

const results = props => {
  const {page, onSort, onPage} = props

  return (
    <Paper elevation={5}>
      <DataTable columns={columns} page={page} onSort={onSort} onPage={onPage} />
    </Paper>
  )
}

export default results
```

### screen-shot

![data-table](./image/data-table.png)

## credits/dependencies

> special thanks to the guys at [ultimate-pagination](https://github.com/ultimate-pagination/react-ultimate-pagination-material-ui)
