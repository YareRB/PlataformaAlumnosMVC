import { useEffect, useState } from "react"
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"

const modeloAlumno = {
    id: 0,
    nombre: "",
    apellido: "",
    calificacion: 0.0
}

const ModalAlumno = ({ mostrarModal, setMostrarModal, guardarAlumno, editar, setEditar, editarAlumno }) => {

    const [alumno, setAlumno] = useState(modeloAlumno);

    const actualizaDatos = (e) => {
        setAlumno(
            {
                ...alumno,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (alumno.id == 0) {
            guardarAlumno(alumno)

            setAlumno(modeloAlumno)
        } else {
            editarAlumno(alumno)
        }

    }

    useEffect(() => {
        if (editar != null) {
            setAlumno(editar)
        } else {
            setAlumno(modeloAlumno)
        }

    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {alumno.id == 0 ? "AGREGAR ALUMNO" : "EDITAR ALUMNO"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input  name="nombre" onChange={(e) => actualizaDatos(e)} value={alumno.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellido</Label>
                        <Input name="apellido" onChange={(e) => actualizaDatos(e)} value={alumno.apellido} />
                    </FormGroup>
                    <FormGroup>

                        <Label>Calificacion</Label>
                        <Input min="1" max="10" type="number" name="calificacion" onChange={(e) => actualizaDatos(e)} value={alumno.calificacion} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" outline size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="dark" outline size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAlumno;