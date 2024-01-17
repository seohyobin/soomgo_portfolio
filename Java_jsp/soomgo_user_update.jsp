
<%@ 
    page 
    language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>

<%@ page import = "soomgo.UserDAO" %>
<%@ page import = "soomgo.UserDTO" %>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원정보수정</title>

</head>
<body>
<div id="wrap">
    
    <%
        String loginId = null;
        if( session.getAttribute("user_email") != null){
            loginId = (String) session.getAttribute("user_email");
        }    
    %>

    <%
        UserDAO userDAO = new UserDAO();
        UserDTO userDTO = userDAO.getJoin( loginId );
    %>


    <section id="signup">
        <div class="container">
            <div class="title">
                <h2>회원정보수정</h2>                
            </div>
            <div class="content">
                <form name="update" autocomplete="off" id="update" method="post" action="./soomgo_user_update_action.jsp">
                    <ul>
                        <li><%= userDTO.getUser_email() %></li>
                        <li><input maxlength="30" autofocus required  type="text" name="user_name" id="userName" placeholder="수정 이름을 입력하세요"  value="<%= userDTO.getUser_name() %>"></li>
                        <li><input maxlength="250" autofocus required type="email" name="user_email" id="userEmail" placeholder="수정 이메일을 입력하세요" value="<%=userDTO.getUser_email()%>"></li>
                        <li><input maxlength="16" autofocus required  type="password" name="user_pw" id="userPw" placeholder="수정 비밀번호를 입력하세요"  value="<%= userDTO.getUser_pw() %>"></li>
                    </ul>
                    <div class="submit">
                        <button type="submit">수정하기</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</div>
</body>
</html>