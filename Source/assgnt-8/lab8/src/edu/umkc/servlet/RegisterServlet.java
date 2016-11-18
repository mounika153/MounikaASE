package edu.umkc.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.WriteResult;

/**
 * Servlet implementation class RegsiterServlet
 */
@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegisterServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		System.out.println("inside get");
		MongoClientURI uri = new MongoClientURI("mongodb://mouni:mouni@ds037814.mongolab.com:37814/mouni");
		MongoClient client = new MongoClient(uri);

		DB db = client.getDB(uri.getDatabase());
		DBCollection users = db.getCollection("users");
		BasicDBObject query = new BasicDBObject();
		query.put("name", request.getParameter("name"));
		query.put("password", request.getParameter("password"));
		DBCursor docs = users.find(query);
		response.getWriter().write(docs.toArray().toString());
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("inside dopost");
		
		
		
		String firstname = request.getParameter("firstname");
    	String lastname=request.getParameter("lastname");
    	String mobile = request.getParameter("mobile");
    	String email=request.getParameter("email");
    	String address = request.getParameter("address");
    	String country=request.getParameter("country");
    	String password = request.getParameter("password");
    	String repassword=request.getParameter("repassword");
    	//String cost=request.getParameter("cost");
    	
    	System.out.println("username : "+firstname);
    	System.out.println("password : "+password);
    	
    	BasicDBObject dbObject = new BasicDBObject();
    	dbObject.put("firstname", firstname);
    	dbObject.put("lastname", lastname);
    	dbObject.put("mobile", mobile);
    	dbObject.put("email", email);
    	dbObject.put("address", address);
    	dbObject.put("country", country);
    	
    	dbObject.put("password", password);
    	//dbObject.put("price", cost);
    	
		System.out.println(dbObject);
		MongoClientURI uri=new MongoClientURI("mongodb://mouni:mouni@ds037814.mongolab.com:37814/mouni");	
		MongoClient client=new MongoClient(uri);
		DB db=client.getDB(uri.getDatabase());
		DBCollection customers=db.getCollection("users");
		
		WriteResult result=customers.insert(dbObject);
		
		//JOptionPane.showMessageDialog(null, "Details has been Added");
		
		//response.sendRedirect("displaystocks.html");
		System.out.println("details inserted");
		request.setAttribute("sucmsg", "User created successfuly");
		response.sendRedirect("login.html");
	}

	@Override
	protected void doOptions(HttpServletRequest arg0, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doOptions(arg0, response);

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, HEAD, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");
	}
}
