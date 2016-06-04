package com.mycompany.billway;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/**
 * Created by ADMIN on 9/25/2015.
 */
public class DB extends SQLiteOpenHelper {

    // Database Version
    private static final int DATABASE_VERSION = 1;
    // Database Name
    private static final String DATABASE_NAME = "BillwayDB";
    private static final String[] COLUMNS_pswd = {"password"};
    String CREATE_TABLE_USER = "CREATE TABLE if not exists userInfo (mobilenum TEXT, password TEXT, firstname TEXT, lastname TEXT, emailid TEXT, address1 TEXT,address2 TEXT, city TEXT, state TEXT, country TEXT)";

    public DB(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // create table
        db.execSQL(CREATE_TABLE_USER);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        this.onCreate(db);
    }

    public void deleteTables() {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DROP TABLE IF EXISTS userInfo");
    }

    public int addUser(UserDetails user) {

        // 1. get reference to writable DB
        SQLiteDatabase db = this.getWritableDatabase();
        deleteTables();
        this.onCreate(db);
        // 2. create ContentValues to add key "column"/value

        ContentValues values = new ContentValues();
        values.put("mobilenum", user.mobileNum); // get title
        values.put("password", user.password); // get author
        values.put("firstname", user.firstName);
        values.put("lastname", user.lastName);
        values.put("emailid", user.email);
        values.put("address1", user.address1);
        values.put("address2", user.address2);
        values.put("city", user.city);
        values.put("state", user.state);
        values.put("country", user.country);


        Cursor cursor =
                db.query("userInfo", // a. table
                        COLUMNS_pswd, // b. column names
                        " mobilenum = ?", // c. selections
                        new String[]{String.valueOf(user.mobileNum)}, // d. selections args
                        null, // e. group by
                        null, // f. having
                        null, // g. order by
                        null); // h. limit


        if (cursor.getCount() == 0) {

            // 3. insert
            try {
                db.insert("userInfo", // table
                        null, //nullColumnHack
                        values); // key/value -> keys = column names/ values = column values

                // 4. close
                db.close();
                return 1;
            } catch (Exception e) {
                return 111;
            }
        } else {
            //  deleteTables();
            return 111;
        }
    }

    public String checkUser(String mob) {

        // 1. get reference to readable DB
        SQLiteDatabase db = this.getReadableDatabase();

        // 2. build query
        Cursor cursor =
                db.query("userInfo", // a. table
                        COLUMNS_pswd, // b. column names
                        " mobilenum = ?", // c. selections
                        new String[]{String.valueOf(mob)}, // d. selections args
                        null, // e. group by
                        null, // f. having
                        null, // g. order by
                        null); // h. limit

        // 3. if we got results get the first one
        if (cursor != null)
            cursor.moveToFirst();
        try {
            return ((cursor.getString(0)));
        } catch (Exception e) {
            return "Number doesn't exist";
        }

    }

}
