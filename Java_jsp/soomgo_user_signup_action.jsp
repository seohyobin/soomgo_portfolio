<%@ 
    page 
    language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import = "soomgo.UserDAO" %>

<% 
    request.setCharacterEncoding("UTF-8"); 
%>

<jsp:useBean id="userDTO" class="soomgo.UserDTO" scope="page"/>
<jsp:setProperty name="userDTO" property="user_name" />
<jsp:setProperty name="userDTO" property="user_email" />
<jsp:setProperty name="userDTO" property="user_pw" />
<jsp:setProperty name="userDTO" property="user_service" />

<%
    UserDAO userDAO = new UserDAO();
    int result = userDAO.signup(userDTO);    
%>

{"result":"<%=result%>","name":"<%=userDTO.getUser_name()%>","email":"<%=userDTO.getUser_email()%>","pw":"<%=userDTO.getUser_pw()%>","agreeAll":"<%=userDTO.getUser_service()%>"}


