import { ModalType } from "../../types/ModalType";
import { Product } from "../../types/Product";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ProductService } from "../../services/ProductService";
import { Form } from "react-bootstrap";
//Validación de formularios
import * as Yup from "yup";
import { useFormik } from "formik";

//Notificaciones al usuario
import { toast } from 'react-toastify';


type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    prod: Product;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const ProductModal = ({show, onHide, title, prod, modalType, refreshData}:ProductModalProps) => {

    //CREATE-UPDATE
    const handleSaveUpdate = async (pro: Product) => {
        try {
            const isNew = pro.id === 0;
            if (isNew) {
                await ProductService.createProduct(pro);
            } else {
                await ProductService.updateProduct(pro.id, pro);
            }
            toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Ha ocurrido un error');
        }
        
    };

    //DELETE
    const handleDelete =async () => {
        try {
            await ProductService.deleteProduct(prod.id);
            toast.success("Producto borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error)
            toast.error("Ha ocurrido un error");
        }       
    }

    // Esquema de validación de YUP
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        title: Yup.string().required('El titulo es requerido'),
        price: Yup.number().min(0).required('El precio es requerido'),
        descripcion: Yup.string().required('La descripcion es requerida'),
        category: Yup.string().required('La categoria es requerida'),
        image: Yup.string().required('La URL de la imagen es requerida'),
        });
    };

    //Utiliza el esquema de validación anterior y obtiene un formulario dinámico y lo bloquea si hay errores
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Product) => handleSaveUpdate(obj),
    });

  return (
    <>
    {modalType===ModalType.DELETE? (
        <>
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

        <Modal.Body>
            <p> ¿Está seguro que desea eliminar el producto  
            <br /> <strong> {prod.title} </strong> ? </p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cancelar</Button>

            <Button variant="danger" onClick={handleDelete}>Borrar</Button>
        </Modal.Footer>

        </Modal>
        </>
        ): (
        <>
        <Modal show={show} onHide={onHide} centered backdrop="static" className="modalx1">
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {"Formulario"}
            <Form onSubmit={formik.handleSubmit}>
                
            {"Titulo"}
                <Form.Group controlId="formTitulo">
                    <Form.Control
                        name="title"
                        type="text"
                        value={formik.values.title || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.title &&
                        formik.touched.title)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.title}
                        </Form.Control.Feedback>
                </Form.Group>


            {"Precio"}                    
                <Form.Group controlId="formPrice">
                    <Form.Control
                        name="price"
                        type="number"
                        value={formik.values.price || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(formik.errors.price &&
                        formik.touched.price)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.price}
                        </Form.Control.Feedback>
                </Form.Group>


            {"Descripción"}                
        <Form.Group controlId="formDescription">
            <Form.Control
                name="descripcion"
                type="text"
                value={formik.values.descripcion || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={Boolean(formik.errors.descripcion &&
                formik.touched.descripcion)}
                    />
            <Form.Control.Feedback type="invalid">
                {formik.errors.descripcion}
                </Form.Control.Feedback>
        </Form.Group>
            
            {"Categoria"}                
        <Form.Group controlId="formCategory">
                <Form.Control
                    name="category"
                    type="text"
                    value={formik.values.category || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.category &&
                    formik.touched.category)}
                    />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.category}
                    </Form.Control.Feedback>
        </Form.Group>
            
            {"Imagen"}                
        <Form.Group controlId="formImage">
                <Form.Control
                    name="image"
                    type="text"
                    value={formik.values.image || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.image &&
                    formik.touched.image)}
                    />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.image}
                    </Form.Control.Feedback>
        </Form.Group>

            <Modal.Footer className="mt-4">   
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                    <Button variant="primary" type="submit" disabled={!formik.isValid}>Guardar</Button>
            </Modal.Footer>
                    </Form>
            </Modal.Body>
        </Modal>        
        </>
    )
    }
    </>
  );
}

export default ProductModal