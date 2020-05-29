namespace DatingApp.API.Models
{
    public class User
    {
       public int Id { get; set; } 
       public string UserName { get; set; }
       public byte[] PasswordSault { get; set; }
       public byte[] PasswordHash { get; set; }
    }
}