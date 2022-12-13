import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("wiktor_o_4i12.db");

export class Database {
  static createTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS table4 (id integer primary key not null, hour text, minute text, turned integer);"
      );
    });
  }
  static add(hour, minute, turned) {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO table4 (hour, minute, turned) values ('${hour}', '${minute}', '${turned}')`
      );
    });
  }
  static getAll() {
    var query = "SELECT * FROM table4";
    //
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          (tx, results) => {
            console.log(JSON.stringify(results));

            resolve(JSON.stringify(results));
          },
          function (tx, error) {
            reject(error);
          }
        );
      })
    );
  }
  static remove(id) {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM table4 WHERE (id = ${id});`);
    });
  }
  static removeAll() {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM table4 ;");
    });
  }
}
