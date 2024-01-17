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
    ArrayList<CommunityDTO> list = communityDAO.getList(communityDTO);


    String jsonData = "{ \"result\": [";
    int cnt = 0;
    for (CommunityDTO soomgoDTO : list) {
        cnt++;
        if (cnt < list.size()) {
        jsonData += "{ \"idx\" : \"" + soomgoDTO.getIdx() + "\","
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
                 + "},";
        }
        else {
            jsonData += "{ \"idx\" : \"" + soomgoDTO.getIdx() + "\","
                     +   "\"userId\" : \"" + soomgoDTO.getUserId() + "\","
                     +   "\"subject\" : \"" + soomgoDTO.getSubject() + "\","
                     +   "\"file1\" : \"" + soomgoDTO.getFile1() + "\","
                     +   "\"file2\" : \"" + soomgoDTO.getFile2() + "\","
                     +   "\"file3\" : \"" + soomgoDTO.getFile3() + "\","
                     +   "\"title\" : \"" + soomgoDTO.getTitle() + "\","
                     +   "\"service\" : \"" + soomgoDTO.getService() + "\","
                     +   "\"location\" : \"" + soomgoDTO.getLocation() + "\","
                     +   "\"content\" : \"" + soomgoDTO.getContent() +  "\","
                     +   "\"writeDate\" : \"" + soomgoDTO.getWriteDate() + "\""
                     + "}";
        }
    }
    

        jsonData += "]}";
        response.getWriter().write(jsonData);
        
%>


