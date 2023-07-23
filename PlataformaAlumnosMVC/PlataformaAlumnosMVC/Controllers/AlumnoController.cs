using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlataformaAlumnosMVC.Models;

namespace PlataformaAlumnosMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {
        private readonly PlataformaalumnosContext _context;

        public AlumnoController(PlataformaalumnosContext context)
        {
            // Inyección de dependencias
            _context = context;
        }

        // Metodo para obtener todos los alumnos
        [HttpGet]
        [Route("ObtenerAlumnos")]
        public async Task<IActionResult> ObtenerAlumnos()
        {
            List<Alumno> lista = await _context.Alumnos.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        //Métoso para obtener alumno por id
        [HttpGet]
        [Route("ObtenerAlumno/{id:int}")]
        public async Task<IActionResult> Buscar(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID Inválido. El ID debe ser un entero positivo");
            }

            List<Alumno> alumnos = await _context.Alumnos.Where(a => a.Id == id).ToListAsync();

            if (alumnos.Count < 0)
            {
                return NotFound("Alumno no encontrado");
            }

            return StatusCode(StatusCodes.Status200OK, alumnos);
        }

        //Método para guardar alumno
        [HttpPost]
        [Route("GuardarAlumno")]
        public async Task<IActionResult> Guardar([FromBody] Alumno request)
        {
            await _context.Alumnos.AddAsync(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        //Método para editar alumno
        [HttpPut]
        [Route("EditarAlumno")]
        public async Task<IActionResult> Editar([FromBody] Alumno request)
        {
            _context.Alumnos.Update(request);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        //Método para eliminar alumno
        [HttpDelete]
        [Route("EliminarAlumno/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Alumno alumno = _context.Alumnos.Find(id);

            _context.Alumnos.Remove(alumno);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
