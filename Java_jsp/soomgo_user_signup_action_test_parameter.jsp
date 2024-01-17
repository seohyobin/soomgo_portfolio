<%
    response.setHeader("Access-Control-Allow-Origin","*");
%>

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

<%
    // 1. Request  : 리액트에서 AJAX Rest API 로 전송된 파라미터를 변수에 저장하고 다시
    // 2. Response : 리액트에게 응답하는 절차 입니다
    String user_name =   request.getParameter("user_name");
    String user_email =  request.getParameter("user_email");
    String user_pw =     request.getParameter("user_pw");
    String user_service= request.getParameter("user_service");

%>

{"name":"<%=user_name%>", "email":"<%=user_email%>", "pw":"<%=user_pw%>", "agreeAll":"<%=user_service%>" }