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
<% 
    request.setCharacterEncoding("UTF-8");
%>


<jsp:useBean class="community.CommunityDTO" id="communityDTO" scope="page"/>
<jsp:setProperty name="communityDTO" property="userId"/>
<jsp:setProperty name="communityDTO" property="subject"/>
<jsp:setProperty name="communityDTO" property="file1"/>
<jsp:setProperty name="communityDTO" property="file2"/>
<jsp:setProperty name="communityDTO" property="file3"/>
<jsp:setProperty name="communityDTO" property="title"/>
<jsp:setProperty name="communityDTO" property="service"/>
<jsp:setProperty name="communityDTO" property="location"/>
<jsp:setProperty name="communityDTO" property="content"/>
<jsp:setProperty name="communityDTO" property="writeDate"/>

<%
    CommunityDAO communityDAO = new CommunityDAO();
    int result = communityDAO.write(communityDTO);
%>
{"AJAX실행 DTO & DAO 결과":"<%=result%>"} 
                
  



