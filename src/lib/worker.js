// In `worker.js`.
import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const log = (args) => {
  // debugger
  postMessage({type: 'log', payload: args})
}
const error = (...args) => {
  postMessage({type: 'error', payload: args})
}

const start = function (sqlite3) {
  // log('Running SQLite3 version', sqlite3.version.libVersion);
  let db;
  // debugger
  if ('opfs' in sqlite3) {
    db = new sqlite3.oo1.OpfsDb('/mydb.sqlite3');
    // log('OPFS is available, created persisted database at', db.filename);
  } else {
    db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
    // log('OPFS is not available, created transient database', db.filename);
  }
  try {
    // log('Creating a table...');
    // db.exec('CREATE TABLE IF NOT EXISTS t(a,b)');
    // log('Insert some data using exec()...');
    // for (let i = 20; i <= 25; ++i) {
    //   db.exec({
    //     sql: 'INSERT INTO t(a,b) VALUES (?,?)',
    //     bind: [i, i * 2],
    //   });
    // }
    // log('Query data with exec()...');
    // db.exec({
    //   sql: 'SELECT a FROM t ORDER BY b LIMIT 30',
    //   callback: (row) => {
    //     log(row);
    //   },
    // });
    let sql = 'SELECT * FROM t ORDER BY b LIMIT 30'
    let rows = db.exec(sql, { rowMode: "object" })
    // debugger
    log(rows)
  } finally {
    db.close();
  }
};

// log('Loading and initializing SQLite3 module...');
// debugger
sqlite3InitModule({
  print: log,
  printErr: error,
}).then((sqlite3) => {
  // log('Done initializing. Running demo...');
  try {
    start(sqlite3);
  } catch (err) {
    error(err.name, err.message);
  }
});