<%
    response.setHeader("Access-Control-Allow-Origin", "*");
%>
<%@
    page
    language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding= "UTF-8"
%>
<%@ page import="community.CommunityDAO"%>
<%@ page import="community.CommunityDTO"%>
<% 
    request.setCharacterEncoding("UTF-8");
%>


<jsp:useBean class="community.CommunityDTO" id="communityDTO" scope="page"/>
<jsp:setProperty name="communityDTO" property="userId"/>

    
<%
    CommunityDAO communityDAO = new CommunityDAO();
    int result = communityDAO.delete(communityDTO);
%>

{"result":"<%=result%>"}
