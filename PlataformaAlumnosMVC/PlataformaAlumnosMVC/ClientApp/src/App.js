import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from "reactstrap"
import ModalAlumno from "./components/ModalAlumno"
import TablaAlumnos from "./components/TablaAlumnos"

const App = () => {

    const [alumnos, setAlumnos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    //Método para mostrar alumnos
    const mostrarAlumnos = async () => {
        
        const response = await fetch("api/alumno/ObtenerAlumnos");

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            console.log("Error al obtener los alumnos")
        }
    }

    //Método para obtener alumno por id
    const buscarAlumno = async (e) => {
        const idAlumno = e.target.value;

        const response = await fetch("api/alumno/ObtenerAlumno/" + idAlumno);

        if (response.ok) {
            const data = await response.json();
            setAlumnos(data)
        } else {
            mostrarAlumnos();
        }
    }

    useEffect(() => {
        mostrarAlumnos()
    }, [])

    //Método para guardar alumno
    const guardarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/GuardarAlumno", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    //Método para editR alumno
    const editarAlumno = async (alumno) => {

        const response = await fetch("api/alumno/EditarAlumno", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(alumno)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarAlumnos();
        }

    }

    //Método para eliminar alumno
    const eliminarAlumno = async (id) => {

        var respuesta = window.confirm("¿Deseas eliminar el alumno con id: " + id+ "?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/alumno/EliminarAlumno/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarAlumnos();
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Alumnos Registrados</h5>
                        </CardHeader>
                        <CardBody>

                            <Row>
                                
                                <Col>
                                    <Input type="number" name="Id" onChange={(e) => buscarAlumno(e)} placeholder="Buscar por id" />
                                </Col>
                                <Col sm="2">
                                    <Button size="sm" color="success"  onClick={() => setMostrarModal(!mostrarModal)}>Registrar Alumno</Button>
                                </Col>
                            </Row>
                           
                            <br></br>
                            <TablaAlumnos data={alumnos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarAlumno={eliminarAlumno}
                            />

                            <br></br>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalAlumno
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarAlumno={guardarAlumno}
                editar={editar}
                setEditar={setEditar}
                editarAlumno={editarAlumno}
            />
        </Container>
    )
}

export default App;