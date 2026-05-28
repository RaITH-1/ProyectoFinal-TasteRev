using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasteRevAPI.Data;
using TasteRevAPI.Models;

namespace TasteRevAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResenasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResenasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Resenas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resena>>> GetResenas()
        {
            return await _context.Resenas.ToListAsync();
        }

        // GET: api/Resenas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resena>> GetResena(int id)
        {
            var resena = await _context.Resenas.FindAsync(id);
            if (resena == null) return NotFound();

            return resena;
        }

        // POST: api/Resenas
        [HttpPost]
        public async Task<ActionResult<Resena>> PostResena(Resena resena)
        {
            _context.Resenas.Add(resena);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetResena), new { id = resena.Id }, resena);
        }

        // PUT: api/Resenas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResena(int id, Resena resena)
        {
            if (id != resena.Id) return BadRequest();

            _context.Entry(resena).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResenaExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // DELETE: api/Resenas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResena(int id)
        {
            var resena = await _context.Resenas.FindAsync(id);
            if (resena == null) return NotFound();

            _context.Resenas.Remove(resena);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResenaExists(int id)
        {
            return _context.Resenas.Any(e => e.Id == id);
        }
    }
}