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
<jsp:setProperty name="userDTO" property="user_pw" />
<jsp:setProperty name="userDTO" property="user_name" />
<jsp:setProperty name="userDTO" property="user_email" />

<%
    if(    userDTO.getUser_pw()==null
        || userDTO.getUser_name()==null
        || userDTO.getUser_email()==null
    ){
%>
    <script>
        alert("빈값은 허용하지 않습니다. \n확인하고 다시시도해주세요");
        history.go(-1);
    </script>
<%
    }
    else{
        UserDAO userDAO = new UserDAO();
        int result = userDAO.update(userDTO);
%>
        

        <% 
            if(result>=1){ 
        %>
            <script>                
                alert("회원 정보가 수정되었습니다.");
                location.href="./soomgo_user_main.jsp";
            </script>
        <% 
                }
            else {
        %>
                <script>
                    alert("회원 정보의 수정이 실패 했습니다. \n데이터 확인하고 다시 시도하세요");
                    history.go(-1);
                </script>
        <%
            }
        %>

<%
    }
%>


