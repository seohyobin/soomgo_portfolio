
<%@ 
    page 
    language="java" 
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
%>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인</title>

</head>
<body>
<div id="wrap">
    <section id="signup" class='signin'>
        <div class="container">
            <div class="title">
                <h2>SIGN IN</h2>
            </div>
<div class="content">
    <form name="sign_in" autocomplete="off" id="signUp" method="post" action="./soomgo_user_signin_action.jsp">
        <ul>
            <li><input maxlength="50" autofocus required  type="text" name="user_email" id="userEmail" placeholder="이메일을 입력하세요"></li>
            <li><input maxlength="16" autofocus required  type="text" name="user_pw" id="userPw" placeholder="비밀번호를 입력하세요"></li>
        </ul>
        <div class="submit">
            <button type="submit">로그인</button>
        </div>
    </form>
</div>
        </div>
    </section>
</div>
</body>
</html>