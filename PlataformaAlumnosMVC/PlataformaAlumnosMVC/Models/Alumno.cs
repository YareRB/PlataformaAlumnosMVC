using System;
using System.Collections.Generic;

namespace PlataformaAlumnosMVC.Models;

public partial class Alumno
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public double? Calificacion { get; set; }
}
