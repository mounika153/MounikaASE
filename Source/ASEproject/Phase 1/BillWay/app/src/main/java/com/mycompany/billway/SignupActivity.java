package com.mycompany.billway;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.view.View;
import android.content.Intent;
import android.widget.Toast;
import android.app.Activity;

public class SignupActivity extends AppCompatActivity {

    private Button submit;
    private EditText firstName;
    private EditText lastName;
    private EditText mobileNumber;
    private EditText address1;
    private EditText address2;
    private EditText city;
    private EditText state;
    private EditText postalCode;
    private EditText emailid;
    private EditText password;
    private EditText renterPassword;
    final DB db = new DB(this);
    String validationMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.signup);

        final Context context = this;
        submit = (Button) findViewById(R.id.submit1);
        firstName = (EditText) findViewById(R.id.firstName);
        lastName = (EditText) findViewById(R.id.lastName);
        mobileNumber = (EditText) findViewById(R.id.number);
        address1 = (EditText) findViewById(R.id.address1);
        address2 = (EditText) findViewById(R.id.address2);
        city = (EditText) findViewById(R.id.city);
        state = (EditText) findViewById(R.id.state);
        emailid=(EditText) findViewById(R.id.email);

        password = (EditText) findViewById(R.id.password);
        renterPassword = (EditText) findViewById(R.id.renterPassword);

        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String fn = firstName.getText().toString();
                String ln = lastName.getText().toString();
                String num = mobileNumber.getText().toString();
                String email = emailid.getText().toString();
                String add1 = address1.getText().toString();
                String add2 = address2.getText().toString();
                String ct = city.getText().toString();
                String st = state.getText().toString();

                String pwd = password.getText().toString();
                String repwd = renterPassword.getText().toString();
                UserDetails user = new UserDetails(fn, ln, num, email, add1, add2, ct, st, "USA", "", pwd, repwd);

                SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", 0); // 0 - for private mode
                SharedPreferences.Editor editor = pref.edit();
                editor.putString("userid", num);
                editor.commit();


                Validate validate = new Validate();
                validationMessage = validate.SignUpPage(user);
                if (!validationMessage.equalsIgnoreCase("ok")) {
                    Toast.makeText(com.mycompany.billway.SignupActivity.this, validationMessage, Toast.LENGTH_LONG).show();
                } else {
                    int value = db.addUser(user);
                    if (value == 111) {
                        Toast.makeText(context, "Mobile number is already registered!!", Toast.LENGTH_LONG).show();

                    }

                }

                Intent intent = new Intent(context, LoginActivity.class);
                startActivity(intent);

            }
        });


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_signup, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
