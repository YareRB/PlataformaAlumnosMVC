import { Button, Table } from "reactstrap"

const TablaAlumnos = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarAlumno }) => {

    const enviarDatos = (alumno) => {
        setEditar(alumno)
        setMostrarModal(!mostrarModal)
    }
    console.log(data)
    return (
        <Table hover responsive>
            <thead>
                {
                    (data.length < 1) ? (
                        <tr>
                           
                        </tr>
                    ) : (
                            <tr>
                                <th>Id Alumno</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Calificacion</th>
                                <th>Acciones</th>
                            </tr>
                    )
                }
    
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">No hay alumnos registrados</td>
                        </tr>
                    ) : (
                            data.map((item) => (
                                <tr key={item.Id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.calificacion}</td>
                                <td>
                                        <Button color="dark" outline size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                        <Button color="danger" outline size="sm" onClick={() => eliminarAlumno(item.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaAlumnos;