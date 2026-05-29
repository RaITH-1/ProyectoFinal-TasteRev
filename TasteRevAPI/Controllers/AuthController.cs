using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteRevAPI.Data;

namespace TasteRevAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        public class LoginRequest
        {
            // ACTUALIZADO: Ahora pedimos el NombreUsuario
            public string NombreUsuario { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("iniciar-sesion")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // ACTUALIZADO: Buscamos coincidencia con NombreUsuario
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.NombreUsuario == request.NombreUsuario && u.PasswordHash == request.Password);

            if (usuario == null)
            {
                return Unauthorized(new { message = "Usuario o contraseña incorrectos." });
            }

            return Ok(new
            {
                token = "token-simulado-tasterev-12345",
                usuario = new
                {
                    id = usuario.Id,
                    nombreUsuario = usuario.NombreUsuario,
                    correo = usuario.Correo
                }
            });
        }
    }
}