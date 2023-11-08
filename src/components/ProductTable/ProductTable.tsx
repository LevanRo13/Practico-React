import { useEffect, useState } from 'react'
import { Product } from '../../types/Product';
import { ProductService } from '../../services/ProductService';
import Loader from '../Loader/Loader';
import { Button, Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import ProductModal from '../ProductModal/ProductModal';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';



const ProductTable = () => {
    //Variable que va a contener los datos recibidos por la API
    const [products, setProducts] = useState <Product[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading]=useState(true);

    //Variable que actualiza datos en tabla luego de cada operación exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() =>{
        //Llamamos a la función para obtener todos los productos declarados en el ProductService
        const fetchProducts =async () => {
            const products = await ProductService.getProducts();
            setProducts(products);
            setIsLoading(false);
        };
        fetchProducts();
    },[refreshData] );

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify (products,null,2))

    
//const para inicializar un producto por defecto y evitar el "undefined"
//vayamos a crear un producto nuevo
const initializableNewProduct = (): Product =>{
    return{
        id:0,
        title: "",
        price:0,
        descripcion:"",
        category:"",
        image:"",

    };
};

//Producto seleccionado que se va a pasar como prop al Modal
const [product,setProduct] = useState<Product>(initializableNewProduct);

//const para manejar el estado del modal
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

//Logica de Modal
    const handleClick = (newTitle: string, prod: Product, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal)
    setProduct(prod);
    setShowModal(true);

    };
  return (
    <>
            <Button onClick={() => handleClick("Nuevo Producto",initializableNewProduct(),
             ModalType.CREATE)}> Nuevo Producto </Button>
        {isLoading ? <Loader/>:(
            <Table hover>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>(
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.category}</td>
                            <td><img src='{product.image} alt={product.title}'
                            style={{width: '50px'}}/></td>
                            <td> <EditButton onClick={() => 
                                handleClick("Editar producto", product, ModalType.UPDATE)}/> </td>
                            <td> <DeleteButton onClick={() => 
                            handleClick("Borrar producto", product, ModalType.DELETE)} /> </td>                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    {showModal && (
        <ProductModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        prod={product}
        refreshData={setRefreshData}
        />
     )}
    </>
  )
}

export default ProductTable