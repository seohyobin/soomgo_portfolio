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
<jsp:setProperty name="userDTO" property="user_email" />
<jsp:setProperty name="userDTO" property="user_pw" />

<%
    if(
           userDTO.getUser_email()==null
        || userDTO.getUser_pw()==null
    ){
    	out.println("빈값은 허용하지 않습니다. \n확인하고 다시시도해주세요");
    }
    else{
        UserDAO userDAO = new UserDAO();
        int result = userDAO.signin( userDTO.getUser_email(), userDTO.getUser_pw() );
            if(result==1){ 
            // 로그인한 본인 아이디로 로그인 세션 설정(setter)하기    
            session.setAttribute("user_email", userDTO.getUser_email());
         
            }
            out.println(result);
		}
%>




