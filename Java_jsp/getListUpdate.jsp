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

<%

    CommunityDAO communityDAO = new CommunityDAO();
    CommunityDTO soomgoDTO = communityDAO.getJoin(communityDTO);

%>

<%
    String jsonData = "{ \"result\": {"
    +   "\"idx\" : \"" + soomgoDTO.getIdx() + "\","   
    +   "\"userId\" : \"" + soomgoDTO.getUserId() + "\","
    +   "\"subject\" : \"" + soomgoDTO.getSubject() + "\","
    +   "\"file1\" : \"" + soomgoDTO.getFile1() + "\","
    +   "\"file2\" : \"" + soomgoDTO.getFile2() + "\","
    +   "\"file3\" : \"" + soomgoDTO.getFile3() + "\","
    +   "\"title\" : \"" + soomgoDTO.getTitle() + "\","
    +   "\"service\" : \"" + soomgoDTO.getService() + "\","
    +   "\"location\" : \"" + soomgoDTO.getLocation() + "\","
    +   "\"content\" : \"" + soomgoDTO.getContent() + "\","
    +   "\"writeDate\" : \"" + soomgoDTO.getWriteDate() + "\""
    + "} }";


    response.getWriter().write(jsonData);
        
%>


