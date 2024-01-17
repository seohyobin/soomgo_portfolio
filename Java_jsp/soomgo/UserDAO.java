package soomgo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.Connection;
import soomgo.*;

public class UserDAO {

    private Connection conn;
    private PreparedStatement ps; 
    private ResultSet rs;

    public UserDAO(){
        try{    
            final String URL = "jdbc:mariadb://localhost:3306/janeseo0530";
            final String ID = "janeseo0530";
            final String PW = "Ejqmf5767^^"; 
            Class.forName("org.mariadb.jdbc.Driver"); 
            // String URL = "jdbc:mysql://localhost:3306/user";
            // String ID  = "root";
            // String PW  = "1234";

            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("JDBC Driver 로드성공!");

            conn = DriverManager.getConnection(URL, ID, PW);
            System.out.println("데이터베이스 Connection 연결성공!");
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
    
        // 회원가입 메서드
        public int signup(UserDTO userDTO){
            String SQL = "INSERT INTO soomgo_user(user_name, user_email, user_pw, user_service) VALUES(?, ?, ?, ?)";
            try{
            	  ps=conn.prepareStatement(SQL);
                  ps.setString(1, userDTO.getUser_name());
                  ps.setString(2, userDTO.getUser_email());
                  ps.setString(3, userDTO.getUser_pw());
                  ps.setString(4, userDTO.getUser_service());
                  ps.executeUpdate();
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                try{
                     if(rs !=null ){rs.close();} 
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            }
            return -1;
        }

        // 로그인 메서드
        public int signin(final String user_email, String user_pw){
            String SQL = "SELECT user_pw FROM soomgo_user WHERE user_email = ?";

            try{
            	  ps = conn.prepareStatement(SQL);
                  ps.setString(1, user_email);
                  rs = ps.executeQuery();

               if(rs.next()){
                    if(rs.getString(1).equals( user_pw )){
                        return 1;
                    }
                    else{
                        return 0;
                    } 
               }
               else{
                    return -1;
               }
            }
            catch( Exception e ){
                e.printStackTrace();
            }
            finally {
                try{
                     if(rs !=null ){rs.close();}
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            }
            return -2;
        }


        // 수정 메서드
        public int update(final UserDTO userDTO){
        	 String SQL = "UPDATE soomgo_user SET user_pw = ?, user_name = ?, user_service =?  WHERE user_email = ? ";
            try{
            	  ps = conn.prepareStatement(SQL);
                  ps.setString(1, userDTO.getUser_pw());
                  ps.setString(2, userDTO.getUser_name());
                  ps.setString(3, userDTO.getUser_service());
                  ps.setString(4, userDTO.getUser_email());
                  return ps.executeUpdate();
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {  
                try{
                     if(rs !=null ){rs.close();}
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            }
            return -1;
        }
        // 삭제 메서드
        public int delete(final String user_email, String user_pw){
            String SQL = "DELETE FROM soomgo_user  WHERE user_email = ? AND  user_pw = ?";
            try{
                ps = conn.prepareStatement(SQL);
                ps.setString(1, user_email);
                ps.setString(2, user_pw);
                return ps.executeUpdate();
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {  
                try{
                     if(rs !=null ){rs.close();}
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            }
            return -1;
        }
        // 개인정보확인하기
        public UserDTO getJoin(final String user_email){
            UserDTO userDTO = new UserDTO();

            String SQL = "SELECT * FROM soomgo_user WHERE user_email = ?";

            try{
               ps = conn.prepareStatement(SQL);
               ps.setString(1, user_email);
               rs = ps.executeQuery();

               if(rs.next()){
                   
                   userDTO.setUser_email(rs.getString("user_email"));
                    userDTO.setUser_pw(rs.getString("user_pw"));
                    userDTO.setUser_name(rs.getString("user_name"));
                    userDTO.setUser_service(rs.getString("user_service"));
                    userDTO.setUser_gaib_date(rs.getString("user_gaib_date"));
               }
               
            }
            catch( Exception e ){
                e.printStackTrace();
            }
            finally {  
                try{
                     if(rs !=null ){rs.close();}
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            }

            return userDTO;
        }
        // 회원정보 목록
        public  List<UserDTO>  getJoinList(){
            UserDTO userDTO = null;
            List<UserDTO> list = new ArrayList<>();

            String SQL = "SELECT * FROM soomgo_user";

            try{
                ps =conn.prepareStatement(SQL);
                rs = ps.executeQuery();
                while(rs.next()){ 
                    userDTO = new UserDTO();
                    userDTO.setUser_name(rs.getString("user_name"));
                    userDTO.setUser_pw(rs.getString("user_pw"));
                    userDTO.setUser_email(rs.getString("user_email"));
                    userDTO.setUser_service(rs.getString("user_service"));
                    userDTO.setUser_gaib_date(rs.getString("user_gaib_date"));
                    list.add(userDTO);
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {  
                try{
                     if(rs !=null ){rs.close();}
                     if(ps !=null ){ps.close();}
                     if(conn !=null ){conn.close();}
                }
                catch(Exception e){                    
                } 
            } 
            return list;
        }


	    // 이메일 중복확인  메서드
	    public boolean emailCheckMethod(final String user_email){
	    	boolean result = false; //초기값 중복안된상태
	    	
	    	String SQL = "SELECT user_email  FROM soomgo_user WHERE user_email = ?";
	    	
	    	try{
	    		PreparedStatement ps = conn.prepareStatement(SQL);	
	    		ps.setString(1, user_email);
	    		rs = ps.executeQuery();
	    		if(rs.next()){
	    			result=true;  // 중복된 이메일
	    		}
	    		else{
	    			result=false; // 사용가능한 이메일
	    		}
	    	}
	    	catch( Exception e ){
	    		e.printStackTrace();
	    	}
	    	finally {
	    		try{
	    			if(rs !=null ){rs.close();}
	    			if(ps !=null ){ps.close();}
	    			if(conn !=null ){conn.close();}
	    		}
	    		catch(Exception e){                    
	    		} 
	    	}
	    	return result;  // 이메일 중복여부 결과 리턴 boolean 
	    }
    }
