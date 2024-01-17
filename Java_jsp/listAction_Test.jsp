<%
    response.setHeader("Access-Control-Allow-Origin", "*");
%>
<%@ page language="java" contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="java.util.*"%>
<%@ page import="community.CommunityDAO"%>
<%@ page import="community.CommunityDTO"%>

<%
    request.setCharacterEncoding("UTF-8");
%>

<jsp:useBean class="community.CommunityDTO" id="communityDTO" scope="page"/>
<jsp:setProperty name="communityDTO" property="idx"/>
<jsp:setProperty name="communityDTO" property="userId"/>
<jsp:setProperty name="communityDTO" property="subject"/>
<jsp:setProperty name="communityDTO" property="file1"/>
<jsp:setProperty name="communityDTO" property="file2"/>
<jsp:setProperty name="communityDTO" property="file3"/>
<jsp:setProperty name="communityDTO" property="title"/>
<jsp:setProperty name="communityDTO" property="service"/>
<jsp:setProperty name="communityDTO" property="location"/>
<jsp:setProperty name="communityDTO" property="content"/>


<%  
    String jsonData = "{ \"result\": {"
                    +   " \"idx\"   : \"" + communityDTO.getIdx() + "\","
                    +   "\"userId\" : \"" + communityDTO.getUserId() + "\","
                    +   "\"subject\": \"" + communityDTO.getSubject() + "\","
                    +   "\"file1\"  : \"" + communityDTO.getFile1() + "\","
                    +   "\"file2\"  : \"" + communityDTO.getFile2() + "\","
                    +   "\"file3\"  : \"" + communityDTO.getFile3() + "\","
                    +   "\"title\"  : \"" + communityDTO.getTitle() + "\","
                    +   "\"service\": \"" + communityDTO.getService() + "\","
                    +   "\"location\" : \"" + communityDTO.getLocation() + "\","
                    +   "\"content\" : \"" + communityDTO.getContent() + "\""
                    +   "} }";

    response.getWriter().write(jsonData);
%>



