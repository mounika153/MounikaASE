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
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * Servlet implementation class ChangePass
 */
@WebServlet("/ChangePass")
public class ChangePass extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangePass() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		MongoClientURI uri=new MongoClientURI("mongodb://mouni:mouni@ds037814.mongolab.com:37814/mouni");	
		MongoClient client=new MongoClient(uri);
		
		try {
			
		DB db=client.getDB(uri.getDatabase());
		DBCollection customers=db.getCollection("users");
		
		BasicDBObject updateQuery = new BasicDBObject("email", request.getParameter("email"));
		customers.update(updateQuery, new BasicDBObject("$set", new BasicDBObject("password", request.getParameter("password"))));
         
       // JOptionPane.showMessageDialog(null, "The price was updated");
		doGet(request, response);
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
		//doGet(request, response);
		request.setAttribute("sucmsg", "Password changed successfuly");
		response.sendRedirect("login.html");
	}

}
