package com.mycompany.billway;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;
import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.view.View;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {


    private Button Submit;
    private Button SignUp;
    private Button forgotPwd;
    private EditText mob;
    private EditText password;
    final DB db= new DB(this);
    String ValidateMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        final Context context = this;


        Submit = (Button) findViewById(R.id.button);
        SignUp = (Button) findViewById(R.id.button2);
        forgotPwd = (Button) findViewById(R.id.button4);

        mob = (EditText) findViewById(R.id.number);
        password = (EditText) findViewById(R.id.password);

        Submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String mobile = mob.getText().toString();
                String Pwd = password.getText().toString();

                String password= db.checkUser(mobile);
                if(password=="Number doesn't exist")
                {
                    Toast.makeText(context, "Not a registered phone number!!", Toast.LENGTH_LONG).show();

                }
                else {
                    Validate validate = new Validate();
                    ValidateMessage = validate.MainActivity(mobile, password);
                    if (!ValidateMessage.equalsIgnoreCase("ok")) {
                        Toast.makeText(LoginActivity.this, ValidateMessage, Toast.LENGTH_LONG).show();
                    } else if (Pwd.equals(password))

                    {
                        SharedPreferences pref = getApplicationContext().getSharedPreferences("MyPref", 0); // 0 - for private mode
                        SharedPreferences.Editor editor = pref.edit();
                        editor.putString("userid", mobile);
                        editor.commit();

                        Intent intent = new Intent(context, HomepageActivity.class);
                        startActivity(intent);
                    } else {
                        Toast.makeText(context, "Enter valid credentials!!", Toast.LENGTH_LONG).show();

                    }
                }

            }
        });

        SignUp.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {
                Intent intent = new Intent(context, SignupActivity.class);
                startActivity(intent);
            }

        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
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
