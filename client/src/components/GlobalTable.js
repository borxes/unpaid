import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function GlobalTable(props) {
  const { signals, changes, classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell align="right">Signals #</TableCell>
            <TableCell align="right">1h Change (USD)</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right">7d Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {signals.map(row => (
            <TableRow key={row[0]}>
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">
                {changes ? changes[row[0]].h1Change + '%' : '--'}
              </TableCell>
              <TableCell align="right">
                {changes ? changes[row[0]].d1Change + '%' : '--'}
              </TableCell>
              <TableCell align="right">
                {changes ? changes[row[0]].d7Change + '%' : '--'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

GlobalTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GlobalTable);
