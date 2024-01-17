package community;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CommunityDAO {
   private Connection conn;
   private PreparedStatement ps;
   private ResultSet rs;

   public CommunityDAO(){
    try {
        final String URL = "jdbc:mariadb://localhost:3306/janeseo0530";
        final String ID = "janeseo0530";
        final String PW = "Ejqmf5767^^";
        Class.forName("org.mariadb.jdbc.Driver");
        System.out.println("JDBC Driver 로드성공!");

        this.conn = DriverManager.getConnection(URL, ID, PW);
        System.out.println("데이터베이스 Connection 연결성공!");

    }
    catch (Exception e) {
        e.printStackTrace();   
    }
}

   public int write(CommunityDTO communityDTO) {
      String SQL = "INSERT INTO soomgo_community(userId,subject,file1,file2,file3,title,service,location,content,writeDate) values(?,?,?,?,?,?,?,?,?,?)";

      try {
         this.ps = this.conn.prepareStatement(SQL);
         this.ps.setString(1, communityDTO.getUserId());
         this.ps.setString(2, communityDTO.getSubject());
         this.ps.setString(3, communityDTO.getFile1());
         this.ps.setString(4, communityDTO.getFile2());
         this.ps.setString(5, communityDTO.getFile3());
         this.ps.setString(6, communityDTO.getTitle());
         this.ps.setString(7, communityDTO.getService());
         this.ps.setString(8, communityDTO.getLocation());
         this.ps.setString(9, communityDTO.getContent());
         this.ps.setString(10, communityDTO.getWriteDate());
         return this.ps.executeUpdate();
      } catch (Exception var4) {
         var4.printStackTrace();
         return -1;
      }
   }

   public ArrayList<CommunityDTO> getList(CommunityDTO communityDTO) {
      ArrayList<CommunityDTO> list = new ArrayList();
      String SQL = "SELECT * FROM soomgo_community ORDER BY idx DESC ";

      try {
         PreparedStatement ps = this.conn.prepareStatement(SQL);
         ResultSet rs = ps.executeQuery();

         while(rs.next()) {
            communityDTO = new CommunityDTO();
            communityDTO.setIdx(rs.getInt("idx"));
            communityDTO.setUserId(rs.getString("userId"));
            communityDTO.setSubject(rs.getString("subject"));
            communityDTO.setFile1(rs.getString("file1"));
            communityDTO.setFile2(rs.getString("file2"));
            communityDTO.setFile3(rs.getString("file3"));
            communityDTO.setTitle(rs.getString("title"));
            communityDTO.setService(rs.getString("service"));
            communityDTO.setLocation(rs.getString("location"));
            communityDTO.setContent(rs.getString("content"));
            communityDTO.setWriteDate(rs.getString("writeDate"));
            list.add(communityDTO);
         }

         return list;
      } catch (Exception var6) {
         var6.printStackTrace();
         return list;
      }
   }

   public CommunityDTO getView(int idx) {
      String SQL = "SELECT * FROM soomgo_community WHERE idx =?";

      try {
         PreparedStatement ps = this.conn.prepareStatement(SQL);
         ps.setInt(1, idx);
         this.rs = ps.executeQuery();
         if (this.rs.next()) {
            CommunityDTO communityDTO = new CommunityDTO();
            communityDTO.setIdx(this.rs.getInt(1));
            communityDTO.setUserId(this.rs.getString(2));
            communityDTO.setSubject(this.rs.getString(3));
            communityDTO.setFile1(this.rs.getString(4));
            communityDTO.setFile2(this.rs.getString(5));
            communityDTO.setFile3(this.rs.getString(6));
            communityDTO.setTitle(this.rs.getString(7));
            communityDTO.setService(this.rs.getString(8));
            communityDTO.setLocation(this.rs.getString(9));
            communityDTO.setContent(this.rs.getString(10));
            communityDTO.setWriteDate(this.rs.getString(11));
            return communityDTO;
         }
      } catch (Exception var5) {
         var5.printStackTrace();
      }

      return null;
   }

   public int delete(CommunityDTO communityDTO) {
      String SQL = "DELETE FROM soomgo_community WHERE userId=?";

      try {
         this.ps = this.conn.prepareStatement(SQL);
         this.ps.setString(1, communityDTO.getUserId());
         int var5 = this.ps.executeUpdate();
         return var5;
      } catch (Exception var13) {
         var13.printStackTrace();
      } finally {
         try {
            if (this.rs != null) {
               this.rs.close();
            }

            if (this.ps != null) {
               this.ps.close();
            }

            if (this.conn != null) {
               this.conn.close();
            }
         } catch (Exception var12) {
         }

      }

      return -1;
   }

   public int userSelect(CommunityDTO communityDTO) {
      String SQL = "SELECT userId FROM soomgo_community WHERE userId = ?";

      try {
         this.ps = this.conn.prepareStatement(SQL);
         this.ps.setString(1, communityDTO.getUserId());
         this.rs = this.ps.executeQuery();
         if (this.rs.next()) {
            return 1;
         }
      } catch (Exception var4) {
         var4.printStackTrace();
      }

      return 0;
   }

   public CommunityDTO getListUpdate(CommunityDTO communityDTO) {
      String SQL = "SELECT * FROM soomgo_community WHERE idx=?";

      try {
         this.ps = this.conn.prepareStatement(SQL);
         this.rs = this.ps.executeQuery();
         if (this.rs.next()) {
            communityDTO = new CommunityDTO();
            communityDTO.setIdx(this.rs.getInt("idx"));
            communityDTO.setSubject(this.rs.getString("subject"));
            communityDTO.setFile1(this.rs.getString("file1"));
            communityDTO.setFile2(this.rs.getString("file2"));
            communityDTO.setFile3(this.rs.getString("file3"));
            communityDTO.setTitle(this.rs.getString("title"));
            communityDTO.setService(this.rs.getString("service"));
            communityDTO.setLocation(this.rs.getString("location"));
            communityDTO.setContent(this.rs.getString("content"));
            communityDTO.setWriteDate(this.rs.getString("writeDate"));
         }
      } catch (Exception var12) {
         var12.printStackTrace();
      } finally {
         try {
            if (this.rs != null) {
               this.rs.close();
            }

            if (this.ps != null) {
               this.ps.close();
            }

            if (this.conn != null) {
               this.conn.close();
            }
         } catch (Exception var11) {
         }

      }

      return communityDTO;
   }

   public int update(CommunityDTO communityDTO) {
      String SQL = "UPDATE soomgo_community SET subject=?,file1=?,file2=?,file3=?, title=?, service=? , location=?,content=?,writeDate=? WHERE idx=?";

      try {
         this.ps = this.conn.prepareStatement(SQL);
         this.ps.setString(1, communityDTO.getSubject());
         this.ps.setString(2, communityDTO.getFile1());
         this.ps.setString(3, communityDTO.getFile2());
         this.ps.setString(4, communityDTO.getFile3());
         this.ps.setString(5, communityDTO.getTitle());
         this.ps.setString(6, communityDTO.getService());
         this.ps.setString(7, communityDTO.getLocation());
         this.ps.setString(8, communityDTO.getContent());
         this.ps.setString(9, communityDTO.getWriteDate());
         this.ps.setInt(10, communityDTO.getIdx());
         int var5 = this.ps.executeUpdate();
         return var5;
      } catch (Exception var13) {
         var13.printStackTrace();
      } finally {
         try {
            if (this.rs != null) {
               this.rs.close();
            }

            if (this.ps != null) {
               this.ps.close();
            }

            if (this.conn != null) {
               this.conn.close();
            }
         } catch (Exception var12) {
         }

      }

      return -1;
   }

   public CommunityDTO getJoin(CommunityDTO communityDTO) {
      String SQL = "SELECT * FROM soomgo_community WHERE idx=?";
      CommunityDTO DTO = null;

      try {
         PreparedStatement ps = this.conn.prepareStatement(SQL);
         ps.setInt(1, communityDTO.getIdx());
         ResultSet rs = ps.executeQuery();
         if (rs.next()) {
            DTO = new CommunityDTO();
            DTO.setIdx(rs.getInt("idx"));
            DTO.setUserId(rs.getString("userId"));
            DTO.setSubject(rs.getString("subject"));
            DTO.setFile1(rs.getString("file1"));
            DTO.setFile2(rs.getString("file2"));
            DTO.setFile3(rs.getString("file3"));
            DTO.setTitle(rs.getString("title"));
            DTO.setService(rs.getString("service"));
            DTO.setLocation(rs.getString("location"));
            DTO.setContent(rs.getString("content"));
            DTO.setWriteDate(rs.getString("writeDate"));
         }
      } catch (Exception var6) {
         var6.printStackTrace();
      }

      return DTO;
   }
}

